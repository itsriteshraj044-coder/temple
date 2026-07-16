import { HiOutlineSparkles, HiArrowUpRight } from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { navigate } from '@/lib/router'

export function Miracles() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Miracles' }]}
      tint="rgba(201,161,74,0.24)"
    >
      {/* Hero with relic */}
      <section className="relative shell pt-10 pb-8 text-center lg:pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-52 w-52 opacity-80">
          <SacredLamp className="h-full w-full" />
        </div>
        <div className="relative pt-40">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <HiOutlineSparkles className="h-4 w-4" />
              Divine Grace
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.05] text-maroon-900"
          >
            Miracles of Sri Vakrathunda Vinayagar
          </h1>
        </div>
      </section>

      {/* Reflection */}
      <section className="relative shell pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <blockquote className="font-display text-2xl leading-relaxed text-maroon-900 sm:text-3xl">
              “As beauty is in the eye of the beholder, so too are the miracles that Ganesha performs
              in the eye of the beneficiary.”
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-serif text-lg leading-relaxed text-ink-700">
              Devotees perceive divine intervention when one wants something desperately, has
              exhausted every avenue humanly possible, and finally seeks the help and blessings of
              Sri Vakrathunda Vinayagar.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 font-serif text-lg leading-relaxed text-ink-700">
              As longtime devotees, we have come to know of many stories of such divine grace — quiet
              answers to prayer, obstacles dissolved, paths opened where none seemed to exist.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Share CTA */}
      <section className="relative shell pb-24">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl border border-saffron-500/25 bg-saffron-500/8 p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl text-maroon-900 sm:text-3xl">
              Has Vinayagar blessed you?
            </h2>
            <p className="max-w-md font-serif text-ink-700">
              We would be honoured to hear your experience. Share your story with our community and
              inspire the faith of others.
            </p>
            <button
              onClick={() => navigate('/contacts')}
              className="inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              Share your experience <HiArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
