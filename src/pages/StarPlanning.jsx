import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LeafCorner from "../components/shared/LeafCorner";
import Reveal from "../components/shared/Reveal";
import { useSession } from "../hooks/useSession";

function StarPlanning() {
  const { user } = useSession(); // sudah login -> langsung ke halaman Plan di dashboard

  return (
    <section
      id="planner"
      className="relative z-40 -mt-12 scroll-mt-24 px-5 sm:-mt-20 sm:px-10 lg:-mt-28 lg:px-20"
    >
      <Reveal from={{ y: 60, scale: 0.97 }}>
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-whitebright px-5 py-6 shadow-xl sm:gap-8 sm:px-16 sm:py-12 lg:flex-row lg:items-center lg:gap-10">
          <LeafCorner corner="tl" className="opacity-80" />
          <LeafCorner corner="br" className="opacity-80" />

          {/* Kiri: judul + deskripsi */}
          <div className="relative lg:w-5/12">
            <h1 className="max-w-[480px] text-4xl font-switzer font-bold leading-none text-blackdark sm:text-7xl">Start Planing a Trip Now</h1>
            <p className="max-w-[380px] font-satoshi text-base text-blackdark font-normal sm:text-xl sm:pt-8">
             Plan your next adventure with AI powered itineraries, discover amazing destinations, and make every journey unforgettable.
            </p>
          </div>

          {/* Kanan: form */}
          <div className="relative lg:w-7/12">
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <Input id="destination" label="Destination" placeholder="Where to?" containerClassName="sm:col-span-2" />
              <Input id="budget" label="Budget" inputMode="numeric" placeholder="IDR XXXXX" />
              <Input id="travelers" label="Travellers" type="number" min="1" placeholder="2 people" />
              <Input id="departure" label="Departure" type="date" />
              <Input id="return" label="Return" type="date" />
            </div>

            <div className="flex sm:justify-end">
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