import { HiOutlineUsers, HiArrowRight } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { useContent } from '@/i18n/lang'
import { navigate } from '@/lib/router'

const PILLARS = [
  { title: 'Festivals & Utsavams', body: 'Mahotsavam, Shasti and the great annual celebrations that bring the whole community together.' },
  { title: 'Cultural Evenings', body: 'Music, dance and cultural programs that keep our heritage alive in Australia.' },
  { title: 'Youth & Learning', body: 'Classes and activities that nurture the next generation of devotees.' },
  { title: 'Seva & Welfare', body: 'Community welfare and service initiatives rooted in compassion.' },
]

export function CommunityEvents() {
  const { EVENTS } = useContent()
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const upcoming = EVENTS.items.slice(0, 6)

  return (
    <StandalonePage
      crumbs={[{ label: 'Events', href: '/events' }, { label: 'Community Events' }]}
      tint="rgba(139,37,38,0.16)"
    >
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-14 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <HiOutlineUsers className="h-4 w-4" />
              Community Events
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.03] text-maroon-900"
          >
            Where the community gathers
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              Beyond daily worship, the temple is the beating heart of community life — festivals,
              culture, learning and seva that bring us together across generations.
            </p>
          </Reveal>
        </div>
        <div className="relative h-56 lg:col-span-5 lg:h-80">
          <SacredLamp tint="#b8863b" className="absolute inset-0" />
        </div>
      </section>

      {/* Pillars */}
      <section className="relative shell pb-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft"
            >
              <span className="font-display text-4xl font-semibold text-saffron-500/25">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-lg text-maroon-900">{p.title}</h3>
              <p className="mt-2 font-serif text-[0.92rem] leading-relaxed text-ink-700">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="relative shell pb-24">
        <div className="mb-6 flex items-end justify-between">
          <Reveal>
            <h2 className="font-display text-2xl text-maroon-900 sm:text-3xl">Coming up</h2>
          </Reveal>
          <Reveal>
            <button
              onClick={() => navigate('/e-calendar')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-saffron-700 hover:text-maroon-900"
            >
              Full calendar <HiArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((it, i) => (
            <motion.button
              key={it.title + it.start}
              onClick={() => navigate('/events')}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-maroon-900/10 bg-cream-50 px-5 py-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-saffron-500/50"
            >
              <div>
                <p className="font-display text-[1rem] leading-snug text-maroon-900">{it.title}</p>
                <p className="mt-1 text-[0.78rem] text-ink-500">{it.date}</p>
              </div>
              <span className="rounded-full bg-saffron-500/10 px-2.5 py-1 text-[0.64rem] font-medium tracking-wide text-saffron-700 uppercase">
                {it.category}
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </StandalonePage>
  )
}
