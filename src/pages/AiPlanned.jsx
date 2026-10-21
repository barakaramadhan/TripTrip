import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/ui/Button";
import LeafCorner from "../components/shared/LeafCorner";
import Reveal from "../components/shared/Reveal";
import ImageMaps from "../assets/images/Maps.webp";
import { EASE_OUT, SPRING } from "../animations/variants";
import { useSession } from "../hooks/useSession";

const STEPS = [
  { title: "Set your preferences", desc: "Destination, dates, budget, and travel style" },
  { title: "AI builds your itinerary", desc: "Destinations, timing, and transportation" },
  { title: "Edit and save", desc: "Review activities, rearrange, and share" },
];

const ITINERARY = {
  "Day 1": [
    { time: "08:00", title: "Morning activity", note: "10-min walk" },
    { time: "12:30", title: "Local lunch", note: "20-min drive" },
    { time: "17:30", title: "Sunset spot", note: "30-min bus ride" },
  ],
  "Day 2": [
    { time: "09:00", title: "Temple visit", note: "15-min walk" },
    { time: "13:00", title: "Street food tour", note: "10-min taxi" },
    { time: "16:30", title: "Old market", note: "25-min bus ride" },
  ],
  "Day 3": [
    { time: "07:30", title: "Sunrise hike", note: "40-min drive" },
    { time: "12:00", title: "Beachside lunch", note: "20-min walk" },
    { time: "18:00", title: "Farewell dinner", note: "15-min drive" },
  ],
};
const DAYS = Object.keys(ITINERARY);

function AiPlanned() {
  const { user } = useSession(); // sudah login -> tombol mengarah ke dashboard
  const [day, setDay] = useState(DAYS[0]);

  return (
    <section id="how" className="scroll-mt-16 overflow-hidden bg-secondarySage">
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-20 lg:py-24">
        <div>
          <Reveal>
            <h1 className="font-switzer text-3xl font-bold text-whitebright sm:text-4xl lg:text-5xl">
              Your Trip, AI Planned
            </h1>
            <p className="mt-3 max-w-[32rem] font-satoshi text-lg font-medium text-whitebright sm:text-xl">
              Share a few preferences and let AI turn them into a day-by-day plan you can tweak.
            </p>
          </Reveal>

          <ol className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-7">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 0.12} from={{ x: -32 }} className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-whitebright font-satoshi text-lg font-medium">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-satoshi text-lg font-medium text-whitebright">{step.title}</h2>
                  <p className="font-satoshi text-base text-textDesc">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.4} className="mt-8 sm:mt-10">
            <Button to={user ? "/dashboard" : "/signup"} className="px-7 py-3">
              Try It Now!
            </Button>
          </Reveal>
        </div>

        <Reveal from={{ y: 50, scale: 0.96 }} delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl bg-whitebright p-5 shadow-xl sm:p-6">
            <LeafCorner corner="br" />
            <LeafCorner corner="bl" className="hidden sm:block" />

            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-satoshi text-xl font-bold text-blackdark sm:text-2xl">Preview itinerary</h2>

              {/* Tab hari: pil gelap meluncur ke tab yang dipilih */}
              <div role="tablist" className="flex gap-1 rounded-full border-2 border-textMoss/15 p-1">
                {DAYS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={day === label}
                    onClick={() => setDay(label)}
                    className={`relative cursor-pointer rounded-full px-4 py-2 font-satoshi text-sm font-medium transition-colors sm:px-5 sm:text-base ${
                      day === label ? "text-whitebright" : "text-textMoss hover:text-textMoss/70"
                    }`}
                  >
                    {day === label && (
                      <motion.span
                        layoutId="day-pill"
                        transition={SPRING}
                        className="absolute inset-0 rounded-full bg-textMoss"
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={day}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="relative mt-2"
              >
                {ITINERARY[day].map((item) => (
                  <motion.li
                    key={item.title}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT } },
                    }}
                    className="flex items-center gap-4 pt-5 sm:gap-8"
                  >
                    <p className="w-12 shrink-0 font-satoshi text-base font-medium text-textLabel sm:text-lg">
                      {item.time}
                    </p>
                    <div className="w-full rounded-xl bg-backgroundIvory p-3 transition-transform duration-300 hover:translate-x-1">
                      <h3 className="font-satoshi text-base text-blackdark sm:text-lg">{item.title}</h3>
                      <p className="font-satoshi text-sm text-textLabel sm:text-base">{item.note}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <div className="relative pt-6 sm:pt-8">
              <img src={ImageMaps} alt="Route map preview" loading="lazy" className="w-full rounded-xl" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AiPlanned;
