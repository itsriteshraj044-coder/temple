import { useEffect, useState } from 'react'
import { HiOutlineClock } from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { useContent } from '@/i18n/lang'

/** [openMinutes, closeMinutes] windows for weekday (0) and weekend (1). */
const TEMPLE = {
  weekday: [[7 * 60, 12 * 60], [18 * 60, 21 * 60]],
  weekend: [[7 * 60, 13 * 60], [16 * 60 + 30, 21 * 60]],
}

function isOpenNow(now: Date) {
  const day = now.getDay() // 0 Sun … 6 Sat
  const weekend = day === 0 || day === 6
  const mins = now.getHours() * 60 + now.getMinutes()
  const windows = weekend ? TEMPLE.weekend : TEMPLE.weekday
  return windows.some(([o, c]) => mins >= o && mins < c)
}

export function OpeningHours() {
  const { TIMINGS, CANTEEN, UI } = useContent()
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  const open = isOpenNow(now)

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Opening Hours' }]}
      tint="rgba(201,161,74,0.20)"
    >
      <section className="relative shell pt-10 pb-8 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <HiOutlineClock className="h-4 w-4" />
            {UI.templeTimings}
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          When the sanctum opens
        </h1>

        {/* Live status */}
        <Reveal delay={0.1}>
          <div
            className={`mt-7 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-medium ${
              open
                ? 'border-green-500/30 bg-green-500/10 text-green-700'
                : 'border-maroon-900/15 bg-cream-50 text-ink-600'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              {open && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  open ? 'bg-green-600' : 'bg-ink-400'
                }`}
              />
            </span>
            {open ? 'Open now — darshan in progress' : 'Currently closed'}
            <span className="text-ink-400">
              ·{' '}
              {now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </Reveal>
      </section>

      <section className="relative shell grid grid-cols-1 gap-6 pb-24 lg:grid-cols-2">
        {/* Temple hours */}
        <Reveal>
          <div className="h-full rounded-3xl border border-maroon-900/10 bg-cream-50 p-7 shadow-soft">
            <h2 className="font-display text-2xl text-maroon-900">Temple darshan</h2>
            <ul className="mt-5 space-y-5">
              {TIMINGS.schedule.map((s) => (
                <li key={s.day} className="border-b border-maroon-900/5 pb-5 last:border-0 last:pb-0">
                  <h3 className="font-display text-sm font-semibold text-maroon-800">{s.day}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {s.sessions.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-saffron-500/10 px-3 py-1 font-serif text-sm text-saffron-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.82rem] italic text-ink-500">
              Hours may change during Utsavams (festival celebrations).
            </p>
          </div>
        </Reveal>

        {/* Canteen hours */}
        <Reveal delay={0.06}>
          <div className="h-full rounded-3xl border border-maroon-900/10 bg-gradient-to-br from-maroon-900 to-[#240505] p-7 text-cream-50 shadow-soft">
            <h2 className="font-display text-2xl text-cream-50">Sri Ganesha’s Canteen</h2>
            <ul className="mt-5 space-y-4">
              {CANTEEN.hours.map((h) => (
                <li key={h.day} className="flex items-start justify-between gap-4 border-b border-cream-50/10 pb-4 last:border-0 last:pb-0">
                  <span className="font-display text-sm font-medium text-gold-300">{h.day}</span>
                  <span className="text-right font-serif text-sm text-cream-100/85">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
