import {
  HiOutlineCake,
  HiOutlineSparkles,
  HiOutlineMusicalNote,
  HiOutlineWrenchScrewdriver,
  HiOutlineAcademicCap,
  HiOutlinePhone,
} from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters, useTilt } from '@/hooks/useAnime'
import { SITE } from '@/data/content'

const AREAS = [
  { icon: <HiOutlineCake className="h-6 w-6" />, title: 'Canteen & Prasadam', body: 'Help prepare and serve warm vegetarian meals after darshan.' },
  { icon: <HiOutlineSparkles className="h-6 w-6" />, title: 'Festivals & Utsavams', body: 'Lend a hand during Mahotsavam, Shasti and the temple’s great festivals.' },
  { icon: <HiOutlineWrenchScrewdriver className="h-6 w-6" />, title: 'Cleaning & Maintenance', body: 'Keep the sacred spaces clean and welcoming for every devotee.' },
  { icon: <HiOutlineMusicalNote className="h-6 w-6" />, title: 'Cultural Programs', body: 'Support music, dance and cultural evenings that keep traditions alive.' },
  { icon: <HiOutlineAcademicCap className="h-6 w-6" />, title: 'Youth & Education', body: 'Mentor young devotees and help run classes and youth activities.' },
  { icon: <HiOutlinePhone className="h-6 w-6" />, title: 'Admin & Outreach', body: 'Assist with the office, communications and community outreach.' },
]

function AreaCard({ icon, title, body }: (typeof AREAS)[number]) {
  const ref = useTilt<HTMLDivElement>(8)
  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        className="group h-full rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft transition-colors [transform-style:preserve-3d] hover:border-saffron-500/50"
      >
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-maroon-900/5 text-saffron-600 transition-colors group-hover:bg-saffron-500/15">
          {icon}
        </span>
        <h3 className="mt-4 font-display text-lg text-maroon-900">{title}</h3>
        <p className="mt-2 font-serif text-[0.92rem] leading-relaxed text-ink-700">{body}</p>
      </div>
    </div>
  )
}

export function Volunteering() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'Join Us', href: '/join-us' }, { label: 'Volunteering' }]}
      tint="rgba(238,123,30,0.16)"
      surface="from-[#fbf3e7] to-cream-50"
    >
      <section className="relative shell pt-10 pb-12 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Volunteering
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Offer your time in seva
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            Every helping hand keeps the temple thriving. Find where your time and talents can serve —
            then register your interest and we’ll be in touch.
          </p>
        </Reveal>
      </section>

      <section className="relative shell pb-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.06}>
              <AreaCard {...a} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative shell pb-24">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl border border-maroon-900/10 bg-gradient-to-br from-maroon-900 to-[#240505] p-8 text-center text-cream-50 shadow-soft sm:p-10">
            <h2 className="font-display text-2xl text-cream-50 sm:text-3xl">Ready to help?</h2>
            <p className="max-w-md font-serif text-cream-100/80">
              Register your details with our temple office and we will contact you with the ways you
              can serve.
            </p>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-maroon-950 transition-transform hover:scale-[1.03]"
            >
              <HiOutlinePhone className="h-4 w-4" /> Register — {SITE.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
