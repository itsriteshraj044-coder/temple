import { HiArrowLongLeft, HiOutlineClock, HiOutlinePhone } from 'react-icons/hi2'
import { Reveal } from '@/components/ui/Reveal'
import { Footer } from '@/components/layout/Footer'
import { OccasionsCalendar } from '@/components/sections/OccasionsCalendar'
import { SITE } from '@/data/content'
import { useContent } from '@/i18n/lang'
import { navigate } from '@/lib/router'

/**
 * Standalone page for the temple's poojas, archanai and abishegam services
 * (route `#/abishegam`, linked from the Flash Story "Weekend Special Abishegam"
 * item). A light "offering catalog" of every service with its price (exact from
 * mvhs.org.au's Pooja Service page), with temple hours and the occasions
 * calendar in the sidebar. Bilingual EN/Tamil (service names neutral).
 */
export function Abishegam() {
  const { POOJA_SERVICE, TIMINGS, UI } = useContent()
  const goHome = () => navigate('home')

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 text-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(55% 35% at 50% -5%, rgba(201,161,74,0.20), transparent 65%)',
        }}
      />
      <div aria-hidden className="grain absolute inset-0" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-maroon-900/10 bg-cream-50/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="shell flex items-center justify-between gap-3 py-4">
          <button
            type="button"
            onClick={goHome}
            className="group flex items-center gap-3"
            aria-label={`${SITE.name} — home`}
          >
            <img
              src="/Client%20Website%20Logo.svg"
              alt={`${SITE.name} logo`}
              className="h-14 w-14 shrink-0 object-contain [filter:brightness(0)] sm:h-16 sm:w-16"
            />
            <span className="leading-tight">
              <span className="block font-display text-[0.8rem] font-semibold text-maroon-900 sm:text-[0.95rem]">
                Sri Vakrathunda Vinayagar
              </span>
              <span className="block text-[0.56rem] uppercase tracking-[0.24em] text-saffron-600 sm:text-[0.62rem] sm:tracking-[0.28em]">
                Temple · The Basin
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={goHome}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-maroon-900/30 px-3.5 py-2.5 text-sm font-medium tracking-wide text-maroon-900 transition-colors hover:border-maroon-900/60 hover:bg-maroon-900 hover:text-cream-50 sm:px-5"
            aria-label={UI.flashBackToHome}
          >
            <HiArrowLongLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">{UI.flashBackToHome}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 shell pt-14 text-center sm:pt-20">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            {POOJA_SERVICE.eyebrow}
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.06] text-maroon-900">
            {POOJA_SERVICE.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            {POOJA_SERVICE.intro}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={SITE.phoneHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-maroon-900/15 bg-cream-50 px-4 py-2.5 text-sm text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
          >
            <HiOutlinePhone className="h-4 w-4 text-saffron-600" />
            <span className="text-ink-500">{POOJA_SERVICE.contactLabel}:</span>
            {SITE.phone}
          </a>
        </Reveal>
      </section>

      {/* Offerings (left) · hours + calendar (right) */}
      <div className="relative z-10 shell pt-14 pb-24 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT: offering catalog ---------- */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {POOJA_SERVICE.items.map((item, i) => (
                <Reveal key={item.name} delay={(i % 2) * 0.05}>
                  <div className="flex h-full items-start justify-between gap-3 rounded-xl border border-maroon-900/10 bg-cream-50 px-4 py-3.5 shadow-soft transition-colors hover:border-saffron-500/40">
                    <div className="flex min-w-0 gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-maroon-900/5 font-display text-[0.7rem] font-semibold text-saffron-600">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-serif text-[1rem] leading-snug text-maroon-900">
                          {item.name}
                        </p>
                        {item.note && (
                          <p className="mt-0.5 text-[0.78rem] italic text-ink-500">{item.note}</p>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 font-display text-[0.98rem] font-semibold text-saffron-700">
                      {item.price}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---------- RIGHT: hours + occasions calendar ---------- */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* hours */}
              <Reveal>
                <div className="rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft">
                  <span className="eyebrow inline-flex items-center gap-2 text-saffron-600">
                    <HiOutlineClock className="h-4 w-4" />
                    {POOJA_SERVICE.hoursTitle}
                  </span>
                  <ul className="mt-4 space-y-4">
                    {TIMINGS.schedule.map((s) => (
                      <li key={s.day}>
                        <h4 className="font-display text-sm font-semibold text-maroon-800">
                          {s.day}
                        </h4>
                        <ul className="mt-1.5 space-y-1">
                          {s.sessions.map((t) => (
                            <li key={t} className="flex items-center gap-2.5">
                              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
                              <span className="font-serif text-sm text-ink-700">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
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
  )
}
