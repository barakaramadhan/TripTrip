import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import Reveal from "../components/shared/Reveal";
import ImageTravel1 from "../assets/images/SmartRoute.webp";
import ImageTravel2 from "../assets/images/BudgetEstimation.webp";
import ImageTravel3 from "../assets/images/Daily.webp";

const FEATURES = [
  {
    image: ImageTravel1,
    title: "Smart Route",
    tagline: "Optimized routes between stops.",
    bullets: ["Optimized visit order", "Estimated travel time", "Transportation options"],
    footer: "Less time in transit, more time exploring.",
  },
  {
    image: ImageTravel2,
    title: "Budget Estimation",
    tagline: "Know what your trip might cost.",
    bullets: ["Estimate your travel expenses", "Include stays and activities", "Adjust plans to your budget"],
    footer: "A clearer picture of your travel costs.",
  },
  {
    image: ImageTravel3,
    title: "Daily Itinerary",
    tagline: "Turn your ideas into a daily plan.",
    bullets: ["Arrange activities by day", "Set times for each activity", "Edit and save your itinerary"],
    footer: "Your whole adventure, in one plan.",
  },
];

function TravelSmart() {
  return (
    <section id="features" className="scroll-mt-16 bg-backgroundIvory px-5 pt-20 pb-24 sm:px-10 sm:pt-28 sm:pb-32 lg:px-20 lg:pt-44 lg:pb-48">
      <Reveal>
        <h1 className="font-switzer text-3xl font-bold text-black sm:text-4xl lg:text-5xl">Travel Smarter</h1>
        <p className="mt-2 max-w-[32rem] font-satoshi text-lg text-blackdark sm:text-xl">
          Three features for a more time- and cost-efficient journey.
        </p>
      </Reveal>

      <div className="grid gap-4 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.12} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
              <Card className="group flex h-full flex-col bg-whitebright px-4 py-5 shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={feature.image}
                    alt=""
                    loading="lazy"
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5">
                  <p className="font-satoshi text-lg font-bold text-textLabel">0{i + 1}</p>
                  <h2 className="font-satoshi text-2xl font-bold text-blackdark sm:text-3xl">{feature.title}</h2>
                  <p className="font-satoshi text-base font-medium text-textLabel">{feature.tagline}</p>

                  <ul className="pt-6 pb-5">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 font-satoshi text-base font-medium text-textMoss sm:text-lg">
                        <span className="size-2.5 shrink-0 rounded-full bg-textMoss" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto w-full border-t-2 border-dashed border-blackdark/70" />
                  <p className="pt-5 font-satoshi text-base font-medium text-textMoss sm:text-lg">{feature.footer}</p>
                </div>
              </Card>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default TravelSmart;
