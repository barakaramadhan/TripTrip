import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../components/ui/Button";
import BigWord from "../components/shared/BigWord";
import Reveal from "../components/shared/Reveal";
import ImageReady from "../assets/images/ReadyForAn.webp";
import { EASE_OUT } from "../animations/variants";

export default function ReadyForAdventure() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const imageY = useTransform(scrollYProgress, [0, 1], [90, -70]);

  return (
    <section
      ref={sectionRef}
      className="isolate relative flex flex-col items-center bg-backgroundIvory min-h-[max(36rem,88svh)] sm:min-h-[max(40rem,100svh)] overflow-hidden">
      <motion.div
        style={{ y: contentY }}
        className="z-10 relative flex flex-col items-center px-5 sm:px-10 pt-16 sm:pt-20 lg:pt-24 text-center">
        <Reveal
          as="h1"
          from={{ y: 24 }}
          className="font-switzer font-semibold text-[clamp(1.6rem,4.2vw,3rem)] text-textMoss">
          Ready for an
        </Reveal>

        <div className="relative mt-[-0.05em] text-[clamp(2.2rem,12.4vw,12.5rem)]">
          <ReadyWord />
        </div>

      </motion.div>

      <Reveal delay={0.3} className="z-30 relative mt-6 sm:mt-8">
        <Button to="/signup" className="px-8 py-3 text-lg">
          Start Planning
        </Button>
      </Reveal>

      <motion.img
        src={ImageReady}
        alt=""
        loading="lazy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        style={{ y: imageY }}
        className="bottom-0 z-20 absolute inset-x-0 w-full h-[40svh] sm:h-auto object-[35%_bottom] object-cover sm:object-contain pointer-events-none"
      />
    </section>
  );
}

// BigWord memainkan animasinya saat mount, jadi ditunda sampai section terlihat
function ReadyWord() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}>
      <BigWord text="ADVENTURE?" delay={0.05} />
    </motion.div>
  );
}
