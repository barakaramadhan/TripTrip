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
        className="relative flex flex-col bg-backgroundIvory min-h-[560px] md:min-h-screen overflow-hidden">
        <motion.img
          src={ImageReady}
          alt=""
          style={reduceMotion ? undefined : { y: cityY, scale: cityScale }}
          className="z-20 absolute inset-0 mt-0 md:-mt-28 w-full h-full md:h-[calc(100%+7rem)] object-contain object-bottom origin-bottom will-change-transform"
        />

        <motion.div
          style={reduceMotion ? undefined : { y: textY }}
          className="z-10 flex flex-col items-center px-4 md:px-14 pt-16 md:pt-0">
          <h1 className="font-switzer font-semibold text-textMoss text-3xl sm:text-5xl">
            Ready for an
          </h1>

          <div className="relative -mt-3 md:-mt-10">
            <motion.h2
              style={reduceMotion ? undefined : { y: outlineY }}
              className="-top-2 md:-top-4 left-1 md:left-2 absolute font-bold [paint-order:stroke_fill] [-webkit-text-stroke:2px_var(--color-textMoss)] md:[-webkit-text-stroke:3px_var(--color-textMoss)] text-[color-mix(in_srgb,var(--color-secondarySage)_40%,var(--color-backgroundIvory))] text-[13vw] md:text-[11vw] lg:text-[14vw] xl:text-[13vw] min-[1600px]:text-[200px] whitespace-nowrap">
              ADVENTURE <span className="font-switzer">?</span>
            </motion.h2>

            <h2 className="relative font-switzer font-bold text-[13vw] md:text-[11vw] lg:text-[14vw] xl:text-[13vw] min-[1600px]:text-[200px] text-textMoss">
              ADVENTURE ?
            </h2>
          </div>
        </motion.div>

        <Button className="z-30 self-center mt-40 md:mt-16 p-3 w-40">Start Planning</Button>
      </section>
    </>
  );
}