import { HiOutlineHeart, HiOutlineSparkles } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { SITE } from '@/data/content'

const PACKAGES: {
  kind: string
  title: string
  price: string
  items: string[]
  featured?: boolean
}[] = [
  {
    kind: 'Internal',
    title: 'Temple Full Wedding',
    price: '$3,100',
    featured: true,
    items: [
      'Hire of Hall & Manvarai',
      'Officiating priest',
      'All pooja items',
      'Wedding garlands',
      'Nadhaswaram & Tavil musicians',
      'Catering available separately',
    ],
  },
  {
    kind: 'External',
    title: 'Priest Outdoor Service',
    price: '$700',
    items: ['Officiating priest', 'Pooja items — Kalasams, Coconuts, Sarams'],
  },
  {
    kind: 'External',
    title: 'Musician Outdoor Service',
    price: '$800',
    items: ['Nadhaswaram & Tavil — 1 set'],
  },
  {
    kind: 'External',
    title: 'Wedding Garlands',
    price: '$900',
    items: ['Traditional wedding garlands'],
  },
  {
    kind: 'Ceremony',
    title: 'GrahaPravesham / House Warming',
    price: '$450',
    items: ['Outdoor priest service'],
  },
  {
    kind: 'Ceremony',
    title: 'Samanthi Veedu (Engagement)',
    price: '$600',
    items: ['Musician outdoor service'],
  },
]

export function WeddingServices() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'Services', href: '/services' }, { label: 'Wedding Services' }]}
      tint="rgba(201,161,74,0.22)"
      surface="from-[#faf4e6] to-cream-50"
    >
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-14 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <HiOutlineHeart className="h-4 w-4" />
              Wedding Services
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.03] text-maroon-900"
          >
            Sacred beginnings, blessed unions
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              Traditional Hindu marriages conducted with full Agamic rites — in our hall before the
              deities, or at your chosen venue with our priests and musicians.
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5">
          <Img
            src="/images/web/services/wedding.webp"
            alt="Priests performing a sacred ceremony before the temple deities"
            className="h-56 w-full rounded-3xl border border-maroon-900/10 shadow-soft lg:h-80"
          />
        </Reveal>
      </section>

      <section className="relative shell pb-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col overflow-hidden rounded-3xl border p-7 shadow-soft ${
                p.featured
                  ? 'border-saffron-500/40 bg-gradient-to-br from-maroon-900 to-[#240505] text-cream-50 sm:col-span-2 lg:col-span-1 lg:row-span-2'
                  : 'border-maroon-900/10 bg-cream-50'
              }`}
            >
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[0.66rem] tracking-[0.16em] uppercase ${
                  p.featured ? 'bg-gold-400/15 text-gold-300' : 'bg-saffron-500/10 text-saffron-700'
                }`}
              >
                {p.featured && <HiOutlineSparkles className="h-3.5 w-3.5" />}
                {p.kind}
              </span>
              <h3
                className={`mt-4 font-display text-2xl ${
                  p.featured ? 'text-cream-50' : 'text-maroon-900'
                }`}
              >
                {p.title}
              </h3>
              <p
                className={`mt-1 font-display text-3xl font-semibold ${
                  p.featured ? 'text-gold-300' : 'text-saffron-700'
                }`}
              >
                {p.price}
              </p>
              <ul className="mt-5 space-y-2.5">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        p.featured ? 'bg-gold-400' : 'bg-saffron-500'
                      }`}
                    />
                    <span
                      className={`font-serif text-[0.95rem] leading-relaxed ${
                        p.featured ? 'text-cream-100/85' : 'text-ink-700'
                      }`}
                    >
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.05}>
          <p className="mt-8 text-center font-serif text-ink-700">
            Full external wedding package (priest + musicians + garlands) — $2,400. To plan your
            ceremony, call{' '}
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
