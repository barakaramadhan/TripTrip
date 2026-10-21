import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LeafDecoration from './LeafDecoration'
import { HERO_BADGE, HERO_DESCRIPTION } from '../../constants/authContent'
import { cardSlideOut, fadeUp, headingVariants, lineVariants, popIn } from '../../animations/variants'

const INTRO_DURATION_MS = 2500 // perkiraan lama animasi pembuka

// Kotak krem di sisi kiri.
//   1. Awalnya sembunyi di belakang panel putih (lihat `cardSlideOut`)
//   2. Meluncur keluar, lalu isinya muncul bergantian
//   3. Saat pindah halaman (Sign In <-> Sign Up), hanya heading yang berganti
export default function HeroCard({ lines }) {
  // Saat pertama dibuka, heading menunggu kotak keluar dulu. Setelah itu tidak perlu jeda.
  const [introPlayed, setIntroPlayed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIntroPlayed(true), INTRO_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      variants={cardSlideOut}
      initial="hidden"
      animate="visible"
      // `-right-8` membuat kotak menjorok 2rem ke bawah panel putih, jadi tidak ada celah di pertemuannya
      className="absolute bottom-[20%] left-[12.5%] top-[12.8%] -right-8 z-10 overflow-hidden rounded-3xl bg-backgroundIvory px-8 pt-12 shadow-2xl"
    >
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.h1
            key={lines.join('')}
            variants={headingVariants}
            custom={introPlayed ? 0 : 0.9}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="whitespace-nowrap font-switzer text-[clamp(1.6rem,3.6vw,4rem)] font-bold uppercase leading-[1.15] tracking-tight text-textMoss"
          >
            {lines.map((line) => (
              // Pembungkus overflow-hidden = "garis" tempat teks muncul dari bawah
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span variants={lineVariants} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <motion.p variants={fadeUp} className="mt-4 max-w-sm text-base leading-relaxed text-textMoss">
          {HERO_DESCRIPTION}
        </motion.p>

        <motion.span
          variants={popIn}
          className="mt-6 inline-block rounded-full bg-secondarySage px-4 py-2 text-base text-backgroundIvory"
        >
          {HERO_BADGE}
        </motion.span>
      </div>

      <LeafDecoration />
    </motion.div>
  )
}
