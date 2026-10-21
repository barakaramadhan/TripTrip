import { motion } from "framer-motion";

const sizes = {
  small: {
    box: "h-[240px] sm:h-[280px]",
    country: "text-base",
    name: "text-3xl",
    tags: "text-sm",
  },
  featured: {
    box: "h-[420px] sm:h-[480px] lg:h-full",
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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{ borderRadius: 32 }}
      className={`group relative block w-full cursor-pointer overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentSend ${size.box}`}
    >
      <motion.span
        layoutId={`image-${layoutKey}`}
        className="absolute inset-0 block"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.span>

      <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

      <span className="absolute inset-x-0 bottom-0 block p-5">
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
      </span>
    </motion.button>
  );
}

export default DestinationCard;
