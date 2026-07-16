import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'

const CHAPTERS: { id: string; year: string; title: string; body: string[] }[] = [
  {
    id: 'begin',
    year: '1989',
    title: 'How it all began',
    body: [
      'In August 1989, a group of devoted families separated from the Hindu Society of Victoria with a single, shared aspiration — to establish a temple dedicated to Lord Vinayagar in Melbourne.',
      'What they lacked in resources they made up for in faith, and set out to bring the deity from India to a new home in the southern hemisphere.',
    ],
  },
  {
    id: 'india',
    year: '1989–1990',
    title: 'A trip to India — twists and turns',
    body: [
      'The founding committee travelled to India to commission the sacred statues. After delays, they consulted Sri Jeyandra Saraswathi Swamigal at Kancheepuram, who blessed a granite murti and facilitated its export to Australia.',
      'The deities arrived in Melbourne in November 1989. On 1 January 1990, over 700 devotees gathered at Camberwell School Hall for the first public celebration, and the Melbourne Vinayagar Hindu Sangam was registered on 29 May 1990.',
    ],
  },
  {
    id: 'land',
    year: '1990',
    title: 'Land at The Basin',
    body: [
      'The community raised funds through life memberships of $5,000 and ordinary memberships of $1,000, while five founding trustees each pledged $20,000.',
      'By April 1990 the Sangam purchased land at The Basin — formerly occupied by St. Mary’s Anglican Church — the ground on which the temple stands to this day.',
    ],
  },
  {
    id: 'build',
    year: '1991–1992',
    title: 'Raising the temple',
    body: [
      'Foundation stones were laid in November 1991, and building permits followed that December. Indian architect J. Purushothaman arrived in February 1992 with five artisans from Mahabalipuram to oversee the construction.',
      'The consecration ceremony took place on 11 October 1992, followed by 41 days of Mandalabhishegam rituals — the deities were awake in their new abode.',
    ],
  },
  {
    id: 'grow',
    year: '2007–2008',
    title: 'The Rajagopuram & the chariot',
    body: [
      'A grand Kumbabhishegam re-consecrated the temple on 17 June 2007, including a three-storey granite Rajagopuram.',
      'The first annual Mahotsavam festival was held from 18–28 April 2008. The temple became the first — and remains the only — to take the ceremonial chariot through the streets of Melbourne.',
    ],
  },
  {
    id: 'hall',
    year: '2012',
    title: 'A hall for the community',
    body: [
      'The Melbourne Vinayagar Cultural Hall opened on 14 April 2012, after securing $250,000 in government grants.',
      'The temple achieved debt-free status and continues to organise festivals and community services — free to serve for generations to come.',
    ],
  },
]

export function History() {
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const [active, setActive] = useState(CHAPTERS[0].id)
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    Object.values(refs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'A Brief History' }]}
      tint="rgba(201,161,74,0.20)"
    >
      <section className="relative shell pt-10 pb-10 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Our Story
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          A brief history
        </h1>
      </section>

      <section className="relative shell grid grid-cols-1 gap-10 pb-24 lg:grid-cols-12">
        {/* Sticky chapter index */}
        <aside className="hidden lg:col-span-4 lg:block">
          <nav className="sticky top-28 space-y-1">
            {CHAPTERS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => refs.current[c.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors ${
                  active === c.id ? 'bg-cream-50 shadow-soft' : 'hover:bg-cream-50/60'
                }`}
              >
                <span
                  className={`font-display text-sm font-semibold ${
                    active === c.id ? 'text-saffron-600' : 'text-ink-400'
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-[0.95rem] leading-tight ${
                    active === c.id ? 'text-maroon-900' : 'text-ink-500'
                  }`}
                >
                  {c.title}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Chapters */}
        <div className="lg:col-span-8">
          <div className="space-y-14">
            {CHAPTERS.map((c, i) => (
              <motion.section
                key={c.id}
                id={c.id}
                ref={(el) => {
                  refs.current[c.id] = el
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-28"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl font-semibold text-saffron-500/30">
                    0{i + 1}
                  </span>
                  <div>
                    <span className="text-[0.72rem] tracking-[0.18em] text-saffron-700 uppercase">
                      {c.year}
                    </span>
                    <h2 className="font-display text-2xl text-maroon-900 sm:text-3xl">{c.title}</h2>
                  </div>
                </div>
                <div className="mt-4 space-y-4 border-l-2 border-saffron-500/20 pl-6">
                  {c.body.map((p, j) => (
                    <p key={j} className="font-serif text-[1.02rem] leading-relaxed text-ink-700">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </StandalonePage>
  )
}
