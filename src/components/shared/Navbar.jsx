import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Sidebar from "./Sidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 transition-all duration-300 flex justify-between items-center max-md:px-6 max-sm:px-4 ${
        isScrolled
          ? "top-0 left-10 right-10 bg-whitebright rounded-b-[50px] shadow-lg px-10 pb-6 pt-5 max-md:left-4 max-md:right-4" // Tampilan melayang dengan margin
          : "top-0 left-0 right-0 bg-transparent px-20 py-4" // Tampilan default penuh (w-full dihapus di sini)
      }`}
    >
      <h1 className={`font-switzer font-bold ${isScrolled ? "text-black" : ""}`}>
        TripTrip.com
      </h1>

      <div className="flex items-center gap-5 max-sm:gap-3">
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="max-sm:hidden">
            Sign In
          </Button>
          <Button variant="primary" className="px-4 py-2 max-sm:text-sm">
            Get Started!!
          </Button>
        </div>

        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="text-2xl text-textMoss cursor-pointer flex items-center justify-center"
        >
          <i className="fi fi-br-bars-sort"></i>
        </button>
      </div>

      <Sidebar open={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
}

export default Navbar;