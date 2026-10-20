import { AnimatePresence, motion } from "framer-motion";

const STYLES = {
  error: "bg-red-50 text-red-600",
  success: "bg-secondarySage/30 text-primaryForest",
};

// Kotak pesan dari server (mis. "Invalid login credentials").
// alert = { type: 'error' | 'success', message: '...' }  atau null untuk menyembunyikan.
export default function FormAlert({ alert }) {
  return (
    <AnimatePresence initial={false}>
      {alert && (
        <motion.div
          key={alert.message}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden">
          <p
            role="alert"
            className={`rounded-xl px-4 py-3 text-sm ${STYLES[alert.type]}`}>
            {alert.message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
