import { HiPhone } from 'react-icons/hi2'
import { useParallax } from '@/hooks/useParallax'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { CANTEEN, SITE } from '@/data/content'
import { IMAGES } from '@/data/images'

export function Canteen() {
  const imgRef = useParallax<HTMLDivElement>(55)

  return (
    <section id="canteen" className="relative bg-cream-50 py-24 sm:py-32 lg:py-40">
      <div className="shell grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Image */}
        <div className="relative">
          <div className="group relative aspect-[5/4] w-full overflow-hidden rounded-[2.5rem] shadow-soft">
            <div ref={imgRef} className="absolute inset-0 scale-110">
              <Img src={IMAGES.canteen} alt={IMAGES.canteenAlt} zoom className="h-full w-full" />
            </div>
          </div>
          <Reveal
            delay={0.15}
            className="absolute -right-3 -top-6 rounded-2xl bg-saffron-500 px-5 py-4 text-maroon-950 shadow-soft sm:right-8"
          >
            <span className="block font-display text-lg leading-none">Prasadam</span>
            <span className="mt-1 block text-[0.62rem] tracking-[0.2em] uppercase">Vegetarian</span>
          </Reveal>
        </div>

        {/* Hours */}
        <div>
          <SectionHeading eyebrow={CANTEEN.eyebrow} title={CANTEEN.title} />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink-700">
              {CANTEEN.body}
            </p>
          </Reveal>

          <ul className="mt-10 space-y-1">
            {CANTEEN.hours.map((h, i) => (
              <Reveal as="li" key={h.day} delay={0.08 * i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-maroon-900/10 py-3.5">
                  <span className="text-sm font-medium tracking-wide text-maroon-900">{h.day}</span>
                  <span className="font-serif text-lg text-ink-700">{h.time}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <a
              href={SITE.canteenPhoneHref}
              className="mt-8 inline-flex items-center gap-3 text-maroon-900 transition-colors hover:text-saffron-600"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-maroon-900 text-gold-300">
                <HiPhone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs tracking-wide text-ink-500 uppercase">
                  {CANTEEN.phoneLabel}
                </span>
                <span className="font-serif text-xl">{SITE.canteenPhone}</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
