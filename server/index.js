// Server AI kecil (Express). Menyembunyikan GEMINI_API_KEY dari browser.
// Jalankan: npm run server   (frontend memanggilnya lewat proxy /api di vite.config.js)
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "30kb" }));

/* ---------- Bentuk JSON yang diminta dari AI ---------- */
const str = { type: "string" };
const int = { type: "integer" };
const activity = {
  type: "object",
  properties: { time: str, place: str, description: str, duration_minutes: int, estimated_cost_idr: int, notes: str },
  required: ["time", "place", "description", "duration_minutes", "estimated_cost_idr", "notes"],
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
        properties: { day_number: int, title: str, activities: { type: "array", items: activity } },
        required: ["day_number", "title", "activities"],
        additionalProperties: false,
      },
    },
    total_estimated_cost_idr: int,
    budget_note: str,
    important_notes: { type: "array", items: str },
  },
  required: ["trip_title", "overview", "days", "total_estimated_cost_idr", "budget_note", "important_notes"],
  additionalProperties: false,
};

/* ---------- Pengaman: hanya user yang login boleh memakai AI ---------- */
async function requireUser(req, res, next) {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) return next(); // mode dev tanpa pengecekan
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Silakan masuk dulu untuk memakai AI." });
  try {
    const r = await fetch(`${url}/auth/v1/user`, { headers: { apikey: anon, Authorization: `Bearer ${token}` } });
    if (!r.ok) return res.status(401).json({ error: "Sesi login tidak valid. Masuk ulang ya." });
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
  if (recent.length >= 6) return res.status(429).json({ error: "Terlalu sering. Tunggu sebentar lalu coba lagi." });
  hits.set(key, [...recent, now]);
  next();
}

function validate(body) {
  const { destination, startDate, endDate, budget, travelers, transport } = body || {};
  if (typeof destination !== "string" || destination.trim().length < 2) return "Tujuan minimal 2 karakter.";
  const b = Number(budget), t = Number(travelers);
  if (!Number.isFinite(b) || b < 0 || b > 1e9) return "Budget harus 0 – 1 miliar rupiah.";
  if (!Number.isInteger(t) || t < 1 || t > 20) return "Jumlah traveler 1 – 20 orang.";
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) return "Tanggal pulang sebelum tanggal berangkat.";
  return null;
}

const dayCount = (s, e) => (s && e ? Math.min(14, Math.round((new Date(e) - new Date(s)) / 864e5) + 1) : 3);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/itinerary", requireUser, rateLimit, async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY belum diisi di .env." });
  const problem = validate(req.body);
  if (problem) return res.status(400).json({ error: problem });

  const { destination, country = "", startDate, endDate, budget, travelers, transport = "flexible", interests = "" } = req.body;
  const days = dayCount(startDate, endDate);

  const prompt = `Kamu adalah AI Trip Planner. Buat itinerary ${days} hari dalam bahasa Indonesia.
Tujuan: ${String(destination).slice(0, 120)} ${String(country).slice(0, 80)}
Tanggal: ${startDate || "belum ditentukan"} s/d ${endDate || "belum ditentukan"}
Traveler: ${travelers} orang | Transportasi: ${String(transport).slice(0, 30)} | Budget total: Rp ${budget}
Minat: ${String(interests).slice(0, 200) || "umum"}
Aturan: semua biaya rupiah bilangan bulat untuk seluruh rombongan; jangan mengarang harga/jam buka sebagai fakta (tandai sebagai estimasi);
ingatkan cek visa, dokumen, dan jadwal resmi; usahakan total biaya tidak melebihi budget; kembalikan hanya JSON sesuai schema.`;

  try {
    const r = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        input: prompt,
        response_format: { type: "text", mime_type: "application/json", schema: itinerarySchema },
      }),
      signal: AbortSignal.timeout(90_000),
    });
    const data = await r.json().catch(() => null);
    if (!r.ok || !data) {
      const map = { 401: "API key Gemini ditolak.", 403: "API key Gemini ditolak.", 429: "Kuota Gemini habis.", 503: "Server Gemini sibuk, coba lagi." };
      return res.status(r.status === 429 || r.status === 503 ? r.status : 502).json({ error: map[r.status] || "Gemini gagal membuat itinerary." });
    }

    // Jawaban bisa ada di output_text atau di steps[].content[].text
    let text = typeof data.output_text === "string" ? data.output_text : "";
    if (!text && Array.isArray(data.steps)) {
      text = data.steps
        .filter((s) => s?.type === "model_output")
        .flatMap((s) => s.content || [])
        .filter((p) => p?.type === "text")
        .map((p) => p.text)
        .join("\n");
    }
    const itinerary = JSON.parse(text);
    if (!itinerary?.trip_title || !Array.isArray(itinerary.days)) throw new Error("bad shape");
    res.json({ itinerary });
  } catch (e) {
    const timeout = e.name === "TimeoutError" || e.name === "AbortError";
    res.status(timeout ? 504 : 502).json({ error: timeout ? "AI terlalu lama menjawab. Coba lagi." : "Format jawaban AI tidak valid. Coba lagi." });
  }
});

app.listen(PORT, () => console.log(`TripTrip AI server: http://localhost:${PORT}`));
