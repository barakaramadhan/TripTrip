// Server AI kecil (Express). Menyembunyikan GEMINI_API_KEY dari browser.
// Jalankan: npm run server   (frontend memanggilnya lewat proxy /api di vite.config.js)
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
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
  if (!url || !anon) return next(); // mode dev tanpa pengecekan
  const token = (req.headers.authorization || "").replace("Bearer ", "");
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

// Batas sederhana: 6 permintaan / menit / user
const hits = new Map();
function rateLimit(req, res, next) {
  const key = req.user?.id || req.ip;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 6)
    return res
      .status(429)
      .json({ error: "Terlalu sering. Tunggu sebentar lalu coba lagi." });
  hits.set(key, [...recent, now]);
  next();
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

app.get("/api/health", (_req, res) => res.json({ ok: true }));

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
    timeout: 30_000,
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
          response_format: { type: "json_object" },
          temperature: 0.6,
          max_tokens: Math.min(MAX_TOKENS, 900 + days * 520),
        }),
        signal: AbortSignal.timeout(this.timeout),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok || !data) throw new Error(`http ${r.status}`);
      return data.choices?.[0]?.message?.content || "";
    },
  },
  gemini: {
    key: () => process.env.GEMINI_API_KEY,
    timeout: 60_000,
    async call(prompt) {
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
        }),
        signal: AbortSignal.timeout(this.timeout),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok || !data) throw new Error(`http ${r.status}`);
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
      console.warn(`[ai] ${name} gagal: ${e.message}`); // hanya di log server
    }
  }
  return null;
}

/* ---------- Cache: permintaan yang sama tidak memanggil AI lagi ---------- */
const cache = new Map();
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

app.post("/api/itinerary", requireUser, rateLimit, async (req, res) => {
  if (!order.some((n) => providers[n].key()))
    return res
      .status(500)
      .json({ error: "Layanan AI belum dikonfigurasi di server." });
  const problem = validate(req.body);
  if (problem) return res.status(400).json({ error: problem });

  const key = cacheKey(req.body);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL)
    return res.json({ itinerary: hit.itinerary });

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
Ringkas: maksimal 4 kegiatan per hari, deskripsi 1 kalimat pendek, notes singkat, important_notes maksimal 3 butir. Kembalikan hanya JSON.`;

  const itinerary = await generate(prompt, days);
  if (!itinerary)
    return res
      .status(502)
      .json({ error: "AI sedang sibuk. Coba lagi sebentar lagi." });

  if (cache.size >= 200) cache.delete(cache.keys().next().value);
  cache.set(key, { itinerary, at: Date.now() });
  res.json({ itinerary });
});

app.listen(PORT, () =>
  console.log(
    `TripTrip AI server: http://localhost:${PORT} | provider: ${order.filter((n) => providers[n].key()).join(" > ") || "(belum ada key)"}`,
  ),
);
