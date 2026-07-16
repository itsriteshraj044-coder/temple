import { HiOutlinePhone, HiOutlineClock, HiArrowRight } from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters, useMagnetic } from '@/hooks/useAnime'
import { useContent } from '@/i18n/lang'
import { SITE } from '@/data/content'
import { navigate } from '@/lib/router'

export function Canteen() {
  const { CANTEEN, CANTEEN_MENU } = useContent()
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const ctaRef = useMagnetic<HTMLButtonElement>(0.4)

  // A flat list of dish names for the running marquee.
  const dishes = CANTEEN_MENU.categories.flatMap((c) => c.items.map((i) => i.name)).slice(0, 40)

  return (
    <StandalonePage
      crumbs={[{ label: 'Sri Ganesha’s Canteen' }]}
      tint="rgba(238,123,30,0.20)"
      surface="from-[#fcf1e2] to-cream-50"
    >
      {/* Hero */}
      <section className="relative shell pt-10 pb-10 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            {CANTEEN.eyebrow}
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Prasadam, warm and homemade
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            {CANTEEN.body}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              ref={ctaRef}
              onClick={() => navigate('/canteen-menu')}
              className="inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              See the full menu <HiArrowRight className="h-4 w-4" />
            </button>
            <a
              href={SITE.canteenPhoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-maroon-900/15 bg-cream-50 px-5 py-3 text-sm text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
            >
              <HiOutlinePhone className="h-4 w-4 text-saffron-600" />
              {SITE.canteenPhone}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Running dish marquee */}
      <section aria-hidden className="relative overflow-hidden py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream-50 to-transparent" />
        <div className="marquee-track flex w-max gap-8">
          {[...dishes, ...dishes].map((d, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-2xl text-maroon-900/70 sm:text-3xl"
            >
              {d}
              <span className="mx-4 text-saffron-500">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* Category preview + hours */}
      <section className="relative shell grid grid-cols-1 gap-8 pb-24 pt-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="mb-6 font-display text-2xl text-maroon-900 sm:text-3xl">
              On the menu today
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CANTEEN_MENU.categories.map((cat, i) => (
              <Reveal key={cat.name} delay={(i % 4) * 0.05}>
                <button
                  onClick={() => navigate('/canteen-menu')}
                  className="group flex h-full w-full flex-col items-start justify-between rounded-2xl border border-maroon-900/10 bg-cream-50 p-4 text-left shadow-soft transition-all hover:-translate-y-1 hover:border-saffron-500/50"
                >
                  <span className="font-display text-[0.98rem] leading-snug text-maroon-900">
                    {cat.name}
                  </span>
                  <span className="mt-3 text-[0.72rem] text-ink-500">
                    {cat.items.length} items
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Hours */}
        <aside className="lg:col-span-4">
          <Reveal>
            <div className="rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft lg:sticky lg:top-24">
              <span className="eyebrow inline-flex items-center gap-2 text-saffron-600">
                <HiOutlineClock className="h-4 w-4" />
                Opening Hours
              </span>
              <ul className="mt-4 space-y-3">
                {CANTEEN.hours.map((h) => (
                  <li key={h.day} className="border-b border-maroon-900/5 pb-3 last:border-0">
                    <p className="font-display text-sm font-semibold text-maroon-800">{h.day}</p>
                    <p className="mt-0.5 font-serif text-sm text-ink-700">{h.time}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/catering')}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-saffron-700 hover:text-maroon-900"
              >
                Catering enquiries <HiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </aside>
      </section>
    </StandalonePage>
  )
}
