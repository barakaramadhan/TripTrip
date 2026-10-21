import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LeafCorner from "../components/shared/LeafCorner";
import Reveal from "../components/shared/Reveal";
import { useSession } from "../hooks/useSession";

const STYLES = ["Relaxation", "Adventure", "Culture", "Food & Dining"];

function StarPlanning() {
  const [selected, setSelected] = useState(["Relaxation"]);
  const { user } = useSession(); // sudah login -> langsung ke halaman Plan di dashboard

  const toggle = (style) =>
    setSelected((current) =>
      current.includes(style) ? current.filter((item) => item !== style) : [...current, style],
    );

  return (
    <section
      id="planner"
      className="relative z-40 -mt-12 scroll-mt-24 px-5 sm:-mt-20 sm:px-10 lg:-mt-28 lg:px-20"
    >
      <Reveal from={{ y: 60, scale: 0.97 }}>
        <div className="relative overflow-hidden rounded-2xl bg-whitebright px-5 py-6 shadow-xl sm:px-6 sm:py-7">
          <LeafCorner corner="tl" className="opacity-80" />
          <LeafCorner corner="br" className="opacity-80" />

          <div className="relative mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-blackdark sm:text-3xl">Start Planning</h1>
            <p className="font-satoshi text-base text-black sm:text-lg">
              Tell us where you&apos;re headed and how you like to travel. We&apos;ll build the rest.
            </p>
          </div>

          <div className="relative">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <Input id="destination" label="Destination" placeholder="Where to?" />
              <Input id="budget" label="Budget" inputMode="numeric" placeholder="IDR XXXXX" />
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input id="travelers" label="Travellers" type="number" min="1" placeholder="2 people" containerClassName="sm:col-span-2 lg:col-span-1" />
              <Input id="departure" label="Departure" type="date" />
              <Input id="return" label="Return" type="date" />
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="mb-3 font-satoshi text-lg font-bold text-blackdark">Travel Style</h2>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((style) => {
                    const active = selected.includes(style);
                    return (
                      <Button
                        key={style}
                        variant="accent"
                        aria-pressed={active}
                        onClick={() => toggle(style)}
                        className={`text-base font-medium sm:text-lg ${
                          active
                            ? "border-textMoss bg-textMoss text-whitebright hover:bg-textMoss"
                            : "text-textMoss"
                        }`}
                      >
                        {style}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Button to={user ? "/dashboard/plan" : "/signup"} className="z-10 w-full py-3 text-lg font-bold sm:w-auto sm:px-8">
                Generate My Trip
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default StarPlanning;
