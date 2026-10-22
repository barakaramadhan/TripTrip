import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import ImageHero from "../assets/images/MainPeak.webp";
import Navbar from "../components/shared/Navbar";

function Home() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion(); // hormati pengguna yang mematikan animasi di perangkatnya

  // scrollYProgress: 0 = section masih di atas layar, 1 = section sudah terscroll keluar
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Gunung: turun pelan + zoom sedikit => terasa jauh (lebih lambat dari scroll)
  const mountainY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mountainScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Tulisan: naik sedikit lebih cepat dari scroll => terasa dekat
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col bg-backgroundIvory min-h-[640px] md:min-h-screen overflow-hidden mt-10"
    >
      <div className="top-0 z-30 absolute inset-x-0"></div>

      <motion.img
        src={ImageHero}
        alt=""
        style={
          reduceMotion ? undefined : { y: mountainY, scale: mountainScale }
        }
        className="z-20 absolute inset-0 rounded-b-2xl w-full h-full object-cover object-[70%_bottom] md:object-cover md:object-center origin-bottom will-change-transform"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: textY }}
        className="relative flex flex-col flex-[0.5] justify-start md:justify-center px-4 sm:px-6 md:px-20 pt-28 md:pt-5 pb-0 md:pb-40"
      >
        <h1 className="font-switzer font-semibold text-textMoss text-2xl sm:text-4xl">
          TripTrip!!, Let's
        </h1>

        <div className="z-10 relative md:-mt-14 xl:-mt-10">
          <h2 className="absolute -top-2 left-2 md:-top-5 md:left-4 font-bold font-switzer [paint-order:stroke_fill] [-webkit-text-stroke:1.4px_var(--color-textMoss)] md:[-webkit-text-stroke:2px_var(--color-textMoss)] text-[color-mix(in_srgb,var(--color-secondarySage)_40%,var(--color-backgroundIvory))] text-[13vw] md:text-[14vw] min-[1440px]:text-[208px] whitespace-nowrap tracking-wide">
            ADVENTURE.
          </h2>

          <h2 className="relative font-switzer font-bold text-[13vw] md:text-[14vw] min-[1440px]:text-[208px] text-textMoss tracking-wide">
            ADVENTURE.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;