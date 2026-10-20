import { useState } from "react";
import Button from "../ui/Button";
import Sidebar from "./Sidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative flex justify-between items-center px-20 py-4 max-md:px-6 max-sm:px-4">
      <h1 className="font-switzer font-bold">TripTrip.com</h1>

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

      {/* Selalu di-render agar animasi translate CSS dapat berjalan */}
      <Sidebar open={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
}

export default Navbar;