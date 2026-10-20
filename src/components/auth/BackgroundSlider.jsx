import { AnimatePresence, motion } from "framer-motion";
import { BACKGROUNDS, SLIDE_DURATION_MS } from "../../constants/backgrounds";

export default function BackgroundSlider({ index }) {
  const background = BACKGROUNDS[index];

  return (
    <div className="absolute inset-0 bg-textMoss overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={background.id}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background.image}), ${background.fallback}`,
          }}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2 },
            scale: { duration: SLIDE_DURATION_MS / 1000 + 1.2, ease: "linear" },
          }}
        />
      </AnimatePresence>

      {/* Lapisan gelap tipis supaya foto terang tidak terlalu mencolok */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
