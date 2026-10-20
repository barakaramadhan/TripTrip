import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { destinations } from "../data/destinations";
import DestinationCard from "../components/destinations/DestinationCard";
import DestinationModal from "../components/destinations/DestinationModal";

const PIN_TOP = 48; // jarak konten dari atas layar saat menempel (px)
const SWITCH_EVERY = 5000; // card besar ganti setiap 5 detik (ms)

// Muncul halus saat masuk layar
function Reveal({ children, delay = 0, from = { y: 40 } }) {
  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Destinations() {
  const [selected, setSelected] = useState(null); // { item, layoutKey }
  const [travel, setTravel] = useState(0); // jarak card kecil bergeser (px)
  const [featured, setFeatured] = useState(destinations[0]); // card besar (awalnya Bali)
  const y = useMotionValue(0);

  const wrapperRef = useRef(null);
  const windowRef = useRef(null);
  const trackRef = useRef(null);

  // Saat section menempel, geser card kecil mengikuti scroll
  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, trackRef.current.offsetHeight - windowRef.current.offsetHeight);
      const scrolled = PIN_TOP - wrapperRef.current.getBoundingClientRect().top;

      setTravel(distance);
      y.set(-Math.min(Math.max(scrolled, 0), distance));
    };

    const observer = new ResizeObserver(update);
    observer.observe(trackRef.current);
    observer.observe(windowRef.current);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [y]);

  // Card besar berganti ke destinasi acak (tidak pernah sama dengan yang sedang tampil)
  useEffect(() => {
    if (selected) return; // berhenti berganti saat modal terbuka

    const timer = setInterval(() => {
      setFeatured((current) => {
        const others = destinations.filter((d) => d.id !== current.id);
        return others[Math.floor(Math.random() * others.length)];
      });
    }, SWITCH_EVERY);

    return () => clearInterval(timer);
  }, [selected]);

  const select = (item, layoutKey) => setSelected({ item, layoutKey });

  return (
    <section id="destinations" className="bg-backgroundIvory px-20 pt-44 pb-44 max-md:px-10 max-md:pt-28 max-md:pb-28 max-sm:px-5">
      <div ref={wrapperRef}>
        {/* Bagian yang menempel: judul + card besar diam, card kecil bergeser */}
        <div style={{ top: PIN_TOP }} className="sticky max-md:static">
          <Reveal>
            <div className="pb-10">
              <h1 className="font-switzer font-bold text-5xl text-blackdark max-sm:text-3xl">
                Find Your Next Somewhere
              </h1>
              <p className="font-satoshi font-medium text-blackdark text-xl w-2xl max-md:w-full">
                Discover destinations tailored to your travel style, with trip types
                and duration estimates.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-4 gap-6 max-md:grid-cols-1">
            <Reveal from={{ x: -40 }}>
              <DestinationCard item={featured} layoutKey="featured" featured onSelect={select} />
            </Reveal>

            {/* Jendela: card baris bawah tersembunyi sampai digeser naik */}
            <div
              ref={windowRef}
              className="col-span-3 h-[680px] overflow-hidden max-md:col-span-1 max-md:h-auto max-md:overflow-visible"
            >
              <motion.div
                ref={trackRef}
                style={{ y }}
                className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1"
              >
                {destinations.map((item, index) => (
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