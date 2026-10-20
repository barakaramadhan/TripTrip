// Semua "resep" animasi

// Kurva easing yang terasa "halus di akhir"
export const EASE_OUT = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  Elemen umum                                                        */
/* ------------------------------------------------------------------ */

// Naik pelan sambil fade-in
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

// Membal kecil, dipakai untuk badge "Your travel data is encrypted."
export const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

/* ------------------------------------------------------------------ */
/*  Sisi kiri: kotak krem                                              */
/* ------------------------------------------------------------------ */

// Kotak krem awalnya digeser 100% ke kanan = tersembunyi di belakang panel putih.
// Lalu meluncur keluar ke posisi aslinya. Anak-anaknya muncul bergantian setelahnya.
export const cardSlideOut = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: 1.1,
      delay: 0.5, // tunggu foto latar tampil dulu
      ease: EASE_OUT,
      delayChildren: 1.1, // paragraf, badge, daun mulai saat kotak hampir sampai
      staggerChildren: 0.12,
    },
  },
};

// Daun muncul dari bawah
export const leafRise = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
};

// Heading: tiap baris "terangkat" dari balik garis (efek mask).
// `custom` = jeda awal. Pertama kali dibuka butuh jeda (menunggu kotak keluar),
// saat ganti halaman tidak perlu.
export const headingVariants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { delayChildren: delay, staggerChildren: 0.12 },
  }),
  exit: { transition: { staggerChildren: 0.05 } },
};

export const lineVariants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { y: "-110%", transition: { duration: 0.35, ease: "easeIn" } },
};

/* ------------------------------------------------------------------ */
/*  Sisi kanan: form                                                   */
/* ------------------------------------------------------------------ */

// Container form. Anak-anaknya (pakai `fadeUp`) muncul berurutan.
// `custom` = arah geser: 1 = maju (ke step berikut), -1 = mundur, 0 = tanpa geser.
export const formVariants = {
  hidden: (direction = 0) => ({ opacity: 0, x: direction * 48 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: EASE_OUT,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
  exit: (direction = 0) => ({
    opacity: 0,
    x: direction * -48,
    transition: { duration: 0.25 },
  }),
};
