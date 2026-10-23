
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router";
import ItineraryView from "../../components/dashboard/ItineraryView";
import { useDestinations } from "../../hooks/useDestinations";
import { generateItinerary } from "../../services/aiService";
import { createTrip } from "../../services/tripService";
import { formatRupiah } from "../../utils/format";
import { fadeUp, staggerContainer } from "../../animations/variants";

const TRANSPORT = [
  ["flexible", "Pilih yang terbaik"], ["plane", "Pesawat"], ["train", "Kereta"],
  ["car", "Mobil"], ["public_transport", "Transportasi umum"], ["ferry", "Feri"],
];

const inputClass =
  "w-full rounded-2xl border border-secondarySage bg-whitebright px-4 py-3 font-satoshi outline-none transition focus:border-primaryForest focus:ring-2 focus:ring-secondarySage";

function Field({ label, children }) {
  return (
    <motion.label variants={fadeUp} className="block">
      <span className="block mb-1.5 font-satoshi font-medium text-sm">{label}</span>
      {children}
    </motion.label>
  );
}

export default function PlanTrip() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { destinations } = useDestinations();

  // ?dest=bali (dari kartu inspirasi) mengisi tujuan otomatis
  const preset = destinations.find((d) => d.slug === params.get("dest"));
  const [form, setForm] = useState({
    destination: "", country: "", startDate: "", endDate: "",
    travelers: 2, budget: 5000000, transport: "flexible", interests: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [saving, setSaving] = useState(false);

  const value = (k) => (k === "destination" && !form.destination && preset ? preset.name : form[k]);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const payload = () => {
    const destination = (value("destination") || "").trim();
    const match = destinations.find((d) => d.name.toLowerCase() === destination.toLowerCase());
    return {
      ...form,
      destination,
      country: form.country || match?.country || "",
      cover_slug: match?.slug ?? null,
      travelers: Number(form.travelers),
      budget: Number(form.budget),
    };
  };

  const generate = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      setItinerary(await generateItinerary(payload()));
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  // Simpan ke Supabase. Tanpa itinerary -> status draft.
  const save = async () => {
    const p = payload();
    setSaving(true);
    try {
      await createTrip({
        destination: p.destination, country: p.country || null,
        start_date: p.startDate || null, end_date: p.endDate || null,
        travelers: p.travelers, budget_idr: p.budget, transport: p.transport,
        cover_slug: p.cover_slug, itinerary: itinerary ?? null,
        status: itinerary ? "planned" : "draft",
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="gap-8 grid lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:h-[calc(100vh-8rem)] lg:overflow-hidden">
      <motion.form variants={staggerContainer(0.06)} initial="hidden" animate="visible" onSubmit={generate} className="self-start space-y-4 bg-backgroundIvory/0 lg:overflow-y-auto lg:max-h-full lg:pr-2">
        <motion.h1 variants={fadeUp} className="font-switzer font-bold text-4xl">Plan a Trip</motion.h1>
        <motion.p variants={fadeUp} className="font-satoshi">Isi detail singkat, AI yang menyusun rutenya.</motion.p>

        <Field label="Tujuan">
          <input required minLength={2} list="dest-list" className={inputClass} value={value("destination")} onChange={set("destination")} placeholder="Contoh: Bali" />
          <datalist id="dest-list">{destinations.map((d) => <option key={d.slug} value={d.name} />)}</datalist>
        </Field>
        <div className="gap-3 grid grid-cols-2">
          <Field label="Berangkat"><input type="date" className={inputClass} value={form.startDate} onChange={set("startDate")} /></Field>
          <Field label="Pulang"><input type="date" min={form.startDate} className={inputClass} value={form.endDate} onChange={set("endDate")} /></Field>
        </div>
        <div className="gap-3 grid grid-cols-2">
          <Field label="Traveler"><input type="number" min="1" max="20" className={inputClass} value={form.travelers} onChange={set("travelers")} /></Field>
          <Field label="Transportasi">
            <select className={inputClass} value={form.transport} onChange={set("transport")}>
              {TRANSPORT.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
        </div>
        <Field label={`Budget total (${formatRupiah(form.budget)})`}>
          <input type="number" min="0" step="100000" className={inputClass} value={form.budget} onChange={set("budget")} />
        </Field>
        <Field label="Minat (opsional)">
          <input className={inputClass} value={form.interests} onChange={set("interests")} placeholder="kuliner, alam, budaya…" />
        </Field>

        {error && <p role="alert" className="bg-red-50 p-3 rounded-2xl text-red-700 text-sm">{error}</p>}

        <motion.button
          variants={fadeUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          disabled={status === "loading"}
          className="bg-accentSend disabled:opacity-60 py-3 rounded-full w-full font-satoshi font-semibold cursor-pointer">
          <i className="mr-2 fi fi-rr-sparkles" />
          {status === "loading" ? "AI sedang menyusun…" : "Generate with AI"}
        </motion.button>
      </motion.form>

      <section className="min-h-80 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:pr-2 scrollbar-hide">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }} className="bg-secondarySage/30 rounded-3xl h-28" />
              ))}
              <p className="font-satoshi text-textLabel text-center">Menyusun rute, jadwal, dan estimasi biaya…</p>
            </motion.div>
          )}

          {status === "done" && (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ItineraryView itinerary={itinerary} />
              <button onClick={save} disabled={saving} className="bg-primaryForest disabled:opacity-60 mt-6 px-6 py-3 rounded-full font-satoshi font-semibold text-white cursor-pointer">
                {saving ? "Menyimpan…" : "Simpan trip"}
              </button>
            </motion.div>
          )}

          {status === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col justify-center items-center gap-3 p-10 border-2 border-secondarySage border-dashed rounded-3xl h-full text-center">
              <p className="font-satoshi text-textLabel">Itinerary AI akan muncul di sini.</p>
              <button onClick={save} disabled={saving || !value("destination")} className="disabled:opacity-40 text-primaryForest text-sm underline cursor-pointer">
                atau simpan sebagai draft tanpa AI
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
