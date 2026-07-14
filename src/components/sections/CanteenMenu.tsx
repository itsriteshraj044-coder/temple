import { HiOutlineClock, HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2'
import { Reveal } from '@/components/ui/Reveal'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { OccasionsCalendar } from '@/components/sections/OccasionsCalendar'
import { SITE } from '@/data/content'
import { useContent } from '@/i18n/lang'

/**
 * Standalone page for Sri Ganesha's Canteen (route `#/canteen-menu`, linked
 * from the Flash Story ticker). A warm, light "menu card" layout listing the
 * full vegetarian menu with prices, opening hours, and the temple's occasions
 * calendar in the sidebar. Menu content is the exact published menu
 * (mvhs.org.au); everything renders bilingually from the shared content tree.
 */
export function CanteenMenu() {
  const { CANTEEN, CANTEEN_MENU } = useContent()

  // Split the weekend group ("<group> — <meal>") into a heading + nested meals.
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
    <>
      <Navbar solid />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 text-ink-900">
        {/* soft saffron light + grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 35% at 50% -5%, rgba(249,173,85,0.20), transparent 65%)',
          }}
        />
        <div aria-hidden className="grain absolute inset-0" />

      {/* Hero */}
      <section className="relative z-10 shell pt-32 text-center sm:pt-40">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            {CANTEEN_MENU.eyebrow}
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.06] text-maroon-900">
            {CANTEEN_MENU.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
            {CANTEEN_MENU.intro}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.canteenPhoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-maroon-900/15 bg-cream-50 px-4 py-2.5 text-sm text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
            >
              <HiOutlinePhone className="h-4 w-4 text-saffron-600" />
              {SITE.canteenPhone}
            </a>
            <a
              href={SITE.canteenEmailHref}
              className="inline-flex items-center gap-2 rounded-full border border-maroon-900/15 bg-cream-50 px-4 py-2.5 text-sm text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
            >
              <HiOutlineEnvelope className="h-4 w-4 text-saffron-600" />
              {SITE.canteenEmail}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Menu (left) · hours + calendar (right) */}
      <div className="relative z-10 shell pt-14 pb-24 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT: menu ---------- */}
          <div className="space-y-12 lg:col-span-8">
            {CANTEEN_MENU.categories.map((cat) => (
              <Reveal key={cat.name}>
                <section>
                  <div className="flex items-center gap-4">
                    <h2 className="font-display text-2xl text-maroon-900 sm:text-3xl">{cat.name}</h2>
                    <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gold-500/50 to-transparent" />
                  </div>
                  <div className="mt-5 grid gap-x-12 gap-y-2.5 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-baseline gap-2">
                        <span className="font-serif text-[1.02rem] text-maroon-900">{item.name}</span>
                        <span
                          aria-hidden
                          className="mb-1 min-w-6 flex-1 self-end border-b border-dotted border-maroon-900/25"
                        />
                        <span className="shrink-0 font-display text-[0.98rem] font-semibold text-saffron-700">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          {/* ---------- RIGHT: hours + occasions calendar ---------- */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* hours */}
              <Reveal>
                <div className="rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft">
                  <span className="eyebrow inline-flex items-center gap-2 text-saffron-600">
                    <HiOutlineClock className="h-4 w-4" />
                    {CANTEEN_MENU.hoursTitle}
                  </span>
                  <ul className="mt-4 divide-y divide-maroon-900/10">
                    {weekdayRows.map((h) => (
                      <li key={h.day} className="flex items-baseline justify-between gap-4 py-2.5">
                        <span className="font-display text-sm font-semibold text-maroon-800">
                          {h.day}
                        </span>
                        <span className="shrink-0 font-serif text-sm text-ink-700">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                  {weekendTitle && (
                    <div className="mt-4 border-t border-maroon-900/10 pt-4">
                      <h4 className="font-display text-sm font-semibold text-maroon-800">
                        {weekendTitle}
                      </h4>
                      <ul className="mt-2 space-y-1.5 border-l-2 border-saffron-500/30 pl-4">
                        {weekendMeals.map((m) => (
                          <li key={m.day} className="flex items-baseline justify-between gap-4">
                            <span className="font-serif text-sm text-maroon-900">{m.day}</span>
                            <span className="shrink-0 font-serif text-sm text-ink-700">{m.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>

              {/* occasions calendar */}
              <Reveal delay={0.08}>
                <OccasionsCalendar variant="light" />
              </Reveal>
            </div>
          </aside>
        </div>
      </div>

        <Footer />
      </div>
    </>
  )
}
