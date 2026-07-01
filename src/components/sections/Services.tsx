import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { SERVICES } from '@/data/content'

/**
 * Service photography chosen to match each offering's content. Kept beside the
 * component (not in the text content) so the copy in `SERVICES` stays untouched.
 */
const MEDIA = [
  { src: '/images/web/services/pooja.webp', alt: 'Temple priests offering aarti during pooja at the golden Vinayagar sanctum' },
  { src: '/images/web/services/wedding.webp', alt: 'Nadaswaram and thavil musicians performing the auspicious temple music traditionally played at weddings and ceremonies' },
  { src: '/images/web/services/yearly.webp', alt: 'Brass oil lamps glowing during deeparadhana' },
  { src: '/images/web/services/community.webp', alt: 'Devotees gathered together in the temple hall' },
]

/**
 * Services as an interactive expanding-panel accordion. On desktop the four
 * image panels sit side-by-side like a temple filmstrip; hovering/focusing one
 * widens it to reveal the detail. On mobile it gracefully becomes a
 * tap-to-expand vertical accordion. The copy is unchanged — only presentation.
 *
 * The width/height expansion is driven by Motion (animating `flexGrow`) rather
 * than a CSS transition, because browsers do not reliably tween `flex-grow`.
 */
export function Services() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <section id="services" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.18), transparent 65%)' }}
      />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="relative shell">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow={SERVICES.eyebrow}
            title={SERVICES.title}
            className="lg:col-span-8"
          />
          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="text-[1.05rem] leading-relaxed text-ink-700 lg:text-right">
              Offered with devotion by our priests, in keeping with timeless Agamic tradition.
            </p>
          </Reveal>
        </div>

        {/* Expanding image panels */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col gap-3 lg:mt-16 lg:h-[32rem] lg:flex-row lg:gap-4">
            {SERVICES.items.map((s, i) => {
              const isActive = i === active
              const media = MEDIA[i] ?? MEDIA[0]
              return (
                <motion.button
                  key={s.title}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  initial={false}
                  animate={{ flexGrow: isActive ? 3 : 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                  }
                  className={`group relative flex min-h-[9rem] shrink-0 basis-0 cursor-pointer overflow-hidden rounded-[1.75rem] border bg-maroon-900 text-left outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-saffron-400 lg:min-h-0 ${
                    isActive ? 'border-gold-400/50' : 'border-maroon-900/15'
                  }`}
                >
                  {/* photo */}
                  <Img
                    src={media.src}
                    alt={media.alt}
                    zoom
                    className="absolute inset-0 h-full w-full"
                  />
                  {/* legibility wash — darker at the bottom for the copy */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-950/70 to-maroon-950/20 transition-opacity duration-500 ${
                      isActive ? 'opacity-95' : 'opacity-80 group-hover:opacity-90'
                    }`}
                  />

                  <div className="relative z-10 flex w-full flex-col p-7 sm:p-8 lg:h-full lg:w-[22rem] lg:justify-end lg:p-9">
                    {/* index badge — inline on mobile, pinned top-left on desktop */}
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-base backdrop-blur-sm transition-colors duration-500 lg:absolute lg:left-9 lg:top-9 ${
                        isActive
                          ? 'border-gold-400/60 bg-gold-400 text-maroon-950'
                          : 'border-cream-50/30 bg-maroon-950/30 text-gold-300'
                      }`}
                    >
                      {s.index}
                    </span>

                    {/* collapsed vertical title — desktop only, when not active */}
                    <span
                      aria-hidden
                      className={`absolute bottom-9 left-1/2 hidden -translate-x-1/2 font-display text-xl tracking-wide text-cream-50/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] [writing-mode:vertical-rl] ${
                        isActive ? 'lg:hidden' : 'lg:block'
                      }`}
                    >
                      {s.title}
                    </span>

                    {/* horizontal content — always on mobile, only when active on desktop */}
                    <div
                      className={`mt-5 transition-opacity duration-500 lg:mt-0 ${
                        isActive ? 'lg:opacity-100' : 'lg:opacity-0'
                      }`}
                    >
                      <h3 className="font-display text-2xl leading-tight text-cream-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-3xl">
                        {s.title}
                      </h3>

                      {/* description + cta reveal */}
                      <div
                        className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="min-h-0">
                          <p className="max-w-sm text-[0.95rem] leading-relaxed text-cream-100/85 sm:text-base">
                            {s.description}
                          </p>
                          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold-300 transition-colors duration-300 group-hover:text-saffron-400">
                            Enquire
                            <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
