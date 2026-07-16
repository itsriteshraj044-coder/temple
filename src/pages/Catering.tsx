import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineUserGroup } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { SITE } from '@/data/content'

const TIERS = [
  { title: 'Hall Service', qty: 'Under 100 guests', price: '$24', unit: 'per head' },
  { title: 'Hall Service', qty: '100+ guests', price: '$22', unit: 'per head', featured: true },
  { title: 'Takeaway', qty: 'Standard containers', price: '$20', unit: 'per head' },
]

const STANDARD = [
  'Plain Rice',
  'Sambhar, Rasam or Kulambu',
  'Potato dry curry',
  'Vegetable preparations',
  'Vadai',
  'Payasam',
  'Yogurt salad',
  'Appalam & Pickle',
  'Tea & Coffee (complimentary)',
]

const ADDONS = [
  'Poori / Chapathi',
  'Paneer Butter Masala',
  'Channa Masala',
  'Soya Curry',
  'Jeera / Coconut / Tomato Rice',
  'Biryani',
  'Gulab Jamoon',
  'Kesari',
  'Mysore Pak',
]

export function Catering() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[
        { label: 'Sri Ganesha’s Canteen', href: '/canteen' },
        { label: 'Catering' },
      ]}
      tint="rgba(238,123,30,0.18)"
      surface="from-[#fcf1e2] to-cream-50"
    >
      <section className="relative shell pt-10 pb-12 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <HiOutlineUserGroup className="h-4 w-4" />
            Internal & External Catering
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Feasts cooked with devotion
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            Authentic South Indian catering for your functions — in our hall or at your venue. Fresh,
            vegetarian, and prepared by Sri Ganesha’s Canteen.
          </p>
        </Reveal>
      </section>

      {/* Pricing tiers */}
      <section className="relative shell pb-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.title + t.qty}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center rounded-3xl border p-8 text-center shadow-soft ${
                t.featured
                  ? 'border-saffron-500/40 bg-gradient-to-br from-maroon-900 to-[#240505] text-cream-50 sm:-translate-y-3'
                  : 'border-maroon-900/10 bg-cream-50'
              }`}
            >
              <span className={`text-[0.7rem] tracking-[0.18em] uppercase ${t.featured ? 'text-gold-300' : 'text-saffron-700'}`}>
                {t.title}
              </span>
              <p className={`mt-3 font-display text-4xl font-semibold ${t.featured ? 'text-gold-300' : 'text-maroon-900'}`}>
                {t.price}
              </p>
              <span className={`text-xs ${t.featured ? 'text-cream-100/70' : 'text-ink-500'}`}>
                {t.unit}
              </span>
              <p className={`mt-3 font-serif text-sm ${t.featured ? 'text-cream-100/80' : 'text-ink-600'}`}>
                {t.qty}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="relative shell grid grid-cols-1 gap-6 pb-16 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-maroon-900/10 bg-cream-50 p-7 shadow-soft">
            <h2 className="font-display text-2xl text-maroon-900">Standard menu</h2>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {STANDARD.map((s) => (
                <li key={s} className="flex items-center gap-2.5">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                  <span className="font-serif text-[0.95rem] text-ink-700">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="h-full rounded-3xl border border-saffron-500/25 bg-saffron-500/8 p-7">
            <h2 className="font-display text-2xl text-maroon-900">Premium add-ons</h2>
            <p className="mt-1 text-sm text-ink-500">Available at a small surcharge per head.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ADDONS.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-maroon-900/12 bg-cream-50 px-3.5 py-1.5 font-serif text-sm text-maroon-900"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="relative shell pb-24">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.canteenPhoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              <HiOutlinePhone className="h-4 w-4" /> {SITE.canteenPhone}
            </a>
            <a
              href={SITE.canteenEmailHref}
              className="inline-flex items-center gap-2 rounded-full border border-maroon-900/15 bg-cream-50 px-5 py-3 text-sm text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
            >
              <HiOutlineEnvelope className="h-4 w-4 text-saffron-600" /> {SITE.canteenEmail}
            </a>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
