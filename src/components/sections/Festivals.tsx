import { HiArrowLongLeft } from 'react-icons/hi2'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { Footer } from '@/components/layout/Footer'
import { OccasionsCalendar } from '@/components/sections/OccasionsCalendar'
import { SITE } from '@/data/content'
import { useContent } from '@/i18n/lang'
import { navigate } from '@/lib/router'

/**
 * Standalone page for the temple's upcoming festivals & utsavams (route
 * `#/festivals`, linked from the Flash Story ticker). Poster cards for each
 * occasion (from the shared EVENTS data / temple listings), ordered soonest
 * first, with the occasions calendar in the sidebar. Bilingual EN/Tamil.
 */
export function Festivals() {
  const { FESTIVALS, EVENTS, UI } = useContent()
  const goHome = () => navigate('home')

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 text-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(55% 35% at 50% -5%, rgba(249,173,85,0.20), transparent 65%)',
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
            <span className="grid h-11 w-11 place-items-center rounded-full bg-maroon-900 font-display text-xl text-gold-400">
              ॐ
            </span>
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
            {FESTIVALS.eyebrow}
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.06] text-maroon-900">
            {FESTIVALS.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            {FESTIVALS.intro}
          </p>
        </Reveal>
      </section>

      {/* Poster grid (left) · occasions calendar (right) */}
      <div className="relative z-10 shell pt-14 pb-24 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT: festival posters ---------- */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {EVENTS.items.map((e, i) => (
                <Reveal key={`${e.start}-${e.title}`} delay={(i % 3) * 0.05}>
                  <a
                    href="#/e-calendar"
                    className="group block h-full overflow-hidden rounded-2xl border border-maroon-900/10 bg-cream-50 shadow-soft transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/5]">
                      <Img src={e.img} alt={e.title} zoom className="h-full w-full" />
                      <span className="absolute left-3 top-3 rounded-full bg-maroon-900/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cream-50 backdrop-blur">
                        {e.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg leading-tight text-maroon-900">
                        {e.title}
                      </h3>
                      <p className="mt-1.5 font-serif text-sm text-saffron-700">{e.date}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---------- RIGHT: occasions calendar ---------- */}
          <aside className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-24">
                <OccasionsCalendar variant="light" />
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
