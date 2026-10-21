import { motion } from "framer-motion";

export default function BigWord({ text, delay = 0, className = "" }) {
  return (
    <h2 aria-label={text} className={`relative font-switzer font-bold leading-[0.95] tracking-wide ${className}`}>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay }}
        style={{
          // Isi huruf = warna pucat solid, garis tipis hanya di tepi huruf
          color: "color-mix(in srgb, var(--color-secondarySage) 40%, var(--color-backgroundIvory))",
          WebkitTextStroke: "1px var(--color-textMoss)",
          paintOrder: "stroke fill",
        }}
        className="absolute -top-[0.07em] left-[0.045em] block whitespace-nowrap"
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
