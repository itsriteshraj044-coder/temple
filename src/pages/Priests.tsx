import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { useLetters } from '@/hooks/useAnime'
import { SITE } from '@/data/content'

const PRIESTS = [
  '/images/web/services/pooja.webp',
  '/images/IMG_0933.jpg',
  '/images/IMG_0865.jpg',
]

export function Priests() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Priests' }]}
      tint="rgba(201,161,74,0.20)"
      surface="from-[#faf4e6] to-cream-50"
    >
      <section className="relative shell pt-10 pb-12 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Our Priests
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Hands that serve the deities
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            Our learned priests perform the daily abishegams, archanai and poojas in keeping with
            timeless Agamic tradition — the living link between the devotee and the divine.
          </p>
        </Reveal>
      </section>

      <section className="relative shell pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PRIESTS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-3xl border border-maroon-900/10 bg-cream-50 shadow-soft"
            >
              <Img
                src={src}
                alt="Temple priest performing sacred rituals"
                zoom
                className="aspect-[4/5] w-full"
              />
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-display text-lg text-maroon-900">Temple Priest</span>
                <span className="text-[0.66rem] tracking-[0.16em] text-saffron-700 uppercase">
                  Agamic rites
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative shell pb-24 text-center">
        <Reveal>
          <p className="font-serif text-ink-700">
            For pooja bookings and enquiries, call the temple office at{' '}
            <a href={SITE.phoneHref} className="font-semibold text-maroon-900 underline decoration-saffron-500/50 underline-offset-4">
              {SITE.phone}
            </a>
            .
          </p>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
