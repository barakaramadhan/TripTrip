import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Button from "../components/ui/Button";
import ImageReady from "../assets/images/ReadyForAn.png";

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
        className="relative bg-backgroundIvory min-h-screen flex flex-col overflow-hidden max-md:min-h-[560px]"
      >
        <motion.img
          src={ImageReady}
          alt=""
          style={reduceMotion ? undefined : { y: cityY, scale: cityScale }}
          className="absolute inset-0 w-full object-contain z-20 -mt-28 origin-bottom will-change-transform max-md:mt-0 max-md:h-full max-md:object-bottom"
        />

        <motion.div
          style={reduceMotion ? undefined : { y: textY }}
          className="flex flex-col px-14 items-center z-10 max-md:px-4 max-md:pt-16"
        >
          <h1 className="font-switzer font-semibold text-5xl text-textMoss max-sm:text-3xl">
            Ready for an
          </h1>

          <div className="relative -mt-10 max-md:-mt-3">
            <motion.h2
              style={reduceMotion ? undefined : { y: outlineY }}
              className="absolute -top-4 left-2 text-[200px] whitespace-nowrap text-secondarySage/40 font-bold [-webkit-text-stroke:1.5px_var(--color-textMoss)] max-md:text-[13vw] max-md:-top-2 max-md:left-1 max-md:[-webkit-text-stroke:1px_var(--color-textMoss)]"
            >
              ADVENTURE <span className="font-switzer">?</span>
            </motion.h2>

            <h2 className="relative text-[200px] text-textMoss font-bold font-switzer max-md:text-[13vw]">
              ADVENTURE ?
            </h2>
          </div>
        </motion.div>

        <Button className="z-30 w-40 self-center p-3">Start Planning</Button>
      </section>
    </>
  );
}
