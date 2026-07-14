import type { ComponentType, SVGProps } from 'react'
import {
  HiArrowLongLeft,
  HiOutlineClock,
  HiOutlineMoon,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineSun,
  HiSun,
} from 'react-icons/hi2'
import { Reveal } from '@/components/ui/Reveal'
import { Footer } from '@/components/layout/Footer'
import { OccasionsCalendar } from '@/components/sections/OccasionsCalendar'
import { SITE } from '@/data/content'
import { useContent } from '@/i18n/lang'
import { navigate } from '@/lib/router'

type Period = 'dawn' | 'morning' | 'noon' | 'night'

/** Icon + accent colour for each phase of the temple day. */
const PERIOD: Record<Period, { Icon: ComponentType<SVGProps<SVGSVGElement>>; accent: string }> = {
  dawn: { Icon: HiOutlineSparkles, accent: 'text-gold-300' },
  morning: { Icon: HiOutlineSun, accent: 'text-saffron-300' },
  noon: { Icon: HiSun, accent: 'text-saffron-400' },
  night: { Icon: HiOutlineMoon, accent: 'text-gold-400' },
}

/**
 * Standalone premium page for the temple's Daily Pooja Times (route
 * `#/daily-pooja`, linked from the Flash Story ticker). The schedule is
 * presented as a "day arc" timeline from the dawn milk abishekam to the night
 * arththa jaama pooja, with the temple's occasions calendar running down the
 * right side. Content renders bilingually from the shared content tree.
 */
export function DailyPooja() {
  const { DAILY_POOJA, UI } = useContent()
  const goHome = () => navigate('home')

  return (
    <div className="relative min-h-screen overflow-hidden bg-maroon-950 text-cream-100">
      {/* warm sanctum glow + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 40% at 50% -5%, rgba(249,173,85,0.20), transparent 65%), radial-gradient(50% 40% at 100% 100%, rgba(201,161,74,0.12), transparent 70%)',
        }}
      />
      <div aria-hidden className="grain absolute inset-0 opacity-60" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-gold-400/15 bg-maroon-950/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="shell flex items-center justify-between gap-3 py-4">
          <button
            type="button"
            onClick={goHome}
            className="group flex items-center gap-3"
            aria-label={`${SITE.name} — home`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 font-display text-xl text-gold-300 ring-1 ring-gold-400/30">
              ॐ
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[0.8rem] font-semibold text-cream-50 sm:text-[0.95rem]">
                Sri Vakrathunda Vinayagar
              </span>
              <span className="block text-[0.56rem] uppercase tracking-[0.24em] text-gold-300 sm:text-[0.62rem] sm:tracking-[0.28em]">
                Temple · The Basin
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={goHome}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-cream-50/25 px-3.5 py-2.5 text-sm font-medium tracking-wide text-cream-100 transition-colors hover:border-gold-300/60 hover:bg-cream-50/10 sm:px-5"
            aria-label={UI.flashBackToHome}
          >
            <HiArrowLongLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">{UI.flashBackToHome}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 shell pt-16 text-center sm:pt-24">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-6 -z-0 -translate-x-1/2 select-none font-display leading-none text-gold-400/10 text-[10rem] sm:text-[14rem]"
        >
          ॐ
        </span>
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-gold-300">
            <span aria-hidden className="h-px w-8 bg-gold-300/50" />
            {DAILY_POOJA.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-300/50" />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] text-cream-50">
            <span className="text-gilded">{DAILY_POOJA.title}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl font-serif text-lg leading-relaxed text-cream-100/80">
            {DAILY_POOJA.intro}
          </p>
        </Reveal>
      </section>

      {/* Two columns: pooja timeline (left) · occasions calendar (right) */}
      <div className="relative z-10 shell pt-14 pb-24 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT: timeline + booking + hours ---------- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ol className="relative">
              {/* vertical rail, centred on the 56px nodes */}
              <span
                aria-hidden
                className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-gold-300/50 via-gold-400/30 to-gold-400/5"
              />
              {DAILY_POOJA.items.map((item, i) => {
                const { Icon, accent } = PERIOD[item.period]
                return (
                  <li key={`${item.time}-${item.name}`} className="relative pb-7 last:pb-0">
                    <Reveal delay={i * 0.06}>
                      <div className="flex items-stretch gap-5">
                        {/* node */}
                        <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-400/40 bg-maroon-900 shadow-[0_0_24px_-6px_rgba(227,193,114,0.5)]">
                          <Icon className={`h-6 w-6 ${accent}`} aria-hidden />
                        </span>
                        {/* card */}
                        <div className="flex-1 rounded-2xl border border-gold-400/15 bg-cream-50/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-gold-300/35 hover:bg-cream-50/[0.07] sm:px-6">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <time className="font-display text-lg text-gold-300 sm:text-xl">
                              {item.time}
                            </time>
                            {item.tag && (
                              <span className="rounded-full border border-saffron-300/30 bg-saffron-300/10 px-2.5 py-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-saffron-300">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-1.5 font-serif text-xl text-cream-50 sm:text-2xl">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                )
              })}
            </ol>

            {/* Booking + hours */}
            <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-5">
              <Reveal className="sm:col-span-3">
                <a
                  href={SITE.officePhoneHref}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/10 to-transparent p-6 transition-colors hover:border-gold-300/60"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-400/15 ring-1 ring-gold-400/30">
                    <HiOutlinePhone className="h-5 w-5 text-gold-300" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-gold-300/80">
                      {DAILY_POOJA.bookingText}
                    </span>
                    <span className="mt-0.5 block font-display text-2xl text-cream-50 group-hover:text-gilded">
                      {SITE.officePhone}
                    </span>
                    <span className="text-sm text-cream-100/60">{DAILY_POOJA.officeLabel}</span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.08} className="sm:col-span-2">
                <div className="h-full rounded-2xl border border-gold-400/15 bg-cream-50/[0.03] p-6">
                  <span className="eyebrow inline-flex items-center gap-2 text-gold-300">
                    <HiOutlineClock className="h-4 w-4" />
                    {DAILY_POOJA.hoursTitle}
                  </span>
                  <ul className="mt-4 space-y-3">
                    {DAILY_POOJA.hoursLines.map((line) => (
                      <li key={line} className="font-serif text-sm leading-relaxed text-cream-100/85">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ---------- RIGHT: occasions calendar ---------- */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-24">
                <OccasionsCalendar variant="dark" />
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
