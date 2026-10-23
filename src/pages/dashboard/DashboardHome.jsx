import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useOutletContext } from "react-router";
import ParallaxHero from "../../components/dashboard/ParallaxHero";
import CountUp from "../../components/dashboard/CountUp";
import TripDetailModal from "../../components/dashboard/TripDetailModal";
import Button from "../../components/ui/Button";
import { useTrips } from "../../hooks/useTrips";
import { useDestinations } from "../../hooks/useDestinations";
import { formatDateRange, formatRupiahShort, tripDays } from "../../utils/format";
import { fadeUp, staggerContainer } from "../../animations/variants";

const STATUS_STYLE = {
  draft: "bg-secondarySage/40 text-primaryForest",
  planned: "bg-accentSend/40 text-textMoss",
  completed: "bg-primaryForest text-white",
};

// Ornamen daun untuk card statistik (di belakang konten)
function LeafOrnament({ className = "" }) {
  return (
    <svg
      viewBox="0 0 122 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}>
      <g opacity="0.4">
        <path d="M125.885 95.1797C107.471 77.6661 100.24 44.0774 107.406 9.34176C128.23 38.0516 135.461 71.6403 125.885 95.1797Z" fill="#5C8A64" />
        <path d="M125.483 93.3137L109.013 16.806" strokeWidth="0.954396" stroke="#F4EFE0" strokeOpacity="0.45" />
        <path d="M125.885 95.1797C94.3888 85.2102 66.7982 50.0848 55.3761 5.41483C96.0694 27.0927 123.66 62.2181 125.885 95.1797Z" fill="#6F9A72" />
        <path d="M124.352 93.2283L61.5068 13.2205" strokeWidth="1.24072" stroke="#F4EFE0" strokeOpacity="0.45" />
        <path d="M125.886 95.1796C96.8456 98.4555 61.9104 79.9967 36.6073 48.0069C77.2928 50.884 112.228 69.3428 125.886 95.1796Z" fill="#86AB7F" />
        <path d="M123.945 94.1543L44.3701 52.1091" strokeWidth="1.09756" stroke="#F4EFE0" strokeOpacity="0.45" />
        <path d="M125.886 95.1798C103.975 108.053 69.6944 105.746 38.2797 89.283C71.6173 77.1786 105.898 79.4861 125.886 95.1798Z" fill="#4F7A5B" />
        <path d="M123.98 95.0518L45.8965 89.7959" strokeWidth="0.954396" stroke="#F4EFE0" strokeOpacity="0.45" />
        <path d="M125.886 95.1797C113.323 112.751 85.9058 122.811 55.8201 120.888C77.5225 99.9636 104.94 89.9036 125.886 95.1797Z" fill="#9BBD94" />
        <path d="M124.363 95.7385L61.9131 118.653" strokeWidth="0.811237" stroke="#F4EFE0" strokeOpacity="0.45" />
      </g>
    </svg>
  );
}

// Ornamen gunung untuk card "Start a New Trip with AI" (di belakang konten)
function MountainOrnament({ className = "" }) {
  return (
    <svg
      viewBox="0 0 361 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}>
      <path d="M-30.4824 150.666V83.8338L36.3501 32.2438L83.2501 61.5563L153.6 2.93126L223.95 66.2463L282.575 38.1063L364.65 77.9713L431.483 49.8313V150.666H-30.4824Z" fill="#CFDACB" strokeWidth="5.8625" strokeLinejoin="round" stroke="#CFDACB" />
      <path d="M153.6 2.93126L138.357 21.6913L147.737 19.3463L153.6 26.3813L161.807 18.1738L170.015 21.6913L153.6 2.93126Z" fill="#F4F0E6" strokeWidth="2.345" strokeLinejoin="round" stroke="#F4F0E6" />
      <path d="M-30.4824 150.666V102.594L53.9376 55.6938L118.425 90.8688L200.5 38.1063L270.85 96.7313L347.063 61.5563L431.483 102.594V150.666H-30.4824Z" fill="#A9BBA0" strokeWidth="5.8625" strokeLinejoin="round" stroke="#A9BBA0" />
      <path opacity="0.9" d="M200.5 38.1063L188.775 53.3488L196.983 51.0038L201.673 56.8663L208.708 49.8313L214.57 52.1763L200.5 38.1063Z" fill="#F4F0E6" strokeWidth="1.75875" strokeLinejoin="round" stroke="#F4F0E6" />
    </svg>
  );
}

