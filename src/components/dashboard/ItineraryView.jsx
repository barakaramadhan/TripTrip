import { motion } from "framer-motion";
import { formatRupiah } from "../../utils/format";
import { fadeUp, staggerContainer } from "../../animations/variants";

// Menampilkan hasil AI: ringkasan, timeline per hari, catatan penting.
// Dipakai di halaman Plan a Trip dan di jendela detail trip.
export default function ItineraryView({ itinerary }) {
  if (!itinerary) return <p className="font-satoshi text-textLabel">Belum ada itinerary AI untuk trip ini.</p>;

  return (
    <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="space-y-6 font-satoshi">
      <motion.div variants={fadeUp}>
        <h3 className="font-switzer font-semibold text-2xl">{itinerary.trip_title}</h3>
        <p className="mt-1 text-textMoss/80">{itinerary.overview}</p>
        <p className="mt-3 inline-block bg-secondarySage/40 px-3 py-1 rounded-full font-semibold text-primaryForest text-sm">
          Estimasi total {formatRupiah(itinerary.total_estimated_cost_idr)}
        </p>
        <p className="mt-2 text-textLabel text-xs">{itinerary.budget_note}</p>
      </motion.div>

      {itinerary.days.map((day) => (
        <motion.section key={day.day_number} variants={fadeUp}>
          <h4 className="mb-3 font-switzer font-semibold text-lg">
            Hari {day.day_number} · {day.title}
          </h4>
          <ol className="space-y-3 pl-4 border-secondarySage border-l-2">
            {day.activities.map((a, i) => (
              <li key={i} className="relative bg-whitebright p-4 rounded-2xl">
                <span className="top-5 -left-[1.4rem] absolute bg-primaryForest rounded-full size-2.5" />
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="font-semibold">{a.place}</p>
                  <p className="text-textLabel text-sm">
                    {a.time} · {a.duration_minutes} min · {formatRupiah(a.estimated_cost_idr)}
                  </p>
                </div>
                <p className="mt-1 text-sm">{a.description}</p>
                {a.notes && <p className="mt-1 text-textLabel text-xs">{a.notes}</p>}
              </li>
            ))}
          </ol>
        </motion.section>
      ))}

      {itinerary.important_notes?.length > 0 && (
        <motion.ul variants={fadeUp} className="space-y-1 bg-accentSend/20 p-4 rounded-2xl text-sm list-disc list-inside">
          {itinerary.important_notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
