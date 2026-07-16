import { HiOutlinePhone, HiOutlineCalendarDays } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { SITE } from '@/data/content'

type Status = 'booked' | 'available' | 'multiple'

const BOARD: { name: string; from: string; status: Status }[] = [
  { name: 'Monthly Naagar Abishegam', from: '$150', status: 'multiple' },
  { name: 'Pradhosam (monthly)', from: '$75', status: 'multiple' },
  { name: 'Thai Sangadahara Sathurthi', from: '$150', status: 'available' },
  { name: 'Vaikasi Sukla Shasty', from: '$600', status: 'available' },
  { name: 'Sukla Shasty Murugan Festival', from: '$600', status: 'available' },
  { name: 'Hanuman Homam', from: '$400', status: 'multiple' },
  { name: 'Gayathri Ambal Abishegam', from: '$250', status: 'available' },
  { name: 'Mahotsavam Utsavam', from: '$1,000', status: 'booked' },
  { name: 'Navarathiri Poojas', from: '$500', status: 'booked' },
  { name: 'Bhavanothsavam', from: '$500', status: 'booked' },
  { name: 'Karthikai Deepam', from: '$300', status: 'available' },
  { name: 'Maha Sivarathiri', from: '$500', status: 'booked' },
  { name: 'Tamil New Year Pooja', from: '$300', status: 'available' },
]

const STATUS_STYLE: Record<Status, { label: string; cls: string }> = {
  booked: { label: 'Booked', cls: 'bg-ink-500/10 text-ink-500' },
  available: { label: 'Available', cls: 'bg-green-500/12 text-green-700' },
  multiple: { label: 'Multiple slots', cls: 'bg-saffron-500/15 text-saffron-700' },
}

export function PoojaBookings() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'Services', href: '/services' }, { label: 'Yearly Pooja Bookings' }]}
      tint="rgba(201,161,74,0.20)"
    >
      <section className="relative shell pt-10 pb-8 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <HiOutlineCalendarDays className="h-4 w-4" />
            Yearly Bookings & Availability
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.03] text-maroon-900"
        >
          Sponsor a pooja for the year
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            Reserve recurring annual poojas for your family — from monthly abishegams to the great
            festival utsavams. Sponsorships range from $50 to $1,000. Availability updates through the
            year, so please confirm your dates by phone.
          </p>
        </Reveal>

        {/* Legend */}
        <Reveal delay={0.16}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {(Object.keys(STATUS_STYLE) as Status[]).map((s) => (
              <span
                key={s}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-medium ${STATUS_STYLE[s].cls}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {STATUS_STYLE[s].label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Real temple imagery */}
      <section className="relative shell pb-12">
        <Reveal>
          <Img
            src="/images/web/services/yearly.webp"
            alt="Sacred lamps and kalasam arranged for a temple pooja"
            className="h-56 w-full rounded-3xl border border-maroon-900/10 shadow-soft sm:h-72"
          />
        </Reveal>
      </section>

      {/* Board */}
      <section className="relative shell pb-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BOARD.map((b, i) => {
            const st = STATUS_STYLE[b.status]
            return (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-maroon-900/10 bg-cream-50 p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-[1rem] leading-snug text-maroon-900">{b.name}</p>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.66rem] font-medium ${st.cls}`}>
                    {st.label}
                  </span>
                </div>
                <p className="text-sm text-ink-500">
                  from <span className="font-display font-semibold text-saffron-700">{b.from}</span>
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="relative shell pb-24 text-center">
        <Reveal>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
          >
            <HiOutlinePhone className="h-4 w-4" /> Confirm availability — {SITE.phone}
          </a>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
