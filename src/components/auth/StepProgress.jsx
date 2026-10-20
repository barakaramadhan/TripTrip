import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT } from '../../animations/variants'

const STEPS = ['Account', 'Location']

// Dua garis progress + "Step 1 of 2". Garis hijau menyapu dari kiri saat step aktif.
// currentStep dimulai dari 0.
export default function StepProgress({ currentStep }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3">
      <div className="flex gap-4">
        {STEPS.map((label, i) => (
          <div key={label} className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-300">
            <motion.div
              className="h-full rounded-full bg-secondarySage"
              style={{ originX: 0 }}
              initial={false}
              animate={{ scaleX: i === currentStep ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            />
          </div>
        ))}
      </div>

      <div className="mt-1 flex justify-between text-base">
        <span className="text-gray-400">
          Step {currentStep + 1} of {STEPS.length}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentStep}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="font-medium"
          >
            {STEPS[currentStep]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
