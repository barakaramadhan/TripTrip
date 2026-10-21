import { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import useLockScroll from "../../hooks/useLockScroll";
import { useSession } from "../../hooks/useSession";

const stats = [
  { icon: "fi-rr-calendar", label: "Duration", field: "duration" },
  { icon: "fi-rr-sun", label: "Best time", field: "bestTime" },
  { icon: "fi-rr-wallet", label: "Est. budget", field: "budget" },
];

// Isi modal muncul bergantian setelah panel selesai membesar
const reveal = (order) => ({
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + order * 0.08, duration: 0.4 },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
});

function DestinationModal({ item, layoutKey, onClose }) {
  useLockScroll();
  const { user } = useSession();

  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-6 max-sm:p-3"
    >
      {/* Latar gelap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-textMoss/60 backdrop-blur-sm"
      />

      {/* Panel: tumbuh dari card yang diklik */}
      <motion.div
        layoutId={`card-${layoutKey}`}
        style={{ borderRadius: 32 }}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="relative grid max-h-full w-full max-w-5xl grid-cols-[2fr_3fr] overflow-y-auto bg-backgroundIvory max-md:grid-cols-1"
      >
        {/* Kiri: gambar */}
        <motion.div
          layoutId={`image-${layoutKey}`}
          className="relative min-h-[560px] max-md:min-h-72"
        >
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          <motion.div
            {...reveal(0)}
            className="absolute bottom-0 p-8 max-sm:p-6"
          >
            <p className="font-satoshi text-lg tracking-wider text-whitebright">
              {item.country}
            </p>
            <h2 className="font-satoshi text-5xl font-bold text-whitebright max-sm:text-4xl">
              {item.name}
            </h2>
          </motion.div>
        </motion.div>

        {/* Kanan: info */}
        <div className="flex flex-col gap-8 p-10 max-sm:gap-6 max-sm:p-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-whitebright text-2xl text-textMoss shadow-md transition-colors hover:bg-secondarySage"
          >
            <i className="fi fi-rr-cross-small inline-flex" />
          </button>

          <motion.ul {...reveal(1)} className="flex flex-wrap gap-2 pr-14">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-accentSend px-4 py-1 font-satoshi text-sm font-medium text-textMoss"
              >
                {tag}
              </li>
            ))}
          </motion.ul>

          <motion.p
            {...reveal(2)}
            className="font-satoshi text-xl font-medium text-textMoss"
          >
            {item.description}
          </motion.p>

          <motion.div
            {...reveal(3)}
            className="grid grid-cols-3 gap-3 max-sm:grid-cols-1"
          >
            {stats.map(({ icon, label, field }) => (
              <div key={field} className="rounded-2xl bg-whitebright p-4">
                <i
                  className={`fi ${icon} inline-flex text-xl text-accentSend`}
                />
                <p className="mt-2 font-satoshi text-sm text-textLabel">
                  {label}
                </p>
                <p className="font-satoshi text-lg font-bold text-textMoss">
                  {item[field]}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div {...reveal(4)}>
            <h3 className="font-switzer text-2xl font-bold text-textMoss">
              Top highlights
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {item.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="flex items-center gap-4 font-satoshi text-lg text-textMoss"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondarySage/40 font-medium">
                    {index + 1}
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...reveal(5)}
            className="mt-auto flex gap-3 max-sm:flex-col"
          >
            {/* Sudah login -> buka Plan a Trip dengan tujuan terisi; belum -> daftar dulu */}
            <Button
              to={user ? `/dashboard/plan?dest=${item.name.toLowerCase()}` : "/signup"}
              className="px-6 py-3">
              Plan this trip
            </Button>
            <Button variant="accent" className="px-6 py-3" onClick={onClose}>
              Back to destinations
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default DestinationModal;
