import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ImageHero from "../assets/images/MainPeak.png";
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
      className="relative min-h-screen flex flex-col overflow-hidden bg-backgroundIvory max-md:min-h-[640px]"
    >
      <div className="absolute inset-x-0 top-0 z-30">
        <Navbar />
      </div>

      <motion.img
        src={ImageHero}
        alt=""
        style={reduceMotion ? undefined : { y: mountainY, scale: mountainScale }}
        className="absolute inset-0 h-full w-full object-contain z-20 rounded-b-2xl origin-bottom will-change-transform max-md:object-cover max-md:object-[70%_bottom]"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: textY }}
        className="relative flex flex-[0.5] flex-col justify-center px-20 pt-5 pb-40 max-md:justify-start max-md:px-6 max-md:pt-28 max-md:pb-0 max-sm:px-4"
      >
        <h1 className="font-switzer font-semibold text-textMoss text-4xl max-sm:text-2xl">
          TripTrip!!, Let's
        </h1>

        <div className="relative -mt-14 z-10 max-md:-mt-4">
          <h2 className="absolute -top-5 left-4 text-[208px] whitespace-nowrap text-secondarySage/40 font-bold [-webkit-text-stroke:1.5px_var(--color-textMoss)] max-md:text-[13vw] max-md:-top-2 max-md:left-2 max-md:[-webkit-text-stroke:1px_var(--color-textMoss)]">
            ADVENTURE <span className="font-switzer">.</span>
          </h2>
          <h2 className="relative text-[208px] text-textMoss font-bold font-switzer tracking-wide max-md:text-[13vw]">
            ADVENTURE.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
