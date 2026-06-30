import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HiBars3, HiXMark, HiChevronDown } from 'react-icons/hi2'
import { NAV, SITE } from '@/data/content'
import { scrollToHash } from '@/providers/SmoothScroll'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    if (href.startsWith('#')) scrollToHash(href)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-50/85 py-1.5 shadow-[0_10px_40px_-24px_rgba(58,10,10,0.5)] backdrop-blur-xl'
            : 'bg-transparent py-3'
        }`}
      >
        <nav className="mx-auto flex max-w-none items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-28 5xl:px-32">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              go('#home')
            }}
            className="group flex items-center gap-3"
            aria-label={`${SITE.name} — home`}
          >
            <img
              src="/images/svvt-emblem.webp"
              alt={`${SITE.name} emblem`}
              className="h-20 w-20 shrink-0 object-contain"
            />
            <span className="leading-tight">
              <span className="block font-display text-[0.95rem] font-semibold text-maroon-900 transition-colors duration-500">
                Sri Vakrathunda Vinayagar
              </span>
              <span className="block text-[0.62rem] tracking-[0.28em] text-saffron-600 uppercase transition-colors duration-500">
                Temple · The Basin
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setAboutOpen(true)}
                onMouseLeave={() => item.children && setAboutOpen(false)}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.href)
                  }}
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.82rem] font-medium text-ink-700 transition-colors duration-300 hover:text-maroon-900"
                >
                  {item.label}
                  {item.children && <HiChevronDown className="h-3.5 w-3.5 opacity-70" />}
                </a>
                {item.children && (
                  <AnimatePresence>
                    {aboutOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full w-64 overflow-hidden rounded-2xl border border-maroon-900/10 bg-cream-50 p-2 shadow-[0_30px_60px_-30px_rgba(58,10,10,0.45)]"
                      >
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <a
                              href={c.href}
                              onClick={(e) => {
                                e.preventDefault()
                                go(c.href)
                              }}
                              className="block rounded-xl px-4 py-2.5 text-[0.82rem] text-ink-700 transition-colors duration-200 hover:bg-cream-200 hover:text-maroon-900"
                            >
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#donate"
              onClick={(e) => {
                e.preventDefault()
                go('#donate')
              }}
              className="hidden rounded-full bg-saffron-500 px-5 py-2.5 text-[0.82rem] font-medium text-maroon-950 transition-all duration-300 hover:bg-saffron-400 hover:shadow-[0_12px_30px_-10px_rgba(238,123,30,0.7)] md:inline-block"
            >
              Donate
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors xl:hidden ${
                open ? 'text-cream-50' : 'text-maroon-900'
              }`}
            >
              {open ? <HiXMark className="h-7 w-7" /> : <HiBars3 className="h-7 w-7" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-maroon-950 px-6 pb-12 pt-28 xl:hidden"
          >
            <ul className="mx-auto flex max-w-md flex-col gap-1">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      go(item.href)
                    }}
                    className="block border-b border-cream-50/10 py-4 font-display text-2xl text-cream-50"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <ul className="grid grid-cols-2 gap-x-4 py-3">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a
                            href={c.href}
                            onClick={(e) => {
                              e.preventDefault()
                              go(c.href)
                            }}
                            className="block py-1.5 text-sm text-gold-300/80"
                          >
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
            <a
              href="#donate"
              onClick={(e) => {
                e.preventDefault()
                go('#donate')
              }}
              className="mx-auto mt-8 block w-full max-w-md rounded-full bg-saffron-500 py-4 text-center font-medium text-maroon-950"
            >
              Donate
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
