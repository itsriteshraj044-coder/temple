import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HiBars3, HiXMark, HiChevronDown } from 'react-icons/hi2'
import { SITE } from '@/data/content'
import { scrollToHash } from '@/providers/SmoothScroll'
import { navigate } from '@/lib/router'
import { useContent, useLang } from '@/i18n/lang'

export function Navbar({ solid = false }: { solid?: boolean }) {
  const { NAV, UI } = useContent()
  const { lang } = useLang()
  const isTa = lang === 'ta'
  const [scrolled, setScrolled] = useState(solid)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    // On standalone pages the bar is always solid; skip the scroll listener.
    if (solid) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    if (href.startsWith('#')) scrollToHash(href)
    else navigate(href)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
          scrolled
            ? 'bg-cream-50/85 shadow-[0_10px_40px_-24px_rgba(58,10,10,0.5)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav
          className={`shell flex items-center justify-between ${
            scrolled ? 'py-0.5' : 'py-1.5'
          }`}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              go('#home')
            }}
            className="group flex shrink-0 items-center gap-2.5 xl:gap-3"
            aria-label={`${SITE.name} — home`}
          >
            <img
              src="/Client%20Website%20Logo.svg"
              alt={`${SITE.name} logo`}
              className="h-16 w-16 shrink-0 object-contain [filter:brightness(0)] sm:h-20 sm:w-20 2xl:h-24 2xl:w-24"
            />
            <span className="leading-tight">
              <span className="block whitespace-nowrap font-display text-[0.8rem] font-semibold text-maroon-900 transition-colors duration-500 sm:text-[0.95rem] xl:text-[0.85rem] 2xl:text-[0.95rem]">
                Sri Vakrathunda Vinayagar
              </span>
              <span className="block text-[0.56rem] tracking-[0.24em] text-saffron-600 uppercase transition-colors duration-500 sm:text-[0.62rem] sm:tracking-[0.28em] xl:text-[0.58rem] 2xl:text-[0.62rem]">
                Temple · The Basin
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className={`hidden items-center xl:flex ${isTa ? 'gap-0' : 'gap-0 2xl:gap-1'}`}>
            {NAV.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => item.children && setOpenMenu(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.href)
                  }}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full py-2 font-medium text-ink-700 transition-colors duration-300 hover:text-maroon-900 ${
                    isTa
                      ? 'px-1.5 text-[0.68rem] 2xl:px-2 2xl:text-[0.74rem]'
                      : 'px-2 text-[0.74rem] 2xl:px-3.5 2xl:text-[0.82rem]'
                  }`}
                >
                  {item.label}
                  {item.children && <HiChevronDown className="h-3.5 w-3.5 opacity-70" />}
                </a>
                {item.children && (
                  <AnimatePresence>
                    {openMenu === item.label && (
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
              className="hidden rounded-full bg-[#8a2526] px-4 py-2 text-[0.78rem] font-medium text-cream-50 transition-all duration-300 hover:bg-[#240505] hover:shadow-[0_12px_30px_-10px_rgba(58,10,10,0.7)] md:inline-block 2xl:px-5 2xl:py-2.5 2xl:text-[0.82rem]"
            >
              {UI.donate}
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
            className="fixed inset-0 z-40 overflow-y-auto bg-maroon-950 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[calc(7rem+env(safe-area-inset-top))] pb-[calc(3rem+env(safe-area-inset-bottom))] xl:hidden"
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
              className="mx-auto mt-8 block w-full max-w-md rounded-full bg-[#8a2526] py-4 text-center font-medium text-cream-50"
            >
              {UI.donate}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
