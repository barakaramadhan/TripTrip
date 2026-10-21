import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Smooth scroll hanya aktif di landing page, dan dimatikan kalau user memilih "reduce motion".
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 2.0,
      anchors: true, // klik link #section ikut meluncur halus
    });

    return () => lenis.destroy();
  }, []);

  return null;
}

export default SmoothScroll;
