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
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const cityY = useTransform(scrollYProgress, [0, 1], ["-14%", "0%"]);
  const cityScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  const textY = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

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
          className="z-20 absolute inset-0 -mt-28 max-md:mt-0 w-full h-[calc(100%+7rem)] max-md:h-full object-contain object-bottom max-md:object-bottom origin-bottom will-change-transform"
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
              className="-top-4 max-md:-top-2 left-2 max-md:left-1 absolute font-bold [paint-order:stroke_fill] [-webkit-text-stroke:3px_var(--color-textMoss)] text-[200px] text-[color-mix(in_srgb,var(--color-secondarySage)_40%,var(--color-backgroundIvory))] max-md:[-webkit-text-stroke:2px_var(--color-textMoss)] max-md:text-[13vw] whitespace-nowrap">
              ADVENTURE <span className="font-switzer">?</span>
            </motion.h2>

            <h2 className="relative font-switzer font-bold text-[200px] text-textMoss max-md:text-[13vw]">
              ADVENTURE ?
            </h2>
          </div>
        </motion.div>

        <Button className="z-30 self-center mt-40 p-3 w-40">Start Planning</Button>
      </section>
    </>
  );
}