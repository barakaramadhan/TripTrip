import { motion } from 'framer-motion'
import { leafRise } from '../../animations/variants'

// Dekorasi daun di pojok kanan bawah kotak krem.
// Satu bentuk daun (<g id="leaf">) dipakai 4x dengan rotasi, ukuran, dan warna berbeda.
export default function LeafDecoration() {
  return (
    // Lapisan luar: animasi masuk (naik dari bawah)
    <motion.div
      variants={leafRise}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 -right-1 w-[46%] max-w-[17rem]"
    >
      {/* Lapisan dalam: bergoyang pelan terus-menerus, berporos di pangkal daun */}
      <motion.div
        style={{ originX: 1, originY: 1 }}
        animate={{ rotate: [0, 2.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 320 340" className="block h-auto w-full">
          <defs>
            <g id="leaf">
              <path d="M0 0C-46-60-50-170 0-300 50-170 46-60 0 0Z" />
              <path d="M0-14V-240" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" fill="none" />
            </g>
          </defs>
          <use href="#leaf" fill="#d3e0cd" transform="translate(250 340) rotate(-4)" />
          <use href="#leaf" fill="#c3d4bd" transform="translate(250 340) rotate(-38) scale(0.8)" />
          <use href="#leaf" fill="#b4c7ae" transform="translate(250 340) rotate(-68) scale(0.7)" />
          <use href="#leaf" fill="#dbe6d6" transform="translate(250 340) rotate(-88) scale(0.55)" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
