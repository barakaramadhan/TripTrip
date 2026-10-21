# TripTrip

Landing page + Sign In / Sign Up (Supabase) dibangun dengan React, Vite, Tailwind v4, dan Framer Motion.

## Menjalankan

1. `npm install`
2. Salin `.env.example` menjadi `.env`, isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
3. Jalankan isi `supabase/schema.sql` di Supabase Dashboard -> SQL Editor
4. `npm run dev`, lalu buka `/` (landing), `/signin`, atau `/signup`

Landing page tetap bisa dibuka walau `.env` belum diisi; error hanya muncul di form Sign In / Sign Up.

## Struktur singkat

- `src/pages/LandingPage.jsx` — menggabungkan semua section landing
- `src/pages/*.jsx` — section: Home (hero), StarPlanning, Destinations, AiPlanned, TravelSmart, ReadyForAdventure
- `src/components/shared` — Navbar, Reveal (animasi scroll), BigWord (judul raksasa), LeafCorner, SmoothScroll
- `src/animations/variants.js` — semua resep animasi
- `src/assets/images` — semua gambar sudah WebP (total ~2 MB, sebelumnya ~45 MB)
