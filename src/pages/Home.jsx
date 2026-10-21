import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BigWord from "../components/shared/BigWord";
import ImageHero from "../assets/images/MainPeak.webp";
import { EASE_OUT } from "../animations/variants";

// Hero: kata raksasa di belakang, gunung (PNG transparan) di depan.
// Saat di-scroll, teks turun lebih lambat dari gambar -> efek kedalaman (parallax).
function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="isolate relative flex flex-col bg-backgroundIvory sm:h-[52vw] min-h-[max(30rem,80svh)] sm:min-h-0 overflow-hidden">
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="z-10 relative px-5 sm:px-10 lg:px-20 pt-24 sm:pt-[9vw]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          className="font-switzer font-semibold text-[clamp(1.5rem,3.2vw,5rem)] text-textMoss">
          TripTrip!!, Let&apos;s
        </motion.h1>

        <div className="relative -mt-1 sm:-mt-2 lg:-mt-4 text-[clamp(2.5rem,13.4vw,40rem)]">
          <BigWord
            text="ADVENTURE."
            delay={0.1}
            className="whitespace-nowrap"
          />
        </div>
      </motion.div>

      <motion.img
        src={ImageHero}
        alt=""
        fetchPriority="high"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
        className="bottom-0 z-20 absolute inset-x-0 w-full h-[44svh] sm:h-auto object-[60%_bottom] object-cover sm:object-contain pointer-events-none"
      />
    </section>
  );
}

export default Home;
