import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { destinations } from "../data/destinations";
import DestinationCard from "../components/destinations/DestinationCard";
import DestinationModal from "../components/destinations/DestinationModal";
import Reveal from "../components/shared/Reveal";

const PIN_TOP = 48;
const HEADER_ZONE = 64;
const FADE_DISTANCE = 110;

const AREA_HEIGHT = "lg:h-[clamp(30rem,calc(100svh-14rem),42.5rem)]";

function Destinations() {
  const [{ featured, others }] = useState(() => {
    if (!destinations.length) {
      return {
        featured: null,
        others: [],
      };
    }

    const index = Math.floor(Math.random() * destinations.length);

    return {
      featured: destinations[index],
      others: destinations.filter((_, i) => i !== index),
    };
  });

  const [selected, setSelected] = useState(null);
  const [travel, setTravel] = useState(0);

  const y = useMotionValue(0);
  const headingGap = useMotionValue(FADE_DISTANCE);

  const headingOpacity = useTransform(headingGap, [0, FADE_DISTANCE], [0, 1]);

  const headingShift = useTransform(headingGap, [0, FADE_DISTANCE], [-14, 0]);

  const headingBlur = useTransform(
    headingGap,
    [0, FADE_DISTANCE],
    ["blur(6px)", "blur(0px)"],
  );

  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const windowRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let active = true;
    let frameId = null;

    const update = () => {
      if (!active) return;

      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      const viewport = windowRef.current;

      // Elemen mungkin sudah dilepas ketika callback berjalan.
      if (!wrapper || !sticky || !track || !viewport) {
        return;
      }

      const stickyRect = sticky.getBoundingClientRect();

      headingGap.set(
        Math.min(Math.max(stickyRect.top - HEADER_ZONE, 0), FADE_DISTANCE),
      );

      if (!desktop.matches) {
        setTravel((previous) => (previous === 0 ? previous : 0));

        y.set(0);
        return;
      }

      const distance = Math.max(0, track.offsetHeight - viewport.offsetHeight);

      const scrolled = PIN_TOP - wrapper.getBoundingClientRect().top;

      setTravel((previous) => (previous === distance ? previous : distance));

      y.set(-Math.min(Math.max(scrolled, 0), distance));
    };

    // Satukan beberapa pemanggilan update dalam satu frame.
    const scheduleUpdate = () => {
      if (!active || frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        update();
      });
    };

    update();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleUpdate)
        : null;

    // Ref mungkin belum terpasang saat effect berjalan.
    if (observer && trackRef.current) {
      observer.observe(trackRef.current);
    }

    if (observer && windowRef.current) {
      observer.observe(windowRef.current);
    }

    desktop.addEventListener("change", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate, {
      passive: true,
    });

    return () => {
      active = false;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      observer?.disconnect();

      desktop.removeEventListener("change", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [y, headingGap]);

  const select = (item, layoutKey) => {
    setSelected({ item, layoutKey });
  };

  return (
    <section
      id="destinations"
      className="bg-backgroundIvory px-5 sm:px-10 lg:px-20 pt-20 sm:pt-28 lg:pt-44 pb-20 lg:pb-32">
      <div ref={wrapperRef}>
        <div ref={stickyRef} style={{ top: PIN_TOP }} className="lg:sticky">
          <Reveal>
            <motion.div
              style={{
                opacity: headingOpacity,
                y: headingShift,
                filter: headingBlur,
              }}
              className="pb-8 sm:pb-10">
              <h1 className="font-switzer font-bold text-blackdark text-3xl sm:text-4xl lg:text-5xl">
                Find Your Next Somewhere
              </h1>

              <p className="mt-2 max-w-2xl font-satoshi font-medium text-blackdark text-lg sm:text-xl">
                Discover destinations tailored to your travel style, with trip
                types and duration estimates.
              </p>
            </motion.div>
          </Reveal>

          <div className={`grid gap-4 sm:gap-6 lg:grid-cols-4 ${AREA_HEIGHT}`}>
            <Reveal from={{ x: -40 }} className="lg:h-full">
              {featured && (
                <DestinationCard
                  item={featured}
                  layoutKey="featured"
                  featured
                  onSelect={select}
                />
              )}
            </Reveal>

            <div
              ref={windowRef}
              className="lg:col-span-3 lg:h-full lg:overflow-hidden">
              <motion.div
                ref={trackRef}
                style={{ y }}
                className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((item, index) => (
                  <Reveal key={item.id} delay={(index % 3) * 0.1}>
                    <DestinationCard
                      item={item}
                      layoutKey={item.id}
                      onSelect={select}
                    />
                  </Reveal>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

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
