import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "../../animations/variants";

// Muncul halus saat masuk layar (sekali saja). Otomatis nonaktif kalau user
// memilih "reduce motion" di sistemnya.
export default function Reveal({
  children,
  delay = 0,
  from = { y: 40 },
  className = "",
  amount = 0.15,
  as = "div",
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
}
