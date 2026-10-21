import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDestinations } from "../../hooks/useDestinations";
import { fadeUp, staggerContainer } from "../../animations/variants";

export default function DestinationsPage() {
  const { destinations, loading } = useDestinations();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const shown = destinations.filter((d) => `${d.name} ${d.country} ${d.tags?.join(" ")}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="font-switzer font-bold text-4xl">Destination</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kota, negara, atau tema…" className="bg-whitebright px-4 py-3 border border-secondarySage rounded-full outline-none focus:border-primaryForest w-full max-w-md font-satoshi" />
      {loading && <p className="font-satoshi text-textLabel">Memuat…</p>}
      <motion.div key={q} variants={staggerContainer(0.06)} initial="hidden" animate="visible" className="gap-5 grid sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((d) => (
          <motion.article key={d.slug} variants={fadeUp} whileHover={{ y: -6 }} className="bg-whitebright rounded-3xl overflow-hidden font-satoshi">
            <div className="h-52 overflow-hidden">
              <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} src={d.image} alt={d.name} className="size-full object-cover" />
            </div>
            <div className="space-y-2 p-5">
              <p className="text-textLabel text-sm">{d.country} · {d.duration}</p>
              <h3 className="font-switzer font-bold text-2xl">{d.name}</h3>
              <p className="text-sm">{d.description}</p>
              <p className="text-primaryForest text-sm">Terbaik: {d.bestTime} · {d.budget}</p>
              <button onClick={() => navigate(`/dashboard/plan?dest=${d.slug}`)} className="bg-accentSend mt-2 px-5 py-2 rounded-full font-semibold cursor-pointer">Plan with AI</button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
