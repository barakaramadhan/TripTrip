import { motion } from "framer-motion";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-accentSend text-textMoss font-satoshi hover:brightness-105",
  secondary:
    "bg-secondarySage/40 text-textMoss font-satoshi border-2 border-backgroundIvory hover:bg-secondarySage/60",
  accent:
    "border border-accentSend text-textMoss font-satoshi hover:bg-accentSend/15",
};

const MotionLink = motion.create(Link);

// Tombol pil. Kalau diberi prop `to`, otomatis menjadi <Link> (navigasi tanpa reload).
function Button({
  children,
  variant = "primary",
  className = "",
  to,
  ...props
}) {
  const Component = to ? MotionLink : motion.button;

  return (
    <Component
      {...(to ? { to } : { type: "button" })}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={twMerge(
        "inline-flex justify-center items-center px-4 py-2 rounded-full font-bold text-base whitespace-nowrap transition-colors duration-200 cursor-pointer",
        variants[variant] ?? variants.primary,
        className,
      )}
      {...props}>
      {children}
    </Component>
  );
}

export default Button;
