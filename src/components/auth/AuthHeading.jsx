import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

// Judul besar + sub-judul di atas form.
export default function AuthHeading({ title, subtitle }) {
  return (
    <motion.div variants={fadeUp} className="mb-3">
      <h1 className="font-switzer text-[2.1rem] sm:text-[2.5rem] font-bold leading-[0.95] tracking-tight">{title}</h1>
      <p className="mt-2 text-base">{subtitle}</p>
    </motion.div>
  )
}
