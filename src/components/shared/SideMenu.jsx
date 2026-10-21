import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useLockScroll from "../../hooks/useLockScroll";
import Button from "../ui/Button";
import { EASE_OUT } from "../../animations/variants";

// Ikon kecil (SVG) supaya tidak bergantung pada library ikon lain.
function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {children}
    </svg>
  );
}

const ITEMS = [
  {
    label: "Home",
    href: "#",
    icon: <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />,
  },
  {
    label: "Destination",
    href: "#destinations",
    icon: (
      <>
        <path d="M12 21s-6-5.6-6-10a6 6 0 0 1 12 0c0 4.4-6 10-6 10z" />
        <circle cx="12" cy="11" r="2" />
      </>
    ),
  },
  {
    label: "Plan a Trip",
    href: "#planner",
    icon: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8.5 18H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.5" />
      </>
    ),
  },
];

// Menu samping (tampilan untuk tamu / guest): daftar halaman + tombol Sign Up di bawah.
function SideMenu({ onClose }) {
  const [active, setActive] = useState("Home");
  useLockScroll();

  // Tekan Esc untuk menutup menu
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const choose = (label) => {
    setActive(label);
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="z-[60] fixed inset-0 bg-black/30"
      />

      <motion.aside
        role="dialog"
        aria-label="Menu"
        initial={{ x: "110%" }}
        animate={{ x: 0 }}
        exit={{ x: "110%" }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="right-0 z-[70] fixed inset-y-0 flex flex-col bg-whitebright shadow-xl border border-secondarySage rounded-l-3xl w-[min(17rem,calc(100vw-1.5rem))] font-satoshi text-textMoss">
        <nav className="flex flex-col flex-1 gap-2 p-3">
          {ITEMS.map(({ label, href, icon }) => {
            const isActive = active === label;
            return (
              <a
                key={label}
                href={href}
                onClick={() => choose(label)}
                className={`relative flex items-center justify-between rounded-2xl px-4 py-3 transition-colors ${
                  isActive ? "bg-secondarySage/40" : "hover:bg-secondarySage/20"
                }`}>
                {label}
                <Icon>{icon}</Icon>
                {isActive && (
                  <span className="top-1/2 -right-3 absolute bg-primaryForest rounded-l-full w-1 h-6 -translate-y-1/2" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="p-3 border-secondarySage/40 border-t">
          <Button
            to="/signup"
            onClick={onClose}
            className="py-3.5 w-full text-lg">
            Sign Up
          </Button>
        </div>
      </motion.aside>
    </>
  );
}

export default SideMenu;
