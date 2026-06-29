import { motion, useReducedMotion } from 'motion/react'
import { useParallax } from '@/hooks/useParallax'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { ABOUT } from '@/data/content'
import { IMAGES } from '@/data/images'

export function About() {
  const imgRef = useParallax<HTMLDivElement>(60)
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-none grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 xl:gap-16 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-28 5xl:px-32">
        {/* Image — arch silhouette mask */}
        <div className="lg:col-span-5 lg:order-1">
          {/* anchor box: the seal lives inside this (sized to the image), so it
              overlaps the image identically at every screen size */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-t-[14rem] rounded-b-[2rem] shadow-soft">
              <div ref={imgRef} className="absolute inset-0 scale-110">
                <Img src={IMAGES.about} alt={IMAGES.aboutAlt} zoom className="h-full w-full" />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 rounded-t-[14rem] rounded-b-[2rem] ring-1 ring-inset ring-maroon-900/10"
              />
            </div>
            {/* floating gold seal — anchored to the image */}
            <Reveal
              delay={0.2}
              className="absolute -bottom-2 left-8 grid h-28 w-28 place-items-center text-center sm:left-10"
            >
            {/* rotating Chakara behind the Om — sized wrapper so the <img>
                actually scales (a replaced element ignores left/right insets),
                nudged slightly down & right and centered behind the Om. */}
            <span className="pointer-events-none absolute -left-12 -top-12 h-56 w-56">
              <motion.img
                src={IMAGES.chakara}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain drop-shadow-[0_8px_20px_rgba(58,10,10,0.45)]"
                style={{ willChange: 'transform' }}
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
              />
            </span>
            <motion.span
              className="relative left-2 top-[0.62rem] font-display text-6xl leading-none text-gold-300"
              aria-label="Om"
              style={{ willChange: 'transform', textShadow: '0 2px 10px rgba(58,10,10,0.7)' }}
              animate={reduceMotion ? undefined : { scale: [1, 1.1, 1] }}
              transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ॐ
            </motion.span>
          </Reveal>
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-7 lg:order-2">
          <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.title} />
          <Reveal delay={0.1}>
            <p className="mt-8 font-serif text-2xl leading-relaxed text-maroon-800 sm:text-3xl">
              {ABOUT.lead}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-700">
              {ABOUT.body}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-maroon-900/10 pt-8">
            {ABOUT.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div>
                  <div className="font-display text-2xl text-maroon-900 sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs leading-snug tracking-wide text-ink-500 uppercase">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
