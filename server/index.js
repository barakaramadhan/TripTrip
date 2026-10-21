// Server AI kecil (Express). Menyembunyikan GEMINI_API_KEY dari browser.
// Jalankan: npm run server   (frontend memanggilnya lewat proxy /api di vite.config.js)
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distPath = path.join(projectRoot, "dist");
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    // Requests from tools/health checks may not send an Origin header.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin tidak diizinkan oleh CORS."));
  },
}));
app.use(express.json({ limit: "30kb" }));

/* ---------- Bentuk JSON yang diminta dari AI ---------- */
const str = { type: "string" };
const int = { type: "integer" };
const activity = {
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
          activities: { type: "array", items: activity },
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

/* ---------- Pengaman: hanya user yang login boleh memakai AI ---------- */
async function requireUser(req, res, next) {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    // Jangan membiarkan endpoint AI publik tanpa autentikasi di production.
    if (process.env.NODE_ENV === "production") {
      return res.status(503).json({ error: "Autentikasi server belum dikonfigurasi." });
    }
    return next(); // mode development lokal saja
  }
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token)
    return res
      .status(401)
      .json({ error: "Silakan masuk dulu untuk memakai AI." });
  try {
    const r = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: anon, Authorization: `Bearer ${token}` },
    });
    if (!r.ok)
      return res
        .status(401)
        .json({ error: "Sesi login tidak valid. Masuk ulang ya." });
    req.user = await r.json();
    next();
  } catch {
    res.status(502).json({ error: "Gagal memverifikasi sesi login." });
  }
}

// Batas sederhana: 6 generasi baru / menit / user. Cache hit tidak memakai kuota ini.
const hits = new Map();
function checkRateLimit(req, res) {
  const key = req.user?.id || req.ip;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 6) {
    res.status(429).json({ error: "Batas permintaan sementara tercapai. Tunggu satu menit lalu coba lagi." });
    return false;
  }
  hits.set(key, [...recent, now]);
  return true;
}

function validate(body) {
  const { destination, startDate, endDate, budget, travelers, transport } =
    body || {};
  if (typeof destination !== "string" || destination.trim().length < 2)
    return "Tujuan minimal 2 karakter.";
  const b = Number(budget),
    t = Number(travelers);
  if (!Number.isFinite(b) || b < 0 || b > 1e9)
    return "Budget harus 0 – 1 miliar rupiah.";
  if (!Number.isInteger(t) || t < 1 || t > 20)
    return "Jumlah traveler 1 – 20 orang.";
  if (startDate && endDate && new Date(endDate) < new Date(startDate))
    return "Tanggal pulang sebelum tanggal berangkat.";
  return null;
}

const dayCount = (s, e) =>
  s && e
    ? Math.min(14, Math.round((new Date(e) - new Date(s)) / 864e5) + 1)
    : 3;

app.get("/api/health", (_req, res) => res.json({
  ok: true,
  aiConfigured: Boolean(process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY),
}));

/* ---------- Penyedia AI (urutan dari .env: AI_PROVIDER_ORDER, default groq lalu gemini) ----------
   Groq jauh lebih cepat; Gemini jadi cadangan. Pergantian terjadi diam-diam di server,
   user tidak pernah melihat nama provider (pesan error pun dibuat netral). */
const MAX_TOKENS = Number(process.env.AI_MAX_OUTPUT_TOKENS) || 4096;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const SHAPE = `{"trip_title":"","overview":"","days":[{"day_number":1,"title":"","activities":[{"time":"09:00","place":"","description":"","duration_minutes":60,"estimated_cost_idr":0,"notes":""}]}],"total_estimated_cost_idr":0,"budget_note":"","important_notes":[""]}`;

function extractText(data) {
  if (typeof data?.output_text === "string") return data.output_text;
  if (Array.isArray(data?.steps)) {
    return data.steps
      .filter((s) => s?.type === "model_output")
      .flatMap((s) => s.content || [])
      .filter((p) => p?.type === "text")
      .map((p) => p.text)
      .join("\n");
  }
  return "";
}

function parseItinerary(text) {
  const clean = String(text)
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
  const itinerary = JSON.parse(clean);
  if (
    !itinerary?.trip_title ||
    !Array.isArray(itinerary.days) ||
    itinerary.days.length === 0
  )
    throw new Error("bad shape");
  return itinerary;
}

const providers = {
  groq: {
    key: () => process.env.GROQ_API_KEY,
    timeout: 15_000,
    async call(prompt, days) {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
              content: `Balas HANYA dengan JSON valid persis bentuk ini (tanpa teks lain): ${SHAPE}`,
            },
            { role: "user", content: prompt },
          ],
          // GPT-OSS 120B mendukung strict JSON Schema. Ini lebih andal daripada
          // JSON Object Mode yang dapat mengembalikan HTTP 400 saat generasi JSON gagal.
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
          // Output ringkas mempercepat respons dan mengurangi pemakaian token.
          max_tokens: Math.min(MAX_TOKENS, 850 + days * 380),
        }),
        signal: AbortSignal.timeout(this.timeout),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) {
        const message = data?.error?.message || data?.message || "";
        const failedReason = typeof data?.error?.failed_generation === "object"
          ? data.error.failed_generation?.reason
          : "";
        // Log alasan ringkas dari provider untuk diagnosis, tanpa mencetak
        // attempted output/prompt pengguna ke log server.
        const detail = failedReason ? ` (reason: ${String(failedReason).slice(0, 180)})` : "";
        throw new Error(`HTTP ${r.status}${message ? `: ${message}` : ""}${detail}`);
      }
      if (!data) throw new Error("Respons Groq bukan JSON yang valid.");
      return data.choices?.[0]?.message?.content || "";
    },
  },
  gemini: {
    key: () => process.env.GEMINI_API_KEY,
    timeout: 25_000,
    async call(prompt, days) {
      const r = await fetch(GEMINI_API_URL, {
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
          // Itinerary tidak memerlukan penalaran mendalam; level rendah membantu
          // menghindari timeout tanpa menghilangkan output JSON terstruktur.
          generation_config: {
            thinking_level: "low",
            max_output_tokens: Math.min(MAX_TOKENS, 850 + days * 380),
          },
        }),
        signal: AbortSignal.timeout(this.timeout),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) {
        const message = data?.error?.message || data?.message || "";
        throw new Error(`HTTP ${r.status}${message ? `: ${message}` : ""}`);
      }
      if (!data) throw new Error("Respons Gemini bukan JSON yang valid.");
      return extractText(data);
    },
  },
};

