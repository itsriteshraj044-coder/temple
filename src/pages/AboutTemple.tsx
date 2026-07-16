import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters, useCountUp } from '@/hooks/useAnime'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/** The founding story, sourced from the temple's own "About Temple" history. */
const MILESTONES: { year: string; title: string; body: string }[] = [
  {
    year: 'Aug 1989',
    title: 'A vision takes root',
    body: 'A group of devoted families set out to establish a dedicated Vinayagar temple, and travelled to India to commission the sacred granite murtis.',
  },
  {
    year: 'Nov 1989',
    title: 'Blessed at Kancheepuram',
    body: 'Sri Jeyandra Saraswathi Swamigal blessed the granite statue and facilitated its export. The deities arrived in Melbourne and were first housed at Templestowe.',
  },
  {
    year: 'Jan 1990',
    title: 'The first celebration',
    body: 'Over 700 devotees gathered at Camberwell School Hall for the first public celebration — the community had found its heart.',
  },
  {
    year: 'May 1990',
    title: 'The Sangam is born',
    body: 'The Melbourne Vinayagar Hindu Sangam was officially registered. Five founding trustees each pledged $20,000 to raise the temple.',
  },
  {
    year: 'Apr 1990',
    title: 'Land at The Basin',
    body: 'The Sangam purchased land at The Basin — formerly St. Mary’s Anglican Church — the ground on which the shrine stands today.',
  },
  {
    year: '1991–1992',
    title: 'Stone upon stone',
    body: 'Foundation stones were laid in 1991. Architect J. Purushothaman and five sthapathis from Mahabalipuram arrived to carve the granite sanctum by hand.',
  },
  {
    year: 'Oct 1992',
    title: 'Consecration',
    body: 'The temple was consecrated on 11 October 1992, followed by 41 days of Mandalabhishegam — the deities awakened in their new home.',
  },
  {
    year: 'Jun 2007',
    title: 'The Rajagopuram rises',
    body: 'A grand Kumbabhishegam re-consecrated the temple, crowned by a three-storey granite Rajagopuram — the first of its kind in the southern hemisphere.',
  },
  {
    year: 'Apr 2008',
    title: 'The chariot through Melbourne',
    body: 'The first annual Mahotsavam was held. The temple became the first — and still the only — to take the ceremonial chariot through the streets of Melbourne.',
  },
  {
    year: 'Apr 2012',
    title: 'A hall for the community',
    body: 'The Melbourne Vinayagar Cultural Hall opened its doors, and the temple achieved debt-free status — free to serve for generations to come.',
  },
]

const STATS = [
  { to: 1992, label: 'Consecrated', prefix: '', suffix: '' },
  { to: 700, label: 'At the first celebration', prefix: '', suffix: '+' },
  { to: 41, label: 'Days of Mandalabhishegam', prefix: '', suffix: '' },
  { to: 3, label: 'Storey granite Rajagopuram', prefix: '', suffix: '' },
]

function Stat({ to, label, prefix, suffix }: (typeof STATS)[number]) {
  const ref = useCountUp<HTMLSpanElement>(to, { prefix, suffix })
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block font-display text-4xl font-semibold text-maroon-900 sm:text-5xl"
      >
        {prefix}0{suffix}
      </span>
      <span className="mt-2 block text-[0.72rem] tracking-[0.18em] text-ink-500 uppercase">
        {label}
      </span>
    </div>
  )
}

export function AboutTemple() {
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const lineRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // GSAP: draw the timeline spine as you scroll through the milestones.
  useEffect(() => {
    if (prefersReducedMotion()) {
      if (lineRef.current) lineRef.current.style.transform = 'scaleY(1)'
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        },
      )
    }, trackRef)
    return () => ctx.revert()
  }, [])

  return (
    <StandalonePage crumbs={[{ label: 'About Temple' }]} tint="rgba(201,161,74,0.22)">
      {/* Hero */}
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-16 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
              About the Temple
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-maroon-900"
          >
            A granite shrine raised by devotion
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              From a few families in 1989 to a living home of Lord Ganesha and Lord Ayyappa —
              the story of Sri Vakrathunda Vinayagar Temple is one of faith, seva and the
              enduring patience of hand-carved stone.
            </p>
          </Reveal>
        </div>
        <div className="relative h-64 lg:col-span-5 lg:h-96">
          <SacredLamp className="absolute inset-0" />
        </div>
      </section>

      {/* Stats band */}
      <section className="relative shell pb-16">
        <div className="grid grid-cols-2 gap-8 rounded-3xl border border-maroon-900/10 bg-cream-50/70 p-8 shadow-soft backdrop-blur-sm sm:p-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative shell pb-24">
        <Reveal>
          <h2 className="mb-12 text-center font-display text-3xl text-maroon-900 sm:text-4xl">
            The story, year by year
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative mx-auto max-w-3xl">
          {/* spine */}
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-maroon-900/10 sm:left-1/2"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-saffron-500 via-gold-400 to-saffron-600"
            />
          </div>

          <ul className="space-y-10">
            {MILESTONES.map((m, i) => {
              const left = i % 2 === 0
              return (
                <li
                  key={m.year}
                  className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                    left ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'
                  }`}
                >
                  {/* node */}
                  <span
                    aria-hidden
                    className={`absolute top-1.5 grid h-8 w-8 place-items-center rounded-full border border-saffron-500/40 bg-cream-50 shadow-soft ${
                      'left-0 sm:left-auto'
                    } ${left ? 'sm:-right-4' : 'sm:-left-4'}`}
                  >
                    <HiOutlineSparkles className="h-4 w-4 text-saffron-600" />
                  </span>
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-maroon-900/10 bg-cream-50 p-5 shadow-soft transition-colors hover:border-saffron-500/40"
                  >
                    <span className="font-display text-sm font-semibold tracking-wide text-saffron-700">
                      {m.year}
                    </span>
                    <h3 className="mt-1 font-display text-xl text-maroon-900">{m.title}</h3>
                    <p className="mt-2 font-serif text-[0.95rem] leading-relaxed text-ink-700">
                      {m.body}
                    </p>
                  </motion.div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </StandalonePage>
  )
}
