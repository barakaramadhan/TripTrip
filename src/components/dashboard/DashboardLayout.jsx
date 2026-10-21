import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { EASE_OUT } from "../../animations/variants";
import Sidebar from "./Sidebar";

// Kerangka semua halaman dashboard: sidebar (bisa diminimize) + isi halaman.
// Belum login -> otomatis diarahkan ke /signin.
export default function DashboardLayout() {
  const { user, name, loading } = useAuth();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 1024);

  if (!supabase) {
    return <p className="p-10 font-satoshi">Isi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY di .env dulu ya.</p>;
  }
  if (loading) return <div className="bg-backgroundIvory min-h-dvh" />;
  if (!user) return <Navigate to="/signin" replace />;

  return (
    <div className="flex gap-4 sm:gap-8 bg-backgroundIvory p-3 min-h-dvh">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} name={name} />
      {/* key = pathname -> animasi masuk diputar ulang tiap pindah halaman */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className="flex-1 mx-auto px-1 sm:px-4 pt-6 pb-16 min-w-0 max-w-6xl">
        <Outlet context={{ user, name }} />
      </motion.main>
    </div>
  );
}
