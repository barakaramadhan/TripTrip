import { useEffect, useState } from "react";
import BackgroundSlider from "./BackgroundSlider";
import HeroCard from "./HeroCard";
import HeroDots from "./HeroDots";
import { BACKGROUNDS, SLIDE_DURATION_MS } from "../../constants/backgrounds";

const LAST_BACKGROUND_KEY = "triptrip:last-background";

function pickStartIndex() {
  const last = localStorage.getItem(LAST_BACKGROUND_KEY);
  const options = BACKGROUNDS.map((_, i) => i).filter(
    (i) => String(i) !== last,
  );
  return options[Math.floor(Math.random() * options.length)];
}

export default function HeroPanel({ lines }) {
  const [index, setIndex] = useState(pickStartIndex);

  useEffect(() => {
    localStorage.setItem(LAST_BACKGROUND_KEY, String(index));

    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % BACKGROUNDS.length);
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className="hidden lg:block relative lg:w-1/2">
      <BackgroundSlider index={index} />
      <HeroCard lines={lines} />
      <HeroDots items={BACKGROUNDS} activeIndex={index} onSelect={setIndex} />
    </section>
  );
}
