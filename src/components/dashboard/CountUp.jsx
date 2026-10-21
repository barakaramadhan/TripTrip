import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { EASE_OUT } from "../../animations/variants";

const whole = (v) => Math.round(v);

// Angka yang "menghitung naik" dari 0 saat muncul / berubah.
export default function CountUp({ value, format = whole }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, format);
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: EASE_OUT });
    return () => controls.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}
