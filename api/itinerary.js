// Vercel Serverless Function for POST /api/itinerary
// Keep all secret API keys in Vercel Project Settings > Environment Variables.

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const MAX_TOKENS = Number(process.env.AI_MAX_OUTPUT_TOKENS) || 4096;
const CACHE_TTL = 6 * 60 * 60 * 1000;
const cache = new Map();
const inFlight = new Map();
const hits = new Map();

const str = { type: "string" };
const int = { type: "integer" };
const activitySchema = {
  type: "object",
  properties: {
    time: str,
    place: str,
    description: str,
    duration_minutes: int,
    estimated_cost_idr: int,
    notes: str,
  },
  required: [
    "time",
    "place",
    "description",
    "duration_minutes",
    "estimated_cost_idr",
    "notes",
  ],
  additionalProperties: false,
};

const itinerarySchema = {
  type: "object",
  properties: {
    trip_title: str,
    overview: str,
    days: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day_number: int,
          title: str,
          activities: { type: "array", items: activitySchema },
        },
        required: ["day_number", "title", "activities"],
        additionalProperties: false,
      },
    },
    total_estimated_cost_idr: int,
    budget_note: str,
    important_notes: { type: "array", items: str },
  },
  required: [
    "trip_title",
    "overview",
    "days",
    "total_estimated_cost_idr",
    "budget_note",
    "important_notes",
  ],
  additionalProperties: false,
};

const providerOrder = (process.env.AI_PROVIDER_ORDER || "groq,gemini")
  .split(",")
  .map((name) => name.trim().toLowerCase())
  .filter((name) => name === "groq" || name === "gemini");

function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

function validate(body) {
  const { destination, startDate, endDate, budget, travelers } = body || {};
  if (typeof destination !== "string" || destination.trim().length < 2) {
    return "Tujuan minimal 2 karakter.";
  }

  const numericBudget = Number(budget);
  const numericTravelers = Number(travelers);

  if (!Number.isFinite(numericBudget) || numericBudget < 0 || numericBudget > 1e9) {
    return "Budget harus 0–1 miliar rupiah.";
  }
  if (!Number.isInteger(numericTravelers) || numericTravelers < 1 || numericTravelers > 20) {
    return "Jumlah traveler harus 1–20 orang.";
  }
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return "Format tanggal tidak valid.";
    }
    if (end < start) return "Tanggal pulang tidak boleh sebelum tanggal berangkat.";
  }
  return null;
}

function getDayCount(startDate, endDate) {
  if (!startDate || !endDate) return 3;
  return Math.max(1, Math.min(14, Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1));
}

