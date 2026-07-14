import { HiArrowLongLeft, HiArrowUpRight } from 'react-icons/hi2'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/layout/Footer'
import { SITE } from '@/data/content'
import { useContent } from '@/i18n/lang'
import { getFlashSlug, navigate, useRoute } from '@/lib/router'

/**
 * Standalone page for a single Flash Story headline (route `#/flash/<slug>`).
 * The slug is language-neutral, so the same URL renders in whichever language
 * is active. If the slug is unknown we fall back to the first item.
 */
export function FlashPage() {
  const { UI } = useContent()
  useRoute() // re-render when the hash (and thus the slug) changes
  const slug = getFlashSlug()
  const item = UI.flashItems.find((f) => f.slug === slug) ?? UI.flashItems[0]

  const goHome = () => navigate('home')

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Top bar — brand + back to home */}
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

      {/* Article */}
      <section className="shell pb-24 pt-16 sm:pt-24">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <span className="eyebrow mb-5 inline-flex items-center gap-3 text-saffron-600">
              <span className="font-display text-lg leading-none text-gold-500" aria-hidden>
                ॐ
              </span>
              {UI.flashLabel}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-display text-maroon-900">{item.label}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              aria-hidden
              className="mt-7 h-px w-24 bg-gradient-to-r from-gold-500 to-transparent"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-7 font-serif text-lg leading-relaxed text-ink-700">{item.body}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={item.ctaHref} variant="solid" icon={<HiArrowUpRight />}>
                {item.ctaLabel}
              </Button>
              <button
                type="button"
                onClick={goHome}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-maroon-900 transition-colors hover:text-saffron-600"
              >
                <HiArrowLongLeft className="h-5 w-5" />
                {UI.flashBackToHome}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
