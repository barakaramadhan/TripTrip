import { supabase } from "../lib/supabase";

/**
 * Minta AI membuat itinerary lewat server (server/index.js).
 * Token login dikirim supaya hanya user terdaftar yang bisa memakai kuota AI.
 */
export async function generateItinerary(input) {
  const { data } = (await supabase?.auth.getSession()) ?? {};
  const token = data?.session?.access_token;

  let res;
  try {
    res = await fetch("/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error("Server AI belum jalan. Jalankan `npm run server` di terminal lain.");
  }

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "AI gagal membuat itinerary.");
  return body.itinerary;
}