async function requireUser(req) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  // Do not expose a public AI endpoint if server-side auth is not configured.
  if (!supabaseUrl || !supabaseAnonKey) {
    const error = new Error("Autentikasi server belum dikonfigurasi. Tambahkan SUPABASE_URL dan SUPABASE_ANON_KEY di Vercel.");
    error.status = 503;
    throw error;
  }

  const authorization = req.headers.authorization || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    const error = new Error("Silakan masuk dulu untuk memakai AI.");
    error.status = 401;
    throw error;
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token}`,
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    const error = new Error("Sesi login tidak valid. Silakan masuk ulang.");
    error.status = 401;
    throw error;
  }

  return response.json();
}

function checkRateLimit(key) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((stamp) => now - stamp < 60_000);
  if (recent.length >= 6) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}

function makeCacheKey(body) {
  return JSON.stringify([
    body.destination,
    body.country,
    body.startDate,
    body.endDate,
    Number(body.budget),
    Number(body.travelers),
    body.transport,
    body.interests,
  ].map((value) => typeof value === "string" ? value.trim().toLowerCase() : (value ?? "")));
}

function extractGeminiText(data) {
  if (typeof data?.output_text === "string") return data.output_text;
  if (Array.isArray(data?.steps)) {
    return data.steps
      .filter((step) => step?.type === "model_output")
      .flatMap((step) => step.content || [])
      .filter((part) => part?.type === "text")
      .map((part) => part.text)
      .join("\n");
  }
  return "";
}

function parseItinerary(text) {
  const cleaned = String(text)
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  const itinerary = JSON.parse(cleaned);
  if (!itinerary?.trip_title || !Array.isArray(itinerary.days) || itinerary.days.length === 0) {
    throw new Error("Provider returned an invalid itinerary shape.");
  }
  return itinerary;
}

const providers = {
  groq: {
    isConfigured: () => Boolean(process.env.GROQ_API_KEY),
    async call(prompt, days) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: "Buat itinerary dalam bahasa Indonesia. Isi semua field yang diwajibkan skema JSON.",
            },
            { role: "user", content: prompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "trip_itinerary",
              strict: true,
              schema: itinerarySchema,
            },
          },
          reasoning_effort: "low",
          temperature: 0.2,
          max_tokens: Math.min(MAX_TOKENS, 850 + days * 380),
        }),
        signal: AbortSignal.timeout(15000),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const message = data?.error?.message || data?.message || `HTTP ${response.status}`;
        throw new Error(`Groq ${response.status}: ${String(message).slice(0, 180)}`);
      }
      if (!data) throw new Error("Groq returned an unreadable response.");
      return data.choices?.[0]?.message?.content || "";
    },
  },
  gemini: {
    isConfigured: () => Boolean(process.env.GEMINI_API_KEY),
    async call(prompt, days) {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          model: GEMINI_MODEL,
          input: prompt,
          response_format: {
            type: "text",
            mime_type: "application/json",
            schema: itinerarySchema,
          },
          generation_config: {
            thinking_level: "low",
            max_output_tokens: Math.min(MAX_TOKENS, 850 + days * 380),
          },
        }),
        signal: AbortSignal.timeout(25000),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const message = data?.error?.message || data?.message || `HTTP ${response.status}`;
        throw new Error(`Gemini ${response.status}: ${String(message).slice(0, 180)}`);
      }
      if (!data) throw new Error("Gemini returned an unreadable response.");
      return extractGeminiText(data);
    },
  },
};

async function generateItinerary(prompt, days) {
  const configuredProviders = providerOrder.filter((name) => providers[name]?.isConfigured());
  for (const name of configuredProviders) {
    try {
      return parseItinerary(await providers[name].call(prompt, days));
    } catch (error) {
      // Diagnostic detail remains in server logs; do not expose prompts or keys.
      console.error(`[ai] ${name} failed: ${String(error?.message || error).slice(0, 250)}`);
    }
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendError(res, 405, "Metode tidak diizinkan. Gunakan POST.");
  }

  try {
    const user = await requireUser(req);
    const problem = validate(req.body);
    if (problem) return sendError(res, 400, problem);

    const configuredProviders = providerOrder.filter((name) => providers[name]?.isConfigured());
    if (!configuredProviders.length) {
      return sendError(res, 503, "Layanan AI belum dikonfigurasi. Tambahkan GROQ_API_KEY atau GEMINI_API_KEY di Vercel.");
    }

    const cacheKey = makeCacheKey(req.body);
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.at < CACHE_TTL) {
      return res.status(200).json({ itinerary: cached.itinerary, cached: true });
    }
    if (cached) cache.delete(cacheKey);

    const pending = inFlight.get(cacheKey);
    if (pending) {
      const shared = await pending;
      if (!shared) return sendError(res, 503, "Semua layanan AI sedang sibuk. Coba lagi sebentar.");
      return res.status(200).json({ itinerary: shared, cached: true });
    }

    const clientIp = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
    const rateKey = user?.id || clientIp;
    if (!checkRateLimit(rateKey)) {
      return sendError(res, 429, "Batas permintaan sementara tercapai. Tunggu satu menit lalu coba lagi.");
    }

    const {
      destination,
      country = "",
      startDate,
      endDate,
      budget,
      travelers,
      transport = "flexible",
      interests = "",
    } = req.body;
    const days = getDayCount(startDate, endDate);
    const prompt = `Kamu adalah AI Trip Planner. Buat itinerary ${days} hari dalam bahasa Indonesia.
Tujuan: ${String(destination).slice(0, 120)} ${String(country).slice(0, 80)}
Tanggal: ${startDate || "belum ditentukan"} s/d ${endDate || "belum ditentukan"}
Traveler: ${travelers} orang | Transportasi: ${String(transport).slice(0, 30)} | Budget total: Rp ${budget}
Minat: ${String(interests).slice(0, 200) || "umum"}
Aturan: semua biaya rupiah bilangan bulat untuk seluruh rombongan; jangan mengarang harga/jam buka sebagai fakta (tandai sebagai estimasi); ingatkan cek visa, dokumen, dan jadwal resmi; usahakan total biaya tidak melebihi budget.
Ringkas: maksimal 3 kegiatan per hari, deskripsi pendek, notes singkat, important_notes maksimal 3 butir. Kembalikan hanya JSON valid sesuai skema.`;

    const generation = generateItinerary(prompt, days);
    inFlight.set(cacheKey, generation);
    try {
      const itinerary = await generation;
      if (!itinerary) {
        return sendError(res, 503, "Semua layanan AI sedang sibuk atau mencapai batas pemakaian. Coba lagi sebentar lagi.");
      }
      if (cache.size >= 200) cache.delete(cache.keys().next().value);
      cache.set(cacheKey, { itinerary, at: Date.now() });
      return res.status(200).json({ itinerary, cached: false });
    } finally {
      if (inFlight.get(cacheKey) === generation) inFlight.delete(cacheKey);
    }
  } catch (error) {
    const status = Number(error?.status) || 502;
    if (status >= 500) console.error(`[api/itinerary] ${String(error?.message || error).slice(0, 250)}`);
    return sendError(res, status, status === 502 ? "Server AI gagal menghubungi layanan. Periksa log Functions di Vercel." : String(error.message || "Permintaan gagal."));
  }
}
