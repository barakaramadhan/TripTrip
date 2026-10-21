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
      className="relative flex flex-col bg-backgroundIvory min-h-screen max-md:min-h-[640px] overflow-hidden">
      <div className="top-0 z-30 absolute inset-x-0"></div>

      <motion.img
        src={ImageHero}
        alt=""
        style={
          reduceMotion ? undefined : { y: mountainY, scale: mountainScale }
        }
        className="z-20 absolute inset-0 rounded-b-2xl w-full h-full object-contain max-md:object-[70%_bottom] max-md:object-cover origin-bottom will-change-transform"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: textY }}
        className="relative flex flex-col flex-[0.5] justify-center max-md:justify-start px-20 max-sm:px-4 max-md:px-6 pt-5 max-md:pt-28 pb-40 max-md:pb-0">
        <h1 className="font-switzer font-semibold text-textMoss max-sm:text-2xl text-4xl">
          TripTrip!!, Let's
        </h1>

        <div className="z-10 relative -mt-14 max-md:-mt-4">
          <h2 className="-top-5 max-md:-top-2 left-4 max-md:left-2 absolute font-bold [-webkit-text-stroke:1.5px_var(--color-textMoss)] text-[208px] text-secondarySage/40 max-md:[-webkit-text-stroke:1px_var(--color-textMoss)] max-md:text-[13vw] whitespace-nowrap">
            ADVENTURE <span className="font-switzer">.</span>
          </h2>
          <h2 className="relative font-switzer font-bold text-[208px] text-textMoss max-md:text-[13vw] tracking-wide">
            ADVENTURE.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
