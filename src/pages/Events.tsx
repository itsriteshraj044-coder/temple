import { HiOutlineCalendarDays, HiArrowRight } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { useLetters } from '@/hooks/useAnime'
import { useContent } from '@/i18n/lang'
import { navigate } from '@/lib/router'
import type { EventItem } from '@/data/content'

/** Group events by their month/year label derived from the ISO start date. */
function groupByMonth(items: EventItem[]) {
  const groups: { month: string; items: EventItem[] }[] = []
  for (const it of items) {
    const month = new Date(it.start).toLocaleDateString('en-AU', {
      month: 'long',
      year: 'numeric',
    })
    const g = groups.find((x) => x.month === month)
    if (g) g.items.push(it)
    else groups.push({ month, items: [it] })
  }
  return groups
}

function EventRow({ item }: { item: EventItem }) {
  const day = new Date(item.start).toLocaleDateString('en-AU', { day: '2-digit' })
  const weekday = new Date(item.start).toLocaleDateString('en-AU', { weekday: 'short' })
  return (
    <motion.button
      onClick={() => navigate('/e-calendar')}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex w-full items-center gap-5 rounded-2xl border border-maroon-900/10 bg-cream-50 p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-saffron-500/50 sm:gap-6 sm:p-5"
    >
      {/* date chip */}
      <span className="grid shrink-0 place-items-center rounded-2xl bg-maroon-900/5 px-4 py-3 transition-colors group-hover:bg-saffron-500/15">
        <span className="font-display text-2xl font-semibold text-maroon-900 sm:text-3xl">
          {day}
        </span>
        <span className="text-[0.62rem] tracking-[0.16em] text-ink-500 uppercase">{weekday}</span>
      </span>

      {/* poster thumb */}
      <Img
        src={item.img}
        alt={item.title}
        className="hidden h-16 w-16 shrink-0 rounded-xl sm:block"
      />

      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg leading-snug text-maroon-900 sm:text-xl">
          {item.title}
        </span>
        <span className="mt-1 inline-block rounded-full bg-saffron-500/10 px-2.5 py-0.5 text-[0.68rem] font-medium tracking-wide text-saffron-700 uppercase">
          {item.category}
        </span>
      </span>

      <HiArrowRight className="h-5 w-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-saffron-600" />
    </motion.button>
  )
}

export function Events() {
  const { EVENTS } = useContent()
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const groups = groupByMonth(EVENTS.items)

  return (
    <StandalonePage crumbs={[{ label: 'Events' }]} tint="rgba(139,37,38,0.16)">
      {/* Hero */}
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-14 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
              {EVENTS.eyebrow}
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-maroon-900"
          >
            The sacred rhythm of the year
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              {EVENTS.intro}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <button
              onClick={() => navigate('/e-calendar')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              <HiOutlineCalendarDays className="h-4 w-4" />
              {EVENTS.calendarCta}
            </button>
          </Reveal>
        </div>
        <div className="relative h-56 lg:col-span-5 lg:h-80">
          <SacredLamp tint="#b8863b" className="absolute inset-0" />
        </div>
      </section>

      {/* Agenda */}
      <section className="relative shell pb-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((g) => (
            <div key={g.month}>
              <Reveal>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="font-display text-xl font-semibold text-maroon-900 sm:text-2xl">
                    {g.month}
                  </h2>
                  <span className="h-px flex-1 bg-maroon-900/10" />
                  <span className="text-[0.72rem] tracking-[0.16em] text-ink-500 uppercase">
                    {g.items.length} {g.items.length === 1 ? 'event' : 'events'}
                  </span>
                </div>
              </Reveal>
              <div className="space-y-3">
                {g.items.map((it) => (
                  <EventRow key={it.title + it.start} item={it} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </StandalonePage>
  )
}
