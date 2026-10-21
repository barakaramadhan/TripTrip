import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { EASE_OUT } from '../../animations/variants'

const LINKS = [
  { href: '#planner', label: 'Plan' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
]

// Navbar menempel di atas. Transparan di puncak halaman, lalu berubah jadi
// kaca buram begitu di-scroll. Di layar kecil, menu dibuka lewat tombol hamburger.
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hiddenForDestinations, setHiddenForDestinations] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const section = document.getElementById('destinations')
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0
      const bounds = section?.getBoundingClientRect()
      const shouldHide = Boolean(bounds && bounds.top <= headerHeight && bounds.bottom > headerHeight)

      setHiddenForDestinations(shouldHide)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const close = () => setOpen(false)

  return (
    <motion.header
      ref={headerRef}
      aria-hidden={hiddenForDestinations}
      inert={hiddenForDestinations}
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: hiddenForDestinations ? '-100%' : 0,
        opacity: hiddenForDestinations ? 0 : 1,
      }}
      transition={{ duration: hiddenForDestinations ? 0.18 : 0.25, ease: EASE_OUT }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        hiddenForDestinations ? 'pointer-events-none' : ''
      } ${
        scrolled || open
          ? 'bg-backgroundIvory/85 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-3 sm:px-10 lg:px-20 lg:py-4">
        <Link to="/" onClick={close} className="font-switzer text-lg font-bold sm:text-xl">
          TripTrip.com
        </Link>

        <ul className="hidden items-center gap-8 font-satoshi font-medium lg:flex">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="group relative py-1">
                {label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accentSend transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <Button to="/signin" variant="secondary">
              Sign In
            </Button>
            <Button to="/signup">Get Started!!</Button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full text-2xl text-textMoss transition-colors hover:bg-secondarySage/40 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.i
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className={`fi ${open ? 'fi-rr-cross-small' : 'fi-br-bars-sort'} inline-flex`}
              />
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-5 font-satoshi text-lg font-medium sm:px-10">
              {LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a href={href} onClick={close} className="block rounded-xl px-3 py-3 hover:bg-secondarySage/30">
                    {label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2 flex gap-2 sm:hidden">
                <Button to="/signin" variant="secondary" onClick={close} className="flex-1">
                  Sign In
                </Button>
                <Button to="/signup" onClick={close} className="flex-1">
                  Get Started!!
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
