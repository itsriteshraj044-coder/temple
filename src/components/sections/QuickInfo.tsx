import { HiOutlineClock, HiOutlinePhone, HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/data/content'
import { useContent } from '@/i18n/lang'

/**
 * "At a Glance" quick-info band between the Flash Story ticker and the About
 * section — two paired cards summarising the temple's darshan hours and the
 * canteen timings. Both pull from the shared TIMINGS / CANTEEN content, so the
 * whole section renders in Tamil when Tamil is selected, and the numbers stay
 * in sync with the full sections further down the page.
 */
export function QuickInfo() {
  const { TIMINGS, CANTEEN, UI } = useContent()

  // The canteen data stores the weekend group as a single "<group> — <meal>"
  // label (e.g. "Weekends & Public Holidays — Breakfast"). Split it so the group
  // name becomes a subheading with the meals (Breakfast/Lunch/Dinner) nested
  // beneath it. Works in both languages — the separator is always " — ".
  const splitIdx = CANTEEN.hours.findIndex((h) => h.day.includes(' — '))
  const weekdayRows = splitIdx === -1 ? CANTEEN.hours : CANTEEN.hours.slice(0, splitIdx)
  const weekendTitle = splitIdx === -1 ? '' : CANTEEN.hours[splitIdx].day.split(' — ')[0].trim()
  const weekendMeals =
    splitIdx === -1
      ? []
      : [
          {
            day: CANTEEN.hours[splitIdx].day.split(' — ')[1].trim(),
            time: CANTEEN.hours[splitIdx].time,
          },
          ...CANTEEN.hours.slice(splitIdx + 1),
        ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 py-20 sm:py-24 lg:py-28">
      {/* soft saffron light + grain, echoing the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 0%, rgba(249,173,85,0.16), transparent 70%)',
        }}
      />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="relative z-10 shell">
        {/* heading */}
        <div className="mb-12 flex flex-col items-center text-center sm:mb-14">
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            {UI.quickEyebrow}
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
          <h2 className="mt-4 font-display text-3xl text-maroon-900 sm:text-4xl">{UI.quickTitle}</h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">
          {/* ---------- Temple Hours ---------- */}
          <Reveal>
            <article className="group h-full overflow-hidden rounded-3xl border border-maroon-900/10 bg-cream-50 shadow-soft">
              <header className="flex items-center gap-4 bg-gradient-to-r from-maroon-900 to-maroon-700 px-7 py-6 text-cream-50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream-50/10 ring-1 ring-cream-50/20">
                  <HiOutlineClock className="h-6 w-6 text-gold-300" />
                </span>
                <h3 className="font-display text-xl leading-tight sm:text-2xl">
                  {UI.quickTempleHours}
                </h3>
              </header>

              <div className="space-y-6 px-7 py-7 sm:px-8">
                {TIMINGS.schedule.map((s) => (
                  <div key={s.day}>
                    <h4 className="font-display text-base font-semibold text-maroon-800 sm:text-lg">
                      {s.day}
                    </h4>
                    <ul className="mt-2.5 space-y-2">
                      {s.sessions.map((t) => (
                        <li key={t} className="flex items-center gap-3">
                          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                          <span className="font-serif text-lg text-ink-700 sm:text-xl">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {/* ---------- Canteen Timings ---------- */}
          <Reveal delay={0.1}>
            <article className="group h-full overflow-hidden rounded-3xl border border-maroon-900/10 bg-cream-50 shadow-soft">
              <header className="flex items-center gap-4 bg-gradient-to-r from-saffron-600 to-saffron-400 px-7 py-6 text-cream-50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream-50/15 ring-1 ring-cream-50/25">
                  <HiOutlineBuildingStorefront className="h-6 w-6 text-cream-50" />
                </span>
                <h3 className="font-display text-xl leading-tight sm:text-2xl">
                  {UI.quickCanteenTimings}
                </h3>
              </header>

              <div className="px-7 py-7 sm:px-8">
                {/* phone */}
                <a
                  href={SITE.canteenPhoneHref}
                  className="flex items-center gap-3 rounded-2xl border border-saffron-500/30 bg-saffron-300/10 px-4 py-3 transition-colors hover:border-saffron-500/60 hover:bg-saffron-300/20"
                >
                  <HiOutlinePhone className="h-5 w-5 shrink-0 text-saffron-600" />
                  <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink-500 uppercase">
                    {UI.quickCanteenPhone}
                  </span>
                  <span className="ml-auto font-serif text-lg text-maroon-900 sm:text-xl">
                    {SITE.canteenPhone}
                  </span>
                </a>

                {/* hours */}
                <div className="mt-5">
                  {/* weekday rows */}
                  <ul className="divide-y divide-maroon-900/10">
                    {weekdayRows.map((h) => (
                      <li key={h.day} className="flex items-baseline justify-between gap-4 py-3">
                        <span className="font-display text-sm font-semibold text-maroon-800 sm:text-base">
                          {h.day}
                        </span>
                        <span className="shrink-0 font-serif text-base text-ink-700 sm:text-lg">
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* weekend group — title with meals nested beneath */}
                  {weekendTitle && (
                    <div className="mt-5 border-t border-maroon-900/10 pt-4">
                      <h4 className="font-display text-sm font-semibold text-maroon-800 sm:text-base">
                        {weekendTitle}
                      </h4>
                      <ul className="mt-2 space-y-2 border-l-2 border-saffron-500/30 pl-4">
                        {weekendMeals.map((m) => (
                          <li key={m.day} className="flex items-baseline justify-between gap-4">
                            <span className="font-serif text-base text-maroon-900 sm:text-lg">
                              {m.day}
                            </span>
                            <span className="shrink-0 font-serif text-base text-ink-700 sm:text-lg">
                              {m.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
