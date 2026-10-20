// Foto latar sisi kiri halaman Sign In / Sign Up.
// Foto berganti otomatis dan bisa dipilih lewat titik navigasi. Foto yang tampil
// pertama kali dipilih acak setiap halaman di-reload / dibuka lagi.
//
// Cara pakai:
//   1. Taruh foto di folder  public/backgrounds/
//   2. Sesuaikan nama file di `image` di bawah.
//   3. Mau tambah / kurangi slide? Cukup tambah / hapus item, titik navigasinya ikut menyesuaikan.
//
// `fallback` = gradien cadangan. Dipakai kalau foto belum ada / gagal dimuat,
// jadi tampilan tetap bagus selama foto belum dipasang.

export const SLIDE_DURATION_MS = 6000; // ganti foto otomatis tiap 6 detik

export const BACKGROUNDS = [
  {
    id: "ubud",
    image: "/backgrounds/ubud.png",
    fallback: "linear-gradient(160deg, #2f6f4e, #0e3b43)",
  },
  {
    id: "santorini",
    image: "/backgrounds/santorini.png",
    fallback: "linear-gradient(160deg, #2b6cb0, #8ec5fc)",
  },
  {
    id: "kyoto",
    image: "/backgrounds/kyoto.png",
    fallback: "linear-gradient(160deg, #c94b4b, #5b2a3c)",
  },
  {
    id: "cappadocia",
    image: "/backgrounds/cappadocia.png",
    fallback: "linear-gradient(160deg, #6b8fb3, #dfe9f3)",
  },
  {
    id: "vali",
    image: "/backgrounds/vali.png",
    fallback: "linear-gradient(160deg, #00b4b6, #014f6b)",
  },
  {
    id: "marrakech",
    image: "/backgrounds/marrakech.png",
    fallback: "linear-gradient(160deg, #d9822b, #7a3b1a)",
  },
  {
    id: "tokyo",
    image: "/backgrounds/tokyo.png",
    fallback: "linear-gradient(160deg, #3d5a6c, #9fb8c4)",
  },
  {
    id: "zermatt",
    image: "/backgrounds/zermatt.png",
    fallback: "linear-gradient(160deg, #0a7e8c, #12355b)",
  },
];
