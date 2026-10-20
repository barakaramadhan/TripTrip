import { motion } from 'framer-motion'
import { EASE_OUT } from '../../animations/variants'

const ACCENT_COLOR = '#dca878' // sama dengan --color-accentSend di index.css
const DOT_COLOR = '#ffffff'

// Titik navigasi di bawah kotak krem. Titik aktif memanjang jadi pil kuning.
export default function HeroDots({ items, activeIndex, onSelect }) {
  return (
    <div className="absolute bottom-[10%] left-1/2 z-10 flex -translate-x-1/2 gap-3">
      {items.map((item, i) => {
        const isActive = i === activeIndex
        return (
          <motion.button
            key={item.id}
            type="button"
            aria-label={`Show background ${i + 1}`}
            onClick={() => onSelect(i)}
            initial={false}
            animate={{
              width: isActive ? 36 : 12,
              backgroundColor: isActive ? ACCENT_COLOR : DOT_COLOR,
            }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="h-3 cursor-pointer rounded-full"
          />
        )
      })}
    </div>
  )
}
