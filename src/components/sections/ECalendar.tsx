import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { HiArrowLongLeft, HiXMark } from 'react-icons/hi2'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Footer } from '@/components/layout/Footer'
import { EVENTS, SITE, type EventItem } from '@/data/content'
import { navigate } from '@/lib/router'

/** Month label like "July 2026" from an ISO start date. */
function monthLabel(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', {
    month: 'long',
    year: 'numeric',
  })
}

/** Filter categories in first-appearance order, prefixed with "All". */
function useCategories() {
  return useMemo(() => {
    const seen: string[] = []
    for (const e of EVENTS.items) if (!seen.includes(e.category)) seen.push(e.category)
    return ['All', ...seen]
  }, [])
}

/** Group an ordered event list into [month, events] buckets, preserving order. */
function groupByMonth(items: EventItem[]) {
  const groups: { label: string; events: EventItem[] }[] = []
  for (const e of items) {
    const label = monthLabel(e.start)
    const last = groups[groups.length - 1]
    if (last && last.label === label) last.events.push(e)
    else groups.push({ label, events: [e] })
  }
  return groups
}

export function ECalendar() {
  const categories = useCategories()
  const [filter, setFilter] = useState('All')
  const [zoom, setZoom] = useState<EventItem | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? EVENTS.items : EVENTS.items.filter((e) => e.category === filter)),
    [filter],
  )
  const groups = useMemo(() => groupByMonth(filtered), [filtered])

  // Close the poster zoom on Escape, and lock body scroll while it is open.
  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [zoom])

  const goHome = () => navigate('home')

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Top bar — brand + back to home */}
      <header className="sticky top-0 z-40 border-b border-maroon-900/10 bg-cream-50/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-none items-center justify-between px-5 py-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
          <button
            type="button"
            onClick={goHome}
            className="group flex items-center gap-3"
            aria-label={`${SITE.name} — home`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-maroon-900 font-display text-xl text-gold-400">
              ॐ
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[0.95rem] font-semibold text-maroon-900">
                Sri Vakrathunda Vinayagar
              </span>
              <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-saffron-600">
                Temple · The Basin
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={goHome}
            className="group inline-flex items-center gap-2 rounded-full border border-maroon-900/30 px-5 py-2.5 text-sm font-medium tracking-wide text-maroon-900 transition-colors hover:border-maroon-900/60 hover:bg-maroon-900 hover:text-cream-50"
          >
            <HiArrowLongLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-none px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        <Reveal>
          <span className="eyebrow mb-5 inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Temple Calendar · 2026
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-5xl leading-[0.95] text-maroon-900 sm:text-6xl lg:text-7xl">
            E-Calendar
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-700">{EVENTS.intro}</p>
        </Reveal>

        {/* Filter chips */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {categories.map((c) => {
              const active = c === filter
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    active
                      ? 'border-maroon-900 bg-maroon-900 text-cream-50'
                      : 'border-maroon-900/25 text-maroon-900 hover:border-maroon-900/50 hover:bg-maroon-900/5'
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </Reveal>
      </section>

      {/* Month groups */}
      <section className="mx-auto max-w-none px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        {groups.map((group) => (
          <div key={group.label} className="mt-12 first:mt-4">
            <Reveal>
              <div className="flex items-center gap-5 border-t border-maroon-900/10 pt-7">
                <h2 className="font-display text-3xl text-maroon-900 sm:text-4xl">{group.label}</h2>
                <span className="font-serif text-base italic text-ink-500">
                  {group.events.length} {group.events.length === 1 ? 'observance' : 'observances'}
                </span>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.events.map((e, i) => (
                <motion.button
                  type="button"
                  key={`${e.title}-${e.start}`}
                  onClick={() => setZoom(e)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-maroon-900/10 bg-cream-50 text-left shadow-[0_20px_50px_-35px_rgba(58,10,10,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-maroon-900/25 hover:shadow-[0_30px_60px_-30px_rgba(58,10,10,0.5)]"
                  aria-label={`View poster for ${e.title}`}
                >
                  <div className="aspect-square overflow-hidden bg-cream-200">
                    <Img src={e.img} alt={e.title} fit="contain" zoom className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-saffron-600">
                      {e.category}
                    </span>
                    <h3 className="mt-2 font-display text-xl leading-tight text-maroon-900">
                      {e.title}
                    </h3>
                    <span className="mt-0.5 font-serif text-sm text-ink-600">{e.date}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <p className="mt-16 text-center font-serif text-lg italic text-ink-500">
            No observances in this category.
          </p>
        )}
      </section>

      <Footer />

      {/* Full poster zoom */}
      {createPortal(
        <AnimatePresence>
          {zoom && (
            <motion.div
              className="fixed inset-0 z-[100] flex flex-col bg-maroon-950/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setZoom(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`${zoom.title} poster`}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
                <div className="min-w-0">
                  <div className="truncate font-display text-lg text-cream-50 sm:text-xl">
                    {zoom.title}
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-cream-50/60">
                    {zoom.date}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setZoom(null)}
                  aria-label="Close poster"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-cream-50/80 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
                >
                  <HiXMark className="h-6 w-6" />
                </button>
              </div>
              <div
                className="flex flex-1 items-center justify-center overflow-hidden px-4 pb-8 sm:px-16"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={zoom.img}
                  src={zoom.img}
                  alt={zoom.title}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
