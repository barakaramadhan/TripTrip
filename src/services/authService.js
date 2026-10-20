// Semua pemanggilan Supabase Auth ada di sini.
// Halaman (SignIn / SignUp) tidak perlu tahu detail Supabase, cukup panggil fungsi ini.
// Kalau gagal, fungsi melempar Error dan pesannya bisa langsung ditampilkan ke user.

import { supabase, setRememberMe } from '../lib/supabase'

/**
 * Daftar akun baru.
 * Data lokasi dikirim sebagai metadata; trigger di database (supabase/schema.sql)
 * otomatis menyalinnya ke tabel `profiles`.
 */
export async function signUp({ fullName, email, password, address, city, postalCode, country }) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        address: address.trim(),
        city: city.trim(),
        postal_code: postalCode.trim(),
        country,
      },
    },
  })

  if (error) throw error

  // Kalau "Confirm email" aktif di Supabase, session belum ada sampai user klik link di email.
  return { user: data.user, needsEmailConfirmation: !data.session }
}

/** Masuk dengan email & password. */
export async function signIn({ email, password, rememberMe }) {
  setRememberMe(rememberMe) // harus dipanggil SEBELUM login supaya sesi masuk ke storage yang benar

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) throw error
  return data
}

/** Kirim email reset password. */
export async function sendPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim())
  if (error) throw error
}