function StatCard({ icon, label, children }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="relative flex items-center gap-4 bg-whitebright p-6 rounded-3xl overflow-hidden">
      <LeafOrnament className="top-0 right-0 z-0 absolute w-auto h-full pointer-events-none" />
      <span className="relative z-10 flex justify-center items-center bg-secondarySage/40 rounded-2xl size-14 text-primaryForest text-2xl">
        <i className={`${icon} flex`} />
      </span>
      <div className="relative z-10">
        <p className="font-satoshi font-medium text-lg">{label}</p>
        <p className="font-switzer font-bold text-4xl leading-tight">{children}</p>
      </div>
    </motion.div>
  );
}

export default function DashboardHome() {
  const { name } = useOutletContext();
  const navigate = useNavigate();
  const { trips, loading, error, remove, stats } = useTrips();
  const { destinations } = useDestinations();
  const [selected, setSelected] = useState(null);

  const hasTrips = trips.length > 0;
  const next = trips.find((t) => t.start_date && new Date(t.start_date) >= new Date()) ?? trips[0];

  const handleDelete = async (trip) => {
    if (!window.confirm(`Hapus trip ke ${trip.destination}?`)) return;
    await remove(trip.id);
    setSelected(null);
  };

  return (
    <div className="space-y-8">
      <header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-switzer font-bold text-4xl sm:text-5xl">
          Hello, {name}
        </motion.h1>
        <p className="font-satoshi text-lg">
          {hasTrips ? `You have ${trips.length} trip${trips.length > 1 ? "s" : ""} planned.` : "No trips yet. Let's start your first adventure."}
        </p>
      </header>

      <ParallaxHero
        badge={hasTrips ? "Next adventure" : "Welcome to TripTrip"}
        title={hasTrips ? `${next.destination} is calling.` : "Your First Trip Starts Here."}
        subtitle={
          hasTrips
            ? `${formatDateRange(next.start_date, next.end_date)} · ${next.travelers} travelers`
            : "Enter your destination, dates, and budget. AI will create your itinerary in seconds."
        }>
        <Button to="/dashboard/plan">
          <i className="fi fi-rr-sparkles mr-2" />
          Plan a trip
        </Button>
        <Button to="/dashboard/destinations" variant="accent" className="text-white">
          Explore Destinations
        </Button>
      </ParallaxHero>

      {error && <p className="bg-red-50 p-3 rounded-2xl text-red-700 text-sm">{error} — sudah menjalankan supabase/dashboard.sql?</p>}

      {/* Statistik (diambil dari tabel trips) */}
      <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="visible" className="gap-5 grid sm:grid-cols-3">
        <StatCard icon="fi fi-rr-briefcase" label="Total Trip">
          <CountUp value={stats.totalTrips} />
        </StatCard>
        <StatCard icon="fi fi-rr-globe" label="Countries Visited">
          <CountUp value={stats.countries} />
        </StatCard>
        <StatCard icon="fi fi-rr-wallet" label="Total Budget">
          <CountUp value={stats.totalBudget} format={formatRupiahShort} />
        </StatCard>
      </motion.div>

      <div className="gap-5 grid lg:grid-cols-[1.4fr_1fr]">
        <section className="bg-whitebright p-6 rounded-3xl min-h-72 font-satoshi">
          <div className="flex justify-between items-center pb-4 border-b border-textMoss/30">
            <h3 className="font-semibold text-xl">Incoming Trip</h3>
            <Link to="/dashboard/plan" className="hover:underline">See All</Link>
          </div>

          {loading ? (
            <div className="space-y-4 pt-5">
              {[0, 1].map((i) => <div key={i} className="bg-secondarySage/20 rounded-2xl h-14 animate-pulse" />)}
            </div>
          ) : !hasTrips ? (
            <p className="pt-8 text-textLabel text-center">Belum ada trip. Buat yang pertama dengan AI!</p>
          ) : (
            <motion.ul variants={staggerContainer(0.07)} initial="hidden" animate="visible" className="max-h-64 overflow-y-auto">
              {trips.map((t) => (
                <motion.li
                  key={t.id}
                  variants={fadeUp}
                  onClick={() => setSelected(t)}
                  className="flex items-center gap-4 hover:bg-secondarySage/15 -mx-2 px-2 py-3 rounded-2xl cursor-pointer">
                  <img
                    src={destinations.find((d) => d.slug === t.cover_slug)?.image}
                    alt=""
                    className="bg-secondarySage/40 rounded-lg size-11 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-lg truncate">{t.destination}{t.country && `, ${t.country}`}</p>
                    <p className="text-textLabel text-sm">{formatDateRange(t.start_date, t.end_date)}</p>
                    <p className="text-textLabel text-sm">
                      {tripDays(t.start_date, t.end_date) ? `${tripDays(t.start_date, t.end_date)} days · ` : ""}{t.travelers} travelers
                    </p>
                  </div>
                  <span className={`rounded-xl px-4 py-2 font-semibold capitalize ${STATUS_STYLE[t.status]}`}>{t.status}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </section>

        <motion.section
          whileHover={{ scale: 1.015 }}
          className="relative flex flex-col items-start gap-3 bg-primaryForest p-6 rounded-3xl overflow-hidden text-white">
          <MountainOrnament className="bottom-0 left-0 z-0 absolute opacity-30 w-full h-auto pointer-events-none" />
          <span className="relative z-10 flex justify-center items-center bg-accentSend rounded-full size-14 text-textMoss text-2xl">
            <i className="fi fi-rr-sparkles flex" />
          </span>
          <h3 className="relative z-10 font-switzer font-semibold text-3xl">Start a New Trip with AI</h3>
          <p className="relative z-10 font-satoshi text-lg">Enter your destination, dates, and budget. AI will create your itinerary in seconds.</p>
          <Button to="/dashboard/plan" className="relative z-10 mt-auto">
            <i className="fi fi-rr-sparkles mr-2" />
            Plan a trip
          </Button>
        </motion.section>
      </div>

      <section>
        <h2 className="font-switzer font-semibold text-3xl sm:text-4xl">{hasTrips ? "Inspiration for Your Next Trip" : "Inspiration for Your First Trip"}</h2>
        <p className="mb-5 font-satoshi text-lg">Pick a destination, and let AI plan your route.</p>
        <motion.div variants={staggerContainer(0.12)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="gap-4 sm:gap-6 grid sm:grid-cols-3">
          {destinations.slice(0, 3).map((d) => (
            <motion.button
              key={d.slug}
              type="button"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/dashboard/plan?dest=${d.slug}`)}
              className="group relative block rounded-[2rem] w-full h-[240px] sm:h-[280px] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-accentSend focus-visible:outline-offset-2">
              <span className="block absolute inset-0">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </span>

              <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

              <span className="bottom-0 block absolute inset-x-0 p-5">
                <span className="block font-satoshi text-whitebright text-base tracking-wider">
                  {d.country}
                </span>
                <span className="block font-satoshi font-bold text-whitebright text-3xl">
                  {d.name}
                </span>
                <span className="flex justify-between items-center">
                  <span className="font-satoshi font-light text-accentSend text-sm">
                    {d.tags?.join(", ")}
                  </span>
                  <i className="inline-flex fi fi-rr-angle-small-right group-hover:translate-x-1 text-accentSend text-3xl leading-none transition-transform duration-300" />
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <TripDetailModal trip={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
    </div>
  );
}