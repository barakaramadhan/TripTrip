
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 2.0,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
