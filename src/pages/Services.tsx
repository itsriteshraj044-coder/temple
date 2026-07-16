import { type ReactNode } from 'react'
import {
  HiOutlineFire,
  HiOutlineHeart,
  HiOutlineUsers,
  HiOutlineSparkles,
  HiOutlineCake,
  HiOutlineTruck,
} from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters, useMagnetic, useTilt } from '@/hooks/useAnime'
import { SITE } from '@/data/content'
import { navigate } from '@/lib/router'

interface Card {
  icon: ReactNode
  title: string
  body: string
  span: string
  href?: string
  meta?: string
}

const CARDS: Card[] = [
  {
    icon: <HiOutlineFire className="h-6 w-6" />,
    title: 'Special Poojas & Functions',
    body: 'Archana, abishegam, homam and life-event rituals performed by our priests with full Agamic tradition — from $6 per lamp to home ceremonies.',
    span: 'sm:col-span-2 sm:row-span-2',
    href: '/pooja-service',
    meta: 'Poojas · Archanai · Abishegam',
  },
  {
    icon: <HiOutlineHeart className="h-6 w-6" />,
    title: 'Wedding Services',
    body: 'Traditional Hindu marriages with full rites — internal temple weddings from $3,100, external services $450–$2,400.',
    span: 'sm:col-span-1',
    href: '/wedding-services',
  },
  {
    icon: <HiOutlineCake className="h-6 w-6" />,
    title: 'Sri Ganesha’s Canteen',
    body: 'Warm, freshly prepared vegetarian prasadam and meals served after darshan.',
    span: 'sm:col-span-1',
    href: '/canteen',
  },
  {
    icon: <HiOutlineTruck className="h-6 w-6" />,
    title: 'Car Park',
    body: 'Ample on-site parking so your visit and festival darshan is effortless.',
    span: 'sm:col-span-1',
  },
  {
    icon: <HiOutlineUsers className="h-6 w-6" />,
    title: 'Social Activities',
    body: 'Cultural evenings, youth programs and community gatherings that keep our traditions alive in Australia.',
    span: 'sm:col-span-1',
    href: '/community-services',
  },
  {
    icon: <HiOutlineSparkles className="h-6 w-6" />,
    title: 'Yearly Pooja Bookings',
    body: 'Reserve recurring annual poojas for your family — check availability and secure your dates.',
    span: 'sm:col-span-2',
    href: '/pooja-bookings',
    meta: 'Plan the year ahead',
  },
]

function TiltCard({ card }: { card: Card }) {
  const ref = useTilt<HTMLDivElement>(9)
  const clickable = Boolean(card.href)
  return (
    <div className={`${card.span} [perspective:1000px]`}>
      <div
        ref={ref}
        onClick={() => card.href && navigate(card.href)}
        role={clickable ? 'link' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (clickable && (e.key === 'Enter' || e.key === ' ')) navigate(card.href!)
        }}
        className={`group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft transition-colors [transform-style:preserve-3d] hover:border-saffron-500/50 ${
          clickable ? 'cursor-pointer' : ''
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-saffron-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-maroon-900/5 text-saffron-600 transition-colors group-hover:bg-saffron-500/15">
            {card.icon}
          </span>
          {card.meta && (
            <span className="text-[0.66rem] tracking-[0.16em] text-ink-400 uppercase">
              {card.meta}
            </span>
          )}
        </div>
        <div className="mt-6">
          <h3 className="font-display text-xl text-maroon-900">{card.title}</h3>
          <p className="mt-2 font-serif text-[0.95rem] leading-relaxed text-ink-700">
            {card.body}
          </p>
          {clickable && (
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-saffron-700 opacity-0 transition-opacity group-hover:opacity-100">
              Explore →
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4)

  return (
    <StandalonePage
      crumbs={[{ label: 'Services' }]}
      tint="rgba(238,123,30,0.18)"
      surface="from-[#fbf3e7] to-cream-50"
    >
      {/* Hero */}
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-14 lg:grid-cols-12 lg:pt-16">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
              Sacred Services & Offerings
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-maroon-900"
          >
            Devotion, offered every way
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              Poojas and abishegams, weddings and homams, the canteen and community life —
              everything the temple offers, performed in keeping with timeless Agamic tradition.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              ref={ctaRef}
              href={SITE.phoneHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              Enquire & book · {SITE.phone}
            </a>
          </Reveal>
        </div>
        <div className="relative order-1 h-56 lg:order-2 lg:col-span-5 lg:h-80">
          <SacredLamp tint="#d98a3a" className="absolute inset-0" />
        </div>
      </section>

      {/* Bento grid */}
      <section className="relative shell pb-24">
        <div className="grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 sm:grid-cols-3">
          {CARDS.map((c) => (
            <TiltCard key={c.title} card={c} />
          ))}
        </div>
      </section>
    </StandalonePage>
  )
}
