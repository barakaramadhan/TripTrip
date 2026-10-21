// Fungsi kecil untuk menampilkan angka & tanggal. Dipakai di semua halaman dashboard.

const trim = (v) => v.toFixed(1).replace(".", ",").replace(/,0$/, "");

/** 4500000 -> "Rp 4,5jt" */
export function formatRupiahShort(n = 0) {
  if (n >= 1e9) return `Rp ${trim(n / 1e9)}M`;
  if (n >= 1e6) return `Rp ${trim(n / 1e6)}jt`;
  if (n >= 1e3) return `Rp ${trim(n / 1e3)}rb`;
  return `Rp ${Math.round(n)}`;
}

/** 4500000 -> "Rp 4.500.000" */
export const formatRupiah = (n = 0) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);

const toDate = (s) => new Date(`${s}T00:00:00`);
const month = (d) => d.toLocaleString("en-US", { month: "short" });

/** ("2026-11-12","2026-11-17") -> "Nov 12—17, 2026" */
export function formatDateRange(start, end) {
  if (!start) return "Dates not set";
  const a = toDate(start);
  if (!end || end === start) return `${month(a)} ${a.getDate()}, ${a.getFullYear()}`;
  const b = toDate(end);
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear())
    return `${month(a)} ${a.getDate()}—${b.getDate()}, ${a.getFullYear()}`;
  return `${month(a)} ${a.getDate()} — ${month(b)} ${b.getDate()}, ${b.getFullYear()}`;
}

export function tripDays(start, end) {
  if (!start || !end) return null;
  return Math.round((toDate(end) - toDate(start)) / 864e5) + 1;
}

export const initials = (name = "") =>
  name.split(/[\s_]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "T";
