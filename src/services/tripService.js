// Semua akses data dashboard ke Supabase ada di sini (halaman tidak menyentuh Supabase langsung).
import { supabase } from "../lib/supabase";
import { destinations as localDestinations } from "../data/destinations";

const db = () => {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi (.env).");
  return supabase;
};

/* ------------------------------- Trips ------------------------------- */

export async function fetchTrips() {
  const { data, error } = await db()
    .from("trips")
    .select("*")
    .order("start_date", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data;
}

export async function createTrip(trip) {
  // user_id diisi otomatis oleh database (default auth.uid())
  const { data, error } = await db().from("trips").insert(trip).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTrip(id) {
  const { error } = await db().from("trips").delete().eq("id", id);
  if (error) throw error;
}

/** Hitung angka kartu statistik dari daftar trip (1 query saja, tanpa query tambahan). */
export function computeStats(trips) {
  return {
    totalTrips: trips.length,
    countries: new Set(trips.map((t) => t.country).filter(Boolean)).size,
    totalBudget: trips.reduce((sum, t) => sum + Number(t.budget_idr || 0), 0),
  };
}

/* ---------------------------- Destinations --------------------------- */

// Teks dari Supabase, gambar dari folder assets (cocok lewat slug = nama huruf kecil).
const imageBySlug = Object.fromEntries(localDestinations.map((d) => [d.name.toLowerCase(), d.image]));

export async function fetchDestinations() {
  try {
    const { data, error } = await db().from("destinations").select("*").order("sort_order");
    if (error) throw error;
    if (data?.length)
      return data.map((d) => ({ ...d, bestTime: d.best_time, image: imageBySlug[d.slug] }));
  } catch {
    /* tabel belum dibuat / belum login -> pakai data lokal supaya halaman tetap hidup */
  }
  return localDestinations.map((d) => ({ ...d, slug: d.name.toLowerCase() }));
}

/* ------------------------------ Profile ------------------------------ */

export async function updateDisplayName(fullName) {
  const { error } = await db().auth.updateUser({ data: { full_name: fullName.trim() } });
  if (error) throw error;
}

export async function signOut() {
  await db().auth.signOut();
}
