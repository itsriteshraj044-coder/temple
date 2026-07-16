import { HiArrowLongLeft, HiArrowUpRight } from 'react-icons/hi2'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useContent } from '@/i18n/lang'
import { getFlashSlug, navigate, usePathname } from '@/lib/router'

/**
 * Standalone page for a single Flash Story headline (route `#/flash/<slug>`).
 * The slug is language-neutral, so the same URL renders in whichever language
 * is active. If the slug is unknown we fall back to the first item.
 */
export function FlashPage() {
  const { UI } = useContent()
  usePathname() // re-render when the path (and thus the slug) changes
  const slug = getFlashSlug()
  const item = UI.flashItems.find((f) => f.slug === slug) ?? UI.flashItems[0]

  const goHome = () => navigate('/')

  return (
    <>
      <Navbar solid />
      <div className="min-h-screen bg-cream-100">
      {/* Article */}
      <section className="shell pb-24 pt-32 sm:pt-40">
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
    </>
  )
}
