import { HiOutlineCheckCircle, HiOutlineArrowDownTray, HiOutlineStar } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'

const TIERS: { name: string; fee: string; note: string; featured?: boolean }[] = [
  { name: 'Ordinary', fee: '$1,000', note: 'One-time fee · non-transferable' },
  { name: 'Life', fee: '$5,000', note: 'One-time fee · transferable to family', featured: true },
  { name: 'Trustee', fee: '$20,000', note: 'One-time fee · transferable to family' },
]

const BENEFITS = [
  '25% member discount on all temple payments above $175',
  'Voting rights in MVHS elections',
  'Nomination rights for Management Committee positions',
  'Newsletter and AGM report access',
  'Participation in the Annual General Meeting',
]

const FORM_URL = 'https://www.mvhs.org.au/wp-content/uploads/2025/01/MEMBERSHIP-FORM-NEW.2022.pdf'
const OFFICE_EMAIL = 'templeoffice@mvhs.org.au'

export function BecomeMember() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'Join Us', href: '/join-us' }, { label: 'Become a Member' }]}
      tint="rgba(139,37,38,0.16)"
    >
      <section className="relative shell pt-10 pb-12 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Membership
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Become part of the family
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            Enrol as a member and gain a voice in the temple’s shared journey — with lasting benefits
            and a place in our community for generations.
          </p>
        </Reveal>
      </section>

      {/* Tiers */}
      <section className="relative shell pb-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col items-center rounded-3xl border p-8 text-center shadow-soft ${
                t.featured
                  ? 'border-saffron-500/40 bg-gradient-to-br from-maroon-900 to-[#240505] text-cream-50 sm:-translate-y-3'
                  : 'border-maroon-900/10 bg-cream-50'
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 inline-flex items-center gap-1 rounded-full bg-gold-400 px-3 py-1 text-[0.66rem] font-semibold tracking-wide text-maroon-950 uppercase">
                  <HiOutlineStar className="h-3.5 w-3.5" /> Most chosen
                </span>
              )}
              <span
                className={`text-[0.7rem] tracking-[0.18em] uppercase ${
                  t.featured ? 'text-gold-300' : 'text-saffron-700'
                }`}
              >
                {t.name} Member
              </span>
              <p
                className={`mt-3 font-display text-4xl font-semibold ${
                  t.featured ? 'text-gold-300' : 'text-maroon-900'
                }`}
              >
                {t.fee}
              </p>
              <p
                className={`mt-2 font-serif text-sm ${
                  t.featured ? 'text-cream-100/80' : 'text-ink-600'
                }`}
              >
                {t.note}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits + How */}
      <section className="relative shell grid grid-cols-1 gap-6 pb-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="h-full rounded-3xl border border-maroon-900/10 bg-cream-50 p-7 shadow-soft">
            <h2 className="font-display text-2xl text-maroon-900">Member benefits</h2>
            <ul className="mt-5 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-saffron-600" />
                  <span className="font-serif text-[0.98rem] leading-relaxed text-ink-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <div className="flex h-full flex-col rounded-3xl border border-saffron-500/25 bg-saffron-500/8 p-7">
            <h2 className="font-display text-2xl text-maroon-900">How to join</h2>
            <p className="mt-4 font-serif text-[0.98rem] leading-relaxed text-ink-700">
              New applicants must be nominated by an existing member of the same class and seconded by
              another. Complete the membership form and email it to{' '}
              <a
                href={`mailto:${OFFICE_EMAIL}`}
                className="font-semibold text-maroon-900 underline decoration-saffron-500/50 underline-offset-4"
              >
                {OFFICE_EMAIL}
              </a>
              .
            </p>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              <HiOutlineArrowDownTray className="h-4 w-4" />
              Download membership form
            </a>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
