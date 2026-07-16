import { useState } from 'react'
import { HiOutlineUserPlus, HiOutlineHandRaised, HiArrowRight } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { useContent } from '@/i18n/lang'
import { navigate } from '@/lib/router'

export function JoinUs() {
  const { JOIN, UI } = useContent()
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const [active, setActive] = useState<'member' | 'volunteer' | null>(null)

  const panels = [
    {
      key: 'member' as const,
      icon: <HiOutlineUserPlus className="h-7 w-7" />,
      title: UI.membershipTitle,
      body: UI.membershipBody,
      cta: JOIN.membershipCta,
      href: '/become-a-member',
      grad: 'from-maroon-900 to-[#240505]',
    },
    {
      key: 'volunteer' as const,
      icon: <HiOutlineHandRaised className="h-7 w-7" />,
      title: UI.volunteerTitle,
      body: UI.volunteerBody,
      cta: JOIN.volunteerCta,
      href: '/volunteering',
      grad: 'from-[#a5551f] to-[#6b2f0c]',
    },
  ]

  return (
    <StandalonePage crumbs={[{ label: 'Join Us' }]} tint="rgba(139,37,38,0.18)">
      {/* Hero */}
      <section className="relative shell pt-10 pb-10 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            {JOIN.eyebrow}
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
            {JOIN.body}
          </p>
        </Reveal>
      </section>

      {/* Split panels */}
      <section className="relative shell pb-24">
        <div
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          onMouseLeave={() => setActive(null)}
        >
          {panels.map((p) => {
            const dimmed = active && active !== p.key
            return (
              <motion.button
                key={p.key}
                onMouseEnter={() => setActive(p.key)}
                onClick={() => navigate(p.href)}
                animate={{ scale: active === p.key ? 1.015 : dimmed ? 0.985 : 1, opacity: dimmed ? 0.7 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${p.grad} p-8 text-left text-cream-50 shadow-soft sm:p-10`}
              >
                {/* decorative glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-400/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cream-50/10 text-gold-300 backdrop-blur-sm">
                  {p.icon}
                </span>
                <div>
                  <h2 className="font-display text-3xl text-cream-50 sm:text-4xl">{p.title}</h2>
                  <p className="mt-3 max-w-md font-serif leading-relaxed text-cream-100/80">
                    {p.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-maroon-950 transition-transform group-hover:translate-x-1">
                    {p.cta} <HiArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </section>
    </StandalonePage>
  )
}
