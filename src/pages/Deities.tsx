import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'

const DEITIES: { name: string; tag: string; body: string }[] = [
  {
    name: 'Lord Ganesha',
    tag: 'Presiding deity',
    body: 'The first son of Lord Siva and Parvathy — worshipped to remove obstacles and grant wisdom. Depicted with an elephant head, a potbelly, and seated upon his mouse vahanam. He is the heart of the temple.',
  },
  {
    name: 'Lord Siva',
    tag: 'The Supreme',
    body: 'The Supreme God of Saivism and head of the Siva family, enshrined here as Amirthaghateshwarar in the form of the Sivalingam.',
  },
  {
    name: 'Lord Muruga',
    tag: 'Protector of dharma',
    body: 'The second son of Siva and Parvathi and youngest brother of Ganesha — the protector of righteousness who destroys evil, with his consorts Valli and Devasena.',
  },
  {
    name: 'Goddess Durga',
    tag: 'Mother of the universe',
    body: 'The mother of the universe, believed to be the power behind the creation, preservation and destruction of the world.',
  },
  {
    name: 'Lord Vairavar',
    tag: 'Guardian deity',
    body: 'The guardian of the temple and its devotees, with a dog as his chosen vehicle — an emblem of his protective grace.',
  },
  {
    name: 'Sandigeswarar',
    tag: 'The eternal saint',
    body: 'A saint in perpetual meditation, honoured during temple poojas near the shrine of the Divine Mother.',
  },
  {
    name: 'Navagraha',
    tag: 'The nine planets',
    body: 'The nine celestial bodies of Hindu astrology — semi-gods worshipped to receive the blessings of benevolent planetary influence.',
  },
  {
    name: 'Dakshinamurthy',
    tag: 'God of wisdom',
    body: 'An aspect of Shiva as the guru and teacher — worshipped as the god of wisdom and of complete, rewarding meditation.',
  },
  {
    name: 'Lord Hanuman',
    tag: 'The ardent devotee',
    body: 'The ardent devotee of Rama, celebrated in the Ramayana — a presence of strength, service and unwavering devotion.',
  },
]

export function Deities() {
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const [active, setActive] = useState(0)
  const current = DEITIES[active]

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Deities' }]}
      tint="rgba(139,37,38,0.18)"
    >
      {/* Hero */}
      <section className="relative shell pt-10 pb-10 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            The Sanctum
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Deities at the temple
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            Nine sacred presences share this granite home — from Lord Ganesha in the moolasthaanam
            to Hanuman and the Navagraha. Choose a deity to learn more.
          </p>
        </Reveal>
      </section>

      {/* Selector + detail */}
      <section className="relative shell grid grid-cols-1 gap-6 pb-24 lg:grid-cols-12">
        {/* list */}
        <div className="lg:col-span-5">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {DEITIES.map((d, i) => (
              <li key={d.name}>
                <button
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                    active === i
                      ? 'border-saffron-500/60 bg-cream-50 shadow-soft'
                      : 'border-maroon-900/10 bg-cream-50/50 hover:border-saffron-500/40'
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-semibold transition-colors ${
                      active === i ? 'bg-saffron-500 text-cream-50' : 'bg-maroon-900/5 text-saffron-600'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-display text-[0.95rem] leading-tight text-maroon-900">
                    {d.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* detail */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-maroon-900/10 bg-gradient-to-br from-maroon-900 to-[#240505] p-8 text-cream-50 shadow-soft sm:p-10 lg:min-h-[26rem]">
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 opacity-80">
              <SacredLamp className="h-full w-full" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-lg"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-3 py-1 text-[0.7rem] tracking-[0.16em] text-gold-300 uppercase">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  {current.tag}
                </span>
                <h2 className="mt-4 font-display text-4xl text-cream-50 sm:text-5xl">
                  {current.name}
                </h2>
                <p className="mt-5 font-serif text-lg leading-relaxed text-cream-100/85">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </StandalonePage>
  )
}
