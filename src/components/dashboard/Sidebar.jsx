import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router";
import { initials } from "../../utils/format";

const NAV = [
  { to: "/dashboard", label: "Home", icon: "fi fi-rr-house-blank", end: true },
  { to: "/dashboard/destinations", label: "Destination", icon: "fi fi-rr-marker" },
  { to: "/dashboard/plan", label: "Plan a Trip", icon: "fi fi-rr-route" },
  { to: "/dashboard/map", label: "Map", icon: "fi fi-rr-map-marker" },
  { to: "/dashboard/settings", label: "Settings", icon: "fi fi-rr-settings" },
];

const SPRING = { type: "spring", stiffness: 300, damping: 32 };

// Label yang muncul/hilang halus saat sidebar dibuka/diminimize
function Fade({ show, children, className = "" }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className={`inline-block overflow-hidden whitespace-nowrap ${className}`}>
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function Sidebar({ collapsed, onToggle, name }) {
  const open = !collapsed;
  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 272 : 84 }}
      transition={SPRING}
      className="top-3 sticky flex flex-col gap-4 h-[calc(100dvh-1.5rem)] shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-4 bg-whitebright/70 px-4 border border-secondarySage/60 rounded-3xl h-[5.5rem] overflow-hidden">
        <div className="flex justify-center items-center bg-textMoss rounded-full size-12 font-switzer font-bold text-white text-2xl shrink-0">L</div>
        <Fade show={open} className="font-switzer font-semibold text-textMoss text-lg">
          <span className="block pb-1 border-secondarySage border-b border-dashed">TripTrip.com</span>
        </Fade>
      </div>

      {/* Navigasi */}
      <nav className="relative flex flex-col flex-1 gap-2 bg-whitebright/70 p-3 border border-secondarySage/60 rounded-3xl">
        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? "Minimize sidebar" : "Expand sidebar"}
          className="top-5 -right-3 z-10 absolute flex justify-center items-center bg-whitebright shadow-sm border border-secondarySage rounded-full size-6 text-primaryForest cursor-pointer">
          <motion.svg animate={{ rotate: open ? 0 : 180 }} width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>

        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} title={item.label} className="relative">
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: isActive ? 0 : 3 }}
                className={`relative flex items-center gap-4 h-14 rounded-2xl px-4 font-satoshi transition-colors ${
                  isActive ? "text-primaryForest" : "text-textMoss hover:bg-secondarySage/20"
                } ${open ? "justify-between" : "justify-center"}`}>
                {isActive && (
                  <>
                    {/* Latar hijau + garis tebal di kanan: pindah halus antar menu (layoutId) */}
                    <motion.span layoutId="nav-bg" transition={SPRING} className="absolute inset-0 bg-secondarySage/40 rounded-2xl" />
                    <motion.span layoutId="nav-bar" transition={SPRING} className="top-1/2 -left-3 absolute bg-primaryForest rounded-r-full w-1.5 h-6 -translate-y-1/2" />
                  </>
                )}
                <Fade show={open} className="z-10 relative text-base">
                  {item.label}
                </Fade>
                <i className={`${item.icon} relative z-10 flex items-center text-xl`} />
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profil */}
      <div className="flex items-center gap-3 bg-whitebright/70 px-3 border border-secondarySage/60 rounded-3xl h-[5.5rem] overflow-hidden">
        <div className="flex justify-center items-center bg-accentSend rounded-full size-12 font-switzer font-bold text-white text-xl shrink-0">
          {initials(name)}
        </div>
        <Fade show={open} className="font-satoshi">
          <span className="block font-bold text-textMoss">{name}</span>
          <span className="block text-textLabel text-xs">Hello {name.split(/\s|_/)[0]}, Let&apos;s TripTriiiip!!</span>
        </Fade>
      </div>
    </motion.aside>
  );
}
