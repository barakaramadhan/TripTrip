import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { destinations } from "../data/destinations";
import DestinationCard from "../components/destinations/DestinationCard";
import DestinationModal from "../components/destinations/DestinationModal";
import Reveal from "../components/shared/Reveal";

const PIN_TOP = 48; // jarak konten dari atas layar saat menempel (px)

// Judul memudar saat mendekati header kaca (tinggi header ~64px), hilang sementara selama menempel
const HEADER_ZONE = 64;
const FADE_DISTANCE = 110;

// Tinggi area card di desktop: menyesuaikan tinggi layar supaya tidak terpotong
const AREA_HEIGHT = "lg:h-[clamp(30rem,calc(100svh-14rem),42.5rem)]";

function Destinations() {
  // Card besar dipilih acak sekali tiap halaman dimuat / di-refresh.
  // Card besar tidak diulang di grid kecil.
  const [{ featured, others }] = useState(() => {
    const i = Math.floor(Math.random() * destinations.length);
    return {
      featured: destinations[i],
      others: destinations.filter((_, idx) => idx !== i),
    };
  });
  const [selected, setSelected] = useState(null); // { item, layoutKey }
  const [travel, setTravel] = useState(0); // jarak card kecil bergeser (px)
  const y = useMotionValue(0);
  const headingGap = useMotionValue(FADE_DISTANCE); // jarak judul ke bawah header (px)
  const headingOpacity = useTransform(headingGap, [0, FADE_DISTANCE], [0, 1]);
  const headingShift = useTransform(headingGap, [0, FADE_DISTANCE], [-14, 0]);
  const headingBlur = useTransform(headingGap, [0, FADE_DISTANCE], ["blur(6px)", "blur(0px)"]);

  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const windowRef = useRef(null);
  const trackRef = useRef(null);

  // Di desktop: saat section menempel, card kecil bergeser mengikuti scroll.
  // Di layar kecil: grid biasa, tanpa efek menempel.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      // Judul: makin dekat ke header kaca makin pudar
      const gap = stickyRef.current.getBoundingClientRect().top - HEADER_ZONE;
      headingGap.set(Math.min(Math.max(gap, 0), FADE_DISTANCE));

      if (!desktop.matches) {
        setTravel(0);
        y.set(0);
        return;
      }
      const distance = Math.max(0, trackRef.current.offsetHeight - windowRef.current.offsetHeight);
      const scrolled = PIN_TOP - wrapperRef.current.getBoundingClientRect().top;

      setTravel((prev) => (prev === distance ? prev : distance));
      y.set(-Math.min(Math.max(scrolled, 0), distance));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(trackRef.current);
    observer.observe(windowRef.current);
    desktop.addEventListener("change", update);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", update);
      window.removeEventListener("scroll", update);
    };
  }, [y, headingGap]);

  const select = (item, layoutKey) => setSelected({ item, layoutKey });

  return (
    <section
      id="destinations"
      className="bg-backgroundIvory px-5 pt-20 pb-20 sm:px-10 sm:pt-28 lg:px-20 lg:pt-44 lg:pb-32"
    >
      <div ref={wrapperRef}>
        {/* Bagian yang menempel (desktop): judul + card besar diam, card kecil bergeser */}
        <div ref={stickyRef} style={{ top: PIN_TOP }} className="lg:sticky">
          <Reveal>
            <motion.div
              style={{ opacity: headingOpacity, y: headingShift, filter: headingBlur }}
              className="pb-8 sm:pb-10">
              <h1 className="font-switzer text-3xl font-bold text-blackdark sm:text-4xl lg:text-5xl">
                Find Your Next Somewhere
              </h1>
              <p className="mt-2 max-w-2xl font-satoshi text-lg font-medium text-blackdark sm:text-xl">
                Discover destinations tailored to your travel style, with trip types
                and duration estimates.
              </p>
            </motion.div>
          </Reveal>

          <div className={`grid gap-4 sm:gap-6 lg:grid-cols-4 ${AREA_HEIGHT}`}>
            <Reveal from={{ x: -40 }} className="lg:h-full">
              <DestinationCard item={featured} layoutKey="featured" featured onSelect={select} />
            </Reveal>

            {/* Jendela: card baris bawah tersembunyi sampai digeser naik (desktop) */}
            <div ref={windowRef} className="lg:col-span-3 lg:h-full lg:overflow-hidden">
              <motion.div
                ref={trackRef}
                style={{ y }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
              >
                {others.map((item, index) => (
                  <Reveal key={item.id} delay={(index % 3) * 0.1}>
                    <DestinationCard item={item} layoutKey={item.id} onSelect={select} />
                  </Reveal>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Ruang scroll tambahan selama card kecil bergeser */}
        <div style={{ height: travel }} />
      </div>

      <AnimatePresence>
        {selected && (
          <DestinationModal
            key={selected.layoutKey}
            item={selected.item}
            layoutKey={selected.layoutKey}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Destinations;
