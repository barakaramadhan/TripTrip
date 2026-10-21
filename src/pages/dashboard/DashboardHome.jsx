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

function StatCard({ icon, label, children }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="flex items-center gap-4 bg-whitebright p-6 rounded-3xl">
      <span className="flex justify-center items-center bg-secondarySage/40 rounded-2xl size-14 text-primaryForest text-2xl">
        <i className={`${icon} flex`} />
      </span>
      <div>
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
          className="flex flex-col items-start gap-3 bg-primaryForest p-6 rounded-3xl text-white">
          <span className="flex justify-center items-center bg-accentSend rounded-full size-14 text-textMoss text-2xl">
            <i className="fi fi-rr-sparkles flex" />
          </span>
          <h3 className="font-switzer font-semibold text-3xl">Start a New Trip with AI</h3>
          <p className="font-satoshi text-lg">Enter your destination, dates, and budget. AI will create your itinerary in seconds.</p>
          <Button to="/dashboard/plan" className="mt-auto">
            <i className="fi fi-rr-sparkles mr-2" />
            Plan a trip
          </Button>
        </motion.section>
      </div>

      <section>
        <h2 className="font-switzer font-semibold text-3xl sm:text-4xl">{hasTrips ? "Inspiration for Your Next Trip" : "Inspiration for Your First Trip"}</h2>
        <p className="mb-5 font-satoshi text-lg">Pick a destination, and let AI plan your route.</p>
        <motion.div variants={staggerContainer(0.12)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="gap-5 grid sm:grid-cols-3">
          {destinations.slice(0, 3).map((d) => (
            <motion.button
              key={d.slug}
              variants={fadeUp}
              whileHover="hover"
              onClick={() => navigate(`/dashboard/plan?dest=${d.slug}`)}
              className="group relative rounded-3xl h-72 overflow-hidden text-left text-white cursor-pointer">
              <motion.img variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.6 }} src={d.image} alt={d.name} className="absolute inset-0 size-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="bottom-4 left-5 absolute font-satoshi">
                <span className="block text-sm">{d.country}</span>
                <span className="block font-switzer font-bold text-2xl">{d.name}</span>
                <span className="block text-sm opacity-80">{d.tags?.join(", ")}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <TripDetailModal trip={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
    </div>
  );
}
