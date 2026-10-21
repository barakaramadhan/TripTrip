import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useOutlet } from "react-router-dom";
import HeroPanel from "./HeroPanel";
import { HERO_BY_PATH } from "../../constants/authContent";

// Kerangka halaman Sign In & Sign Up.
//
//   KIRI  (hanya layar lebar): foto latar + kotak krem. Tetap terpasang saat pindah
//         halaman, jadi foto tidak "reset" dan hanya heading yang berganti.
//   KANAN : panel putih berisi form (halaman SignIn / SignUp muncul lewat <Outlet>).
//
// Panel putih punya z-20 (lebih tinggi dari kotak krem z-10), itulah yang membuat
// kotak krem terlihat "keluar dari belakang" panel putih.
export default function AuthLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const hero = HERO_BY_PATH[pathname] ?? HERO_BY_PATH["/signin"];

  return (
    <main className="relative flex bg-white min-h-dvh overflow-hidden font-satoshi text-textMoss">
      <HeroPanel lines={hero.lines} />

      <section className="z-20 relative flex justify-center items-center bg-white px-6 pt-20 pb-10 w-full lg:w-1/2">
        <Link
          to="/"
          className="top-6 left-6 absolute flex items-center gap-2 font-switzer font-bold hover:opacity-70 transition-opacity">
          <i className="inline-flex fi fi-rr-angle-small-left" />
          TripTrip.com
        </Link>

        <div className="w-full max-w-[24rem]">
          {/* mode="wait": halaman lama keluar dulu, baru halaman baru masuk */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}>
              {outlet}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