const order = (process.env.AI_PROVIDER_ORDER || "groq,gemini")
  .split(",")
  .map((n) => n.trim().toLowerCase())
  .filter((n) => providers[n]);

// Coba provider satu per satu sampai ada yang menghasilkan itinerary valid.
async function generate(prompt, days) {
  for (const name of order) {
    const provider = providers[name];
    if (!provider.key()) continue;
    try {
      return parseItinerary(await provider.call(prompt, days));
    } catch (e) {
      console.warn(`[ai] ${name} gagal: ${String(e?.message || e).slice(0, 300)}`); // hanya log server
    }
  }
  return null;
}

/* ---------- Cache: permintaan yang sama tidak memanggil AI lagi ---------- */
const cache = new Map();
// Mencegah klik ganda / permintaan identik bersamaan menghabiskan kuota AI.
const inFlight = new Map();
const CACHE_TTL = 6 * 3600_000;
const cacheKey = (b) =>
  JSON.stringify(
    [
      b.destination,
      b.country,
      b.startDate,
      b.endDate,
      Number(b.budget),
      Number(b.travelers),
      b.transport,
      b.interests,
    ].map((v) => (typeof v === "string" ? v.trim().toLowerCase() : (v ?? ""))),
  );

app.post("/api/itinerary", requireUser, async (req, res) => {
  if (!order.some((n) => providers[n].key())) {
    return res.status(503).json({
      error: "Layanan AI belum dikonfigurasi. Tambahkan kunci API AI di environment server.",
    });
  }

  const problem = validate(req.body);
  if (problem) return res.status(400).json({ error: problem });

  const key = cacheKey(req.body);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL) {
    return res.json({ itinerary: hit.itinerary });
  }
  if (hit) cache.delete(key);

  // Jika permintaan yang sama sedang berjalan, tunggu hasil itu alih-alih memanggil AI lagi.
  const pending = inFlight.get(key);
  if (pending) {
    try {
      const sharedItinerary = await pending;
      if (!sharedItinerary) {
        return res.status(503).json({
          error: "Semua layanan AI sedang sibuk atau mencapai batas pemakaian. Coba lagi beberapa saat lagi.",
        });
      }
      return res.json({ itinerary: sharedItinerary });
    } catch {
      return res.status(503).json({ error: "AI sedang sibuk. Coba lagi sebentar lagi." });
    }
  }

  if (!checkRateLimit(req, res)) return;

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
  const days = dayCount(startDate, endDate);

  const prompt = `Kamu adalah AI Trip Planner. Buat itinerary ${days} hari dalam bahasa Indonesia.
Tujuan: ${String(destination).slice(0, 120)} ${String(country).slice(0, 80)}
Tanggal: ${startDate || "belum ditentukan"} s/d ${endDate || "belum ditentukan"}
Traveler: ${travelers} orang | Transportasi: ${String(transport).slice(0, 30)} | Budget total: Rp ${budget}
Minat: ${String(interests).slice(0, 200) || "umum"}
Aturan: semua biaya rupiah bilangan bulat untuk seluruh rombongan; jangan mengarang harga/jam buka sebagai fakta (tandai sebagai estimasi);
ingatkan cek visa, dokumen, dan jadwal resmi; usahakan total biaya tidak melebihi budget.
Ringkas: maksimal 3 kegiatan per hari, deskripsi pendek, notes singkat, important_notes maksimal 3 butir. Kembalikan hanya JSON valid sesuai skema.`;

  const generation = generate(prompt, days);
  inFlight.set(key, generation);
  try {
    const itinerary = await generation;
    if (!itinerary) {
      return res.status(503).json({
        error: "Semua layanan AI sedang sibuk atau mencapai batas pemakaian. Coba lagi beberapa saat lagi.",
      });
    }

    if (cache.size >= 200) cache.delete(cache.keys().next().value);
    cache.set(key, { itinerary, at: Date.now() });
    return res.json({ itinerary });
  } catch (error) {
    console.error("[ai] Gagal membuat itinerary:", String(error?.message || error).slice(0, 300));
    return res.status(503).json({ error: "AI sedang sibuk. Coba lagi sebentar lagi." });
  } finally {
    if (inFlight.get(key) === generation) inFlight.delete(key);
  }
});

// Jika hasil build tersedia, server Node juga bisa menyajikan frontend.
// Ini memungkinkan frontend dan API hidup pada satu domain di production.
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
    return res.sendFile(path.join(distPath, "index.html"), (error) => {
      if (error) next(error);
    });
  });
}

app.listen(PORT, () =>
  console.log(
    `TripTrip AI server: http://localhost:${PORT} | provider: ${order.filter((n) => providers[n].key()).join(" > ") || "(belum ada key)"}`,
  ),
);
