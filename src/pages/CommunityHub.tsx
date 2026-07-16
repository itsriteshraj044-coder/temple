import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { HiArrowRight, HiOutlineBuildingLibrary } from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { navigate } from '@/lib/router'

const FACILITIES = [
  'Hall with skylight & stage',
  'Timber flooring & ornamental lighting',
  'Passenger lift (8 persons)',
  'Shops with glazing',
  'Kitchen & kitchenette',
  'Automated car park',
  'Reception area',
  'Audio-visual & sound',
  'Solar panels',
  'Green wall feature',
  'Landscaping',
  'Complete roofing',
]

const LADDER: { item: string; amount: number }[] = [
  { item: 'Concrete Blocks (5 nos)', amount: 100 },
  { item: 'Wash Hand Basins (each)', amount: 1450 },
  { item: 'Urinals (each)', amount: 2100 },
  { item: 'Mirrors & Accessories', amount: 2500 },
  { item: 'Tapware', amount: 3000 },
  { item: 'Water Closets (each)', amount: 750 },
  { item: 'Toilet Partitions', amount: 8000 },
  { item: 'Landscaping', amount: 8000 },
  { item: 'Car Park Roller Doors', amount: 8500 },
  { item: 'Timber Doors & Hardware', amount: 10000 },
  { item: 'Art Display / Culture', amount: 12000 },
  { item: 'Green Wall', amount: 12000 },
  { item: 'Fans', amount: 15000 },
  { item: 'Lighting Systems', amount: 15000 },
  { item: 'Main Entrance Glass Door', amount: 15000 },
  { item: 'TV & Audio Visual', amount: 15000 },
  { item: 'Shop Signage', amount: 15000 },
  { item: 'Building Signage', amount: 15000 },
  { item: 'Furniture & Equipment', amount: 15000 },
  { item: 'Kitchenette Joinery', amount: 17000 },
  { item: 'Skylight', amount: 17500 },
  { item: 'Car Park Metalwork', amount: 28000 },
  { item: 'Ornamental Lighting', amount: 30000 },
  { item: 'Roller Shutters', amount: 32000 },
  { item: 'Aluminium Windows', amount: 32500 },
  { item: 'Solar Panels', amount: 35000 },
  { item: 'Shop Doors & Glazing', amount: 35000 },
  { item: 'Data Server & Sound', amount: 35000 },
  { item: 'Timber Flooring', amount: 38500 },
  { item: 'Fan Coil Units', amount: 46500 },
  { item: 'Aluminium Doors', amount: 52000 },
  { item: 'Tiling (All Areas)', amount: 65000 },
  { item: 'Dismantable Stage', amount: 65000 },
  { item: 'Passenger Lift', amount: 86000 },
  { item: 'Complete Roofing', amount: 90000 },
]

const FILTERS = [
  { label: 'All', test: () => true },
  { label: 'Under $5k', test: (n: number) => n < 5000 },
  { label: '$5k – $20k', test: (n: number) => n >= 5000 && n < 20000 },
  { label: '$20k+', test: (n: number) => n >= 20000 },
]

const fmt = (n: number) => '$' + n.toLocaleString('en-AU')

export function CommunityHub() {
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const [filter, setFilter] = useState(0)

  const items = useMemo(
    () => [...LADDER].sort((a, b) => a.amount - b.amount).filter((x) => FILTERS[filter].test(x.amount)),
    [filter],
  )

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Community HUB' }]}
      tint="rgba(139,37,38,0.16)"
    >
      {/* Hero */}
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-14 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <HiOutlineBuildingLibrary className="h-4 w-4" />
              MVHS Community HUB
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.03] text-maroon-900"
          >
            Build a home for the community
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              A multifunctional community space rising beside the temple — a hall, shops, kitchen and
              gathering rooms to serve our community for generations. Sponsor a piece of it and leave
              your family’s mark in stone.
            </p>
          </Reveal>
        </div>
        <div className="relative h-56 lg:col-span-5 lg:h-80">
          <SacredLamp tint="#b8863b" className="absolute inset-0" />
        </div>
      </section>

      {/* Facilities */}
      <section className="relative shell pb-16">
        <Reveal>
          <h2 className="mb-6 font-display text-2xl text-maroon-900 sm:text-3xl">
            What the HUB will hold
          </h2>
        </Reveal>
        <div className="flex flex-wrap gap-2.5">
          {FACILITIES.map((f, i) => (
            <Reveal key={f} as="span" delay={(i % 6) * 0.03}>
              <span className="inline-block rounded-full border border-maroon-900/12 bg-cream-50 px-4 py-2 text-sm text-maroon-900 shadow-soft">
                {f}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sponsorship ladder */}
      <section className="relative shell pb-24">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl text-maroon-900 sm:text-3xl">
                Sponsorship ladder
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                {items.length} of {LADDER.length} contributions · from {fmt(100)} to {fmt(90000)}
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f.label}
                onClick={() => setFilter(i)}
                className={`rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors ${
                  filter === i
                    ? 'bg-[#8a2526] text-cream-50'
                    : 'border border-maroon-900/15 bg-cream-50 text-maroon-900 hover:border-saffron-500/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.button
              key={it.item}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.03, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate('/how-to-donate')}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-maroon-900/10 bg-cream-50 px-5 py-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-saffron-500/50"
            >
              <span className="min-w-0">
                <span className="block font-display text-[0.98rem] leading-snug text-maroon-900">
                  {it.item}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-[0.75rem] font-medium text-saffron-700 opacity-0 transition-opacity group-hover:opacity-100">
                  Sponsor this <HiArrowRight className="h-3.5 w-3.5" />
                </span>
              </span>
              <span className="shrink-0 font-display text-lg font-semibold text-saffron-700">
                {fmt(it.amount)}
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </StandalonePage>
  )
}
