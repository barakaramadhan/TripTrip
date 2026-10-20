import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase belum dikonfigurasi. Salin .env.example menjadi .env, isi URL & anon key, lalu restart `npm run dev`.',
  )
}

/* ------------------------------------------------------------------ */
/*  "Remember me"                                                      */
/* ------------------------------------------------------------------ */
// Dicentang       -> sesi login disimpan di localStorage (tetap login walau browser ditutup)
// Tidak dicentang -> sesi disimpan di sessionStorage (hilang saat tab/browser ditutup)

const REMEMBER_KEY = 'triptrip:remember-me'

export const setRememberMe = (remember) => localStorage.setItem(REMEMBER_KEY, String(remember))

const pickStorage = () => (localStorage.getItem(REMEMBER_KEY) === 'false' ? sessionStorage : localStorage)

const authStorage = {
  getItem: (key) => localStorage.getItem(key) ?? sessionStorage.getItem(key),
  setItem: (key, value) => {
    const target = pickStorage()
    const other = target === localStorage ? sessionStorage : localStorage
    other.removeItem(key) // jangan sampai ada sesi lama yang tertinggal di storage satunya
    target.setItem(key, value)
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  },
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storage: authStorage },
})
