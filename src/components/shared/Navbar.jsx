import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import SideMenu from "./SideMenu";
import { EASE_OUT } from "../../animations/variants";

const LINKS = [
  { href: "#planner", label: "Plan" },
  { href: "#destinations", label: "Destinations" },
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
];

// Navbar menempel di atas. Transparan di puncak halaman, lalu berubah jadi
// kaca buram begitu di-scroll. Di layar kecil, menu dibuka lewat tombol hamburger.
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hiddenForDestinations, setHiddenForDestinations] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const section = document.getElementById("destinations");
      const headerHeight =
        headerRef.current?.getBoundingClientRect().height ?? 0;
      const bounds = section?.getBoundingClientRect();
      const shouldHide = Boolean(
        bounds && bounds.top <= headerHeight && bounds.bottom > headerHeight,
      );

      setHiddenForDestinations(shouldHide);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        ref={headerRef}
        aria-hidden={hiddenForDestinations}
        inert={hiddenForDestinations}
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hiddenForDestinations ? "-100%" : 0,
          opacity: hiddenForDestinations ? 0 : 1,
        }}
        transition={{
          duration: hiddenForDestinations ? 0.18 : 0.25,
          ease: EASE_OUT,
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          hiddenForDestinations ? "pointer-events-none" : ""
        } ${
          scrolled || open
            ? "bg-backgroundIvory/85 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}>
        <nav className="flex justify-between items-center mx-auto px-5 sm:px-10 lg:px-20 py-3 lg:py-4 max-w-[100rem]">
          <Link
            to="/"
            onClick={close}
            className="font-switzer font-bold text-lg sm:text-xl">
            TripTrip.com
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Button to="/signin" variant="secondary">
                Sign In
              </Button>
              <Button to="/signup">Get Started!!</Button>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={`flex size-10 cursor-pointer items-center justify-center rounded-full text-2xl text-textMoss transition-colors hover:bg-secondarySage/40`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.i
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`fi ${open ? "fi-rr-cross-small" : "fi-br-bars-sort"} inline-flex`}
                />
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menu samping: dibuka lewat tombol hamburger */}
      <AnimatePresence>{open && <SideMenu onClose={close} />}</AnimatePresence>
    </>
  );
}

export default Navbar;
