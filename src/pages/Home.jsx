import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BigWord from "../components/shared/BigWord";
import Button from "../components/ui/Button";
import ImageHero from "../assets/images/MainPeak.webp";
import { EASE_OUT } from "../animations/variants";

// Hero: kata raksasa di belakang, gunung (PNG transparan) di depan.
// Saat di-scroll, teks turun lebih lambat dari gambar -> efek kedalaman (parallax).
function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[max(34rem,88svh)] flex-col overflow-hidden bg-backgroundIvory sm:min-h-[max(40rem,100svh)]"
    >
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 px-5 pt-24 sm:px-10 sm:pt-32 lg:px-20 lg:pt-36"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          className="font-switzer text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold text-textMoss"
        >
          TripTrip!!, Let&apos;s
        </motion.h1>

        <div className="relative -mt-1 text-[clamp(2.5rem,13.4vw,13rem)] sm:-mt-2 lg:-mt-4">
          <BigWord text="ADVENTURE." delay={0.1} className="whitespace-nowrap" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.3 }}
        className="relative z-30 mt-auto flex w-full flex-wrap gap-3 px-5 pb-5 sm:px-10 lg:px-20"
      >
        <Button to="/signup" className="px-6 py-3">
          Start Planning
        </Button>
        <Button to="#destinations" variant="secondary" className="px-6 py-3 sm:hidden">
          Explore
        </Button>
      </motion.div>

      <motion.img
        src={ImageHero}
        alt=""
        fetchPriority="high"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[44svh] w-full translate-y-8 object-cover object-[60%_bottom] sm:h-auto sm:object-contain"
      />
    </section>
  );
}

export default Home;
