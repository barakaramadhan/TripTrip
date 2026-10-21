import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";
import SideMenu from "./SideMenu";
import { useSession } from "../../hooks/useSession";

// Navbar menempel di atas. Di paling atas halaman ia transparan; begitu di-scroll
// berubah jadi "kaca" (blur + tembus pandang) dan sedikit mengecil.
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Langsung benar walau halaman di-refresh di tengah (sudah ter-scroll)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const { user } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // z-[45]: di atas kartu landing (z-40), di bawah modal destinasi (z-50).
    // Efek blur sengaja ada di lapisan anak (bukan di <nav>) supaya menu samping
    // yang `fixed` tetap menempel ke layar, bukan ke navbar.
    <nav
      className={`sticky top-0 z-[45] flex justify-between items-center px-20 max-sm:px-4 max-md:px-6 transition-[padding] duration-500 ${
        scrolled ? "py-2.5" : "py-4"
      }`}>
      <div
        aria-hidden="true"
        className={`-z-10 absolute inset-0 bg-backgroundIvory/55 backdrop-blur-xl backdrop-saturate-150 border-b border-white/60 shadow-[0_10px_30px_-12px_rgba(36,75,58,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <h1 className="font-switzer font-bold">
        {/* #top: klik = meluncur halus ke atas (ditangani Lenis) */}
        <a href="#top" className="hover:opacity-70 transition-opacity">
          TripTrip.com
        </a>
      </h1>

      <div className="flex items-center gap-5 max-sm:gap-3">
        <div className="flex items-center gap-2">
          {user ? (
            <Button to="/dashboard" variant="primary" className="px-4 py-2 max-sm:text-sm">
              My Dashboard
            </Button>
          ) : (
            <>
              <Button to="/signin" variant="secondary" className="max-sm:hidden">
                Sign In
              </Button>
              <Button to="/signup" variant="primary" className="px-4 py-2 max-sm:text-sm">
                Get Started!!
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center text-textMoss text-2xl cursor-pointer">
          <i className="fi fi-br-bars-sort"></i>
        </button>
      </div>

      {/* Selalu di-render agar animasi translate CSS dapat berjalan */}
      <SideMenu open={isOpen} onClose={() => setIsOpen(false)} isLoggedIn={Boolean(user)} />
    </nav>
  );
}

export default Navbar;
