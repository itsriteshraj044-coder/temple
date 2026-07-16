import { HiOutlineUserGroup, HiOutlineFire, HiOutlineShieldCheck, HiArrowRight } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { navigate } from '@/lib/router'

const GROUPS = [
  {
    icon: <HiOutlineShieldCheck className="h-7 w-7" />,
    title: 'Board of Trustees',
    body: 'The custodians of the temple’s vision and long-term stewardship.',
    href: '/trustees',
  },
  {
    icon: <HiOutlineUserGroup className="h-7 w-7" />,
    title: 'Management Team',
    body: 'Office bearers and committee members who run the temple day to day.',
    href: '/management-team',
  },
  {
    icon: <HiOutlineFire className="h-7 w-7" />,
    title: 'Priests',
    body: 'The learned priests who perform the daily abishegams and poojas.',
    href: '/priests',
  },
]

export function TempleStaff() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Temple Staff' }]}
      tint="rgba(201,161,74,0.20)"
    >
      <section className="relative shell pt-10 pb-12 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            The People of the Temple
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Hands and hearts in seva
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            From trustees to priests to volunteers, the temple is kept alive by the devotion of many.
            Meet the people who serve.
          </p>
        </Reveal>
      </section>

      <section className="relative shell pb-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {GROUPS.map((g, i) => (
            <motion.button
              key={g.title}
              onClick={() => navigate(g.href)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-start rounded-3xl border border-maroon-900/10 bg-cream-50 p-7 text-left shadow-soft transition-all hover:-translate-y-1 hover:border-saffron-500/50"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-maroon-900/5 text-saffron-600 transition-colors group-hover:bg-saffron-500/15">
                {g.icon}
              </span>
              <h2 className="mt-5 font-display text-xl text-maroon-900">{g.title}</h2>
              <p className="mt-2 font-serif text-[0.95rem] leading-relaxed text-ink-700">{g.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron-700">
                Meet them <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </StandalonePage>
  )
}
