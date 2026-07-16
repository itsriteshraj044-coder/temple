import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from 'react-icons/hi2'
import { FaYoutube, FaFacebookF, FaWhatsapp } from 'react-icons/fa6'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters, useMagnetic } from '@/hooks/useAnime'
import { useContent } from '@/i18n/lang'
import { SITE } from '@/data/content'

const OFFICE_EMAIL = 'templeoffice@mvhs.org.au'
const MAP_SRC =
  'https://www.google.com/maps?q=1294+Mountain+Highway,+The+Basin,+Victoria+3154,+Australia&output=embed'

function Social({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.5)
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full border border-maroon-900/10 bg-cream-50 text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60 hover:text-saffron-600"
    >
      {children}
    </a>
  )
}

export function Contacts() {
  const { TIMINGS, UI } = useContent()
  const titleRef = useLetters<HTMLHeadingElement>(200)

  const cards = [
    {
      icon: <HiOutlineMapPin className="h-6 w-6" />,
      label: UI.contactAddress,
      value: SITE.address,
      href: MAP_SRC.replace('&output=embed', ''),
    },
    {
      icon: <HiOutlinePhone className="h-6 w-6" />,
      label: 'Temple Office',
      value: SITE.phone,
      href: SITE.phoneHref,
    },
    {
      icon: <HiOutlinePhone className="h-6 w-6" />,
      label: 'Canteen',
      value: SITE.canteenPhone,
      href: SITE.canteenPhoneHref,
    },
    {
      icon: <HiOutlineEnvelope className="h-6 w-6" />,
      label: UI.contactEmail,
      value: OFFICE_EMAIL,
      href: `mailto:${OFFICE_EMAIL}`,
    },
  ]

  return (
    <StandalonePage crumbs={[{ label: 'Contacts' }]} tint="rgba(201,161,74,0.20)">
      {/* Hero */}
      <section className="relative shell pt-10 pb-10 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Visit Us
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Find your way to the sanctum
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            We would be honoured to welcome you. Reach out for poojas, bookings, or simply to plan
            your visit.
          </p>
        </Reveal>
      </section>

      {/* Contact cards */}
      <section className="relative shell pb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={(i % 4) * 0.05}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex h-full flex-col gap-3 rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-saffron-500/50"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-maroon-900/5 text-saffron-600 transition-colors group-hover:bg-saffron-500/15">
                  {c.icon}
                </span>
                <span className="text-[0.66rem] tracking-[0.16em] text-ink-500 uppercase">
                  {c.label}
                </span>
                <span className="font-display text-[1.02rem] leading-snug text-maroon-900">
                  {c.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Map + hours */}
      <section className="relative shell grid grid-cols-1 gap-6 pb-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <div className="overflow-hidden rounded-3xl border border-maroon-900/10 shadow-soft">
            <iframe
              title="Temple location map"
              src={MAP_SRC}
              className="h-[380px] w-full lg:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <aside className="lg:col-span-4">
          <Reveal>
            <div className="rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft">
              <span className="eyebrow inline-flex items-center gap-2 text-saffron-600">
                <HiOutlineClock className="h-4 w-4" />
                {UI.templeTimings}
              </span>
              <ul className="mt-4 space-y-4">
                {TIMINGS.schedule.map((s) => (
                  <li key={s.day} className="border-b border-maroon-900/5 pb-4 last:border-0">
                    <h4 className="font-display text-sm font-semibold text-maroon-800">{s.day}</h4>
                    <ul className="mt-1.5 space-y-1">
                      {s.sessions.map((t) => (
                        <li key={t} className="flex items-center gap-2.5">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
                          <span className="font-serif text-sm text-ink-700">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.82rem] italic text-ink-500">
                Hours may change during Utsavams (festival celebrations).
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Social href={SITE.social.youtube} label="YouTube">
                  <FaYoutube className="h-5 w-5" />
                </Social>
                <Social href={SITE.social.facebook} label="Facebook">
                  <FaFacebookF className="h-4 w-4" />
                </Social>
                <Social href={SITE.social.whatsapp} label="WhatsApp">
                  <FaWhatsapp className="h-5 w-5" />
                </Social>
              </div>
            </div>
          </Reveal>
        </aside>
      </section>
    </StandalonePage>
  )
}
