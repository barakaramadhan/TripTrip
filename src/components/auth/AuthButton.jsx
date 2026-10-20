import { motion } from "framer-motion";

const VARIANTS = {
  primary: "bg-accentSend text-textMoss",
  secondary: "bg-secondarySage/30 text-textMoss",
};

// Tombol pil. Efek: membesar sedikit saat di-hover, mengecil saat ditekan.
// `loading` menampilkan spinner dan menonaktifkan tombol.
export default function AuthButton({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      disabled={loading}
      className={`flex h-12 cursor-pointer items-center justify-center rounded-full text-lg font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-70 ${VARIANTS[variant]} ${className}`}
      {...props}>
      {loading ? (
        <span className="border-2 border-textMoss/30 border-t-textMoss rounded-full size-5 animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
}
