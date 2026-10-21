import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Button from "../components/ui/Button";
import ImageReady from "../assets/images/ReadyForAn.webp";

export default function ReadyForAdventure() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion(); // hormati pengguna yang mematikan animasi

  // scrollYProgress: 0 = section baru muncul dari bawah layar, 1 = section sudah pas di layar.
  // Di angka 1 semua posisi kembali normal (sama seperti desain awal).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Kota: bergerak lebih lambat dari scroll + zoom out pelan => terasa jauh
  const cityY = useTransform(scrollYProgress, [0, 1], ["-14%", "0%"]);
  const cityScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  // Tulisan: mulai agak turun (tersembunyi di belakang gedung), lalu naik muncul
  const textY = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

  // Tulisan outline di belakang: bergerak sedikit beda supaya ada kesan berlapis
  const outlineY = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex flex-col bg-backgroundIvory min-h-screen max-md:min-h-[560px] overflow-hidden">
        <motion.img
          src={ImageReady}
          alt=""
          style={reduceMotion ? undefined : { y: cityY, scale: cityScale }}
          className="z-20 absolute inset-0 -mt-28 max-md:mt-0 w-full max-md:h-full object-contain max-md:object-bottom origin-bottom will-change-transform"
        />

        <motion.div
          style={reduceMotion ? undefined : { y: textY }}
          className="z-10 flex flex-col items-center px-14 max-md:px-4 max-md:pt-16">
          <h1 className="font-switzer font-semibold text-textMoss max-sm:text-3xl text-5xl">
            Ready for an
          </h1>

          <div className="relative -mt-10 max-md:-mt-3">
            <motion.h2
              style={reduceMotion ? undefined : { y: outlineY }}
              className="-top-4 max-md:-top-2 left-2 max-md:left-1 absolute font-bold [-webkit-text-stroke:1.5px_var(--color-textMoss)] text-[200px] text-secondarySage/40 max-md:[-webkit-text-stroke:1px_var(--color-textMoss)] max-md:text-[13vw] whitespace-nowrap">
              ADVENTURE <span className="font-switzer">?</span>
            </motion.h2>

            <h2 className="relative font-switzer font-bold text-[200px] text-textMoss max-md:text-[13vw]">
              ADVENTURE ?
            </h2>
          </div>
        </motion.div>

        <Button className="z-30 self-center p-3 w-40">Start Planning</Button>
      </section>
    </>
  );
}
