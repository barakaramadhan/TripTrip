// Foto latar sisi kiri halaman Sign In / Sign Up.
// Foto berganti otomatis dan bisa dipilih lewat titik navigasi. Foto yang tampil
// pertama kali dipilih acak setiap halaman di-reload / dibuka lagi.
//
// Foto diimpor dari src/assets/images (sudah dikompres ke WebP), jadi tidak perlu
// folder public/backgrounds lagi. Mau tambah / kurangi slide? Cukup tambah / hapus item.
//
// `fallback` = gradien cadangan kalau foto gagal dimuat.

import ubud from "../assets/images/ubud.webp";
import santorini from "../assets/images/santorini.webp";
import kyoto from "../assets/images/kyoto.webp";
import vali from "../assets/images/vali.webp";
import marrakech from "../assets/images/marrakech.webp";
import tokyo from "../assets/images/tokyo.webp";
import zermatt from "../assets/images/zermatt.webp";

export const SLIDE_DURATION_MS = 6000; // ganti foto otomatis tiap 6 detik

export const BACKGROUNDS = [
  { id: "ubud", image: ubud, fallback: "linear-gradient(160deg, #2f6f4e, #0e3b43)" },
  { id: "santorini", image: santorini, fallback: "linear-gradient(160deg, #2b6cb0, #8ec5fc)" },
  { id: "kyoto", image: kyoto, fallback: "linear-gradient(160deg, #c94b4b, #5b2a3c)" },
  { id: "vali", image: vali, fallback: "linear-gradient(160deg, #00b4b6, #014f6b)" },
  { id: "marrakech", image: marrakech, fallback: "linear-gradient(160deg, #d9822b, #7a3b1a)" },
  { id: "tokyo", image: tokyo, fallback: "linear-gradient(160deg, #3d5a6c, #9fb8c4)" },
  { id: "zermatt", image: zermatt, fallback: "linear-gradient(160deg, #0a7e8c, #12355b)" },
];
