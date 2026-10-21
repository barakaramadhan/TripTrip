import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// Memberi tahu komponen siapa yang sedang login (dan kapan sesi selesai dicek).
export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const user = session?.user ?? null;
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest";
  return { session, user, name, loading };
}
