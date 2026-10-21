import { motion } from "framer-motion";

export default function BigWord({ text, delay = 0, className = "" }) {
  return (
    <h2 aria-label={text} className={`relative font-switzer font-bold leading-[0.95] tracking-wide ${className}`}>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay }}
        style={{ filter: "drop-shadow(1px -1px 0 var(--color-textMoss))" }}
        className="absolute -top-[2px] left-[2px] block whitespace-nowrap text-secondarySage/40"
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay }}
        className="relative block whitespace-nowrap text-textMoss"
      >
        {text}
      </motion.span>
    </h2>
  );
}
