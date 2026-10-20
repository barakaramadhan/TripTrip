import { AnimatePresence, motion } from "framer-motion";

const sizes = {
  small: {
    box: "h-[280px]",
    country: "text-base",
    name: "text-3xl",
    tags: "text-sm",
  },
  featured: {
    box: "h-[680px] max-md:h-[450px]",
    country: "text-lg",
    name: "text-5xl max-sm:text-4xl",
    tags: "text-lg",
  },
};

function DestinationCard({ item, layoutKey, featured = false, onSelect }) {
  const size = featured ? sizes.featured : sizes.small;

  return (
    <motion.button
      type="button"
      layoutId={`card-${layoutKey}`}
      onClick={() => onSelect(item, layoutKey)}
      whileTap={{ scale: 0.98 }}
      style={{ borderRadius: 32 }}
      className={`group relative block w-full cursor-pointer overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentSend ${size.box}`}
    >
      <motion.span
        layoutId={`image-${layoutKey}`}
        className="absolute inset-0 block"
      >
        {/* key={item.id}: saat item berganti, gambar lama pudar & gambar baru muncul (crossfade) */}
        <AnimatePresence initial={false}>
          <motion.img
            key={item.id}
            src={item.image}
            alt={item.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // gambar lama tetap terlihat sampai gambar baru selesai muncul, baru dihapus
            exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.01 } }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AnimatePresence>
      </motion.span>

      <span className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

      {/* Teks juga berganti halus saat item berubah */}
      <AnimatePresence initial={false}>
        <motion.span
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute inset-x-0 bottom-0 block p-5"
        >
          <span
            className={`block font-satoshi tracking-wider text-whitebright ${size.country}`}
          >
            {item.country}
          </span>
          <span
            className={`block font-satoshi font-bold text-whitebright ${size.name}`}
          >
            {item.name}
          </span>

          <span className="flex items-center justify-between">
            <span
              className={`font-satoshi font-light text-accentSend ${size.tags}`}
            >
              {item.tags.join(", ")}
            </span>
            {!featured && (
              <i className="fi fi-rr-angle-small-right inline-flex text-3xl leading-none text-accentSend transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </span>

          {featured && (
            <span className="mt-4 block font-satoshi text-lg text-whitebright max-sm:text-base">
              {item.description}
            </span>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default DestinationCard;
