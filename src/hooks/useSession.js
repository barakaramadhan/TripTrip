import { useSyncExternalStore } from "react";

// Status login untuk landing page. Supabase baru dimuat SETELAH halaman tampil
// (import dinamis), jadi landing page tetap ringan.
// Satu sumber data dipakai bersama oleh Navbar, menu, tombol CTA, dll.
let state = { ready: false, user: null };
const listeners = new Set();
let started = false;

const emit = (next) => {
  state = next;
  listeners.forEach((listener) => listener());
};

function start() {
  if (started) return;
  started = true;
  import("../lib/supabase")
    .then(({ supabase }) => {
      if (!supabase) return emit({ ready: true, user: null });
      supabase.auth
        .getSession()
        .then(({ data }) => emit({ ready: true, user: data.session?.user ?? null }));
      supabase.auth.onAuthStateChange((_event, session) =>
        emit({ ready: true, user: session?.user ?? null }),
      );
    })
    .catch(() => emit({ ready: true, user: null }));
}

const subscribe = (callback) => {
  listeners.add(callback);
  start();
  return () => listeners.delete(callback);
};
const getSnapshot = () => state;

export function useSession() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
