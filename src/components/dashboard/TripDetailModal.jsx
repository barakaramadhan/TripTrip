import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ItineraryView from "./ItineraryView";
import { formatDateRange, formatRupiah } from "../../utils/format";

// Jendela detail trip. `trip` = null -> tertutup. Tekan Esc atau klik latar untuk menutup.
export default function TripDetailModal({ trip, onClose, onDelete }) {
  useEffect(() => {
    if (!trip) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trip, onClose]);

  return (
    <AnimatePresence>
      {trip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="z-50 fixed inset-0 flex justify-center items-end sm:items-center bg-black/40 backdrop-blur-sm p-0 sm:p-6">
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="bg-backgroundIvory p-6 sm:rounded-3xl rounded-t-3xl w-full max-w-2xl max-h-[88dvh] overflow-y-auto font-satoshi">
            <div className="flex justify-between items-start gap-4 mb-5">
              <div>
                <h2 className="font-switzer font-semibold text-2xl">{trip.destination}</h2>
                <p className="text-textLabel text-sm">
                  {formatDateRange(trip.start_date, trip.end_date)} · {trip.travelers} travelers · {formatRupiah(trip.budget_idr)}
                </p>
              </div>
              <button onClick={onClose} aria-label="Tutup" className="p-2 text-xl cursor-pointer">
                <i className="fi fi-br-cross" />
              </button>
            </div>
            <ItineraryView itinerary={trip.itinerary} />
            <button
              onClick={() => onDelete(trip)}
              className="hover:bg-red-50 mt-6 px-4 py-2 border border-red-200 rounded-full text-red-700 text-sm cursor-pointer">
              Hapus trip
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
