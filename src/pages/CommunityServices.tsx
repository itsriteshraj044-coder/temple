import { HiOutlineHeart, HiOutlinePhone, HiOutlineSparkles } from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { SITE } from '@/data/content'

const INCLUDED = [
  'Guidance of an experienced priest',
  'Traditional Hindu rites and rituals',
  'Floral arrangements',
  'All required ritual items',
]

export function CommunityServices() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'Services', href: '/services' }, { label: 'Community Services' }]}
      tint="rgba(139,37,38,0.14)"
    >
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-14 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <HiOutlineHeart className="h-4 w-4" />
              Community Services
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.03] text-maroon-900"
          >
            Beside you in every season
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              As part of its service to the community, Sri Vakrathunda Vinayagar Temple provides a
              funeral service conducted in the Hindu traditional way — with dignity, care and the
              guidance of our priests.
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5">
          <Img
            src="/images/web/services/community.webp"
            alt="Devotees gathered together in the temple hall"
            className="h-56 w-full rounded-3xl border border-maroon-900/10 shadow-soft lg:h-80"
          />
        </Reveal>
      </section>

      <section className="relative shell pb-24">
        <Reveal>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-maroon-900/10 bg-cream-50 p-8 shadow-soft sm:p-10">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-maroon-900/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/10 px-3 py-1 text-[0.68rem] tracking-[0.16em] text-saffron-700 uppercase">
                  <HiOutlineSparkles className="h-3.5 w-3.5" /> Hindu Traditional Rites
                </span>
                <h2 className="mt-3 font-display text-2xl text-maroon-900 sm:text-3xl">
                  Funeral Service
                </h2>
              </div>
              <span className="font-display text-4xl font-semibold text-saffron-700">$1,200</span>
            </div>

            <h3 className="mt-6 font-display text-sm font-semibold tracking-wide text-maroon-800 uppercase">
              What is included
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {INCLUDED.map((it) => (
                <li key={it} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                  <span className="font-serif text-[0.98rem] leading-relaxed text-ink-700">{it}</span>
                </li>
              ))}
            </ul>

            <a
              href={SITE.phoneHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              <HiOutlinePhone className="h-4 w-4" /> Speak with us — {SITE.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
