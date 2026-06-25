import { useParallax } from '@/hooks/useParallax'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { ABOUT } from '@/data/content'
import { IMAGES } from '@/data/images'

export function About() {
  const imgRef = useParallax<HTMLDivElement>(60)

  return (
    <section id="about" className="relative bg-cream-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-none grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        {/* Image — arch silhouette mask */}
        <div className="relative lg:col-span-5 lg:order-1">
          <div className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[14rem] rounded-b-[2rem] shadow-soft">
            <div ref={imgRef} className="absolute inset-0 scale-110">
              <Img src={IMAGES.about} alt={IMAGES.aboutAlt} zoom className="h-full w-full" />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 rounded-t-[14rem] rounded-b-[2rem] ring-1 ring-inset ring-maroon-900/10"
            />
          </div>
          {/* floating gold seal */}
          <Reveal
            delay={0.2}
            className="absolute -bottom-6 -left-2 grid h-28 w-28 place-items-center rounded-full bg-maroon-900 text-center sm:left-6"
          >
            <span className="font-display text-gold-300">
              <span className="block text-2xl leading-none">Om</span>
              <span className="mt-1 block text-[0.55rem] tracking-[0.25em] uppercase text-gold-300/70">
                Gam Ganapataye
              </span>
            </span>
          </Reveal>
        </div>

        {/* Text */}
        <div className="lg:col-span-7 lg:order-2">
          <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.title} />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl font-serif text-2xl leading-relaxed text-maroon-800 sm:text-3xl">
              {ABOUT.lead}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-700">
              {ABOUT.body}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-maroon-900/10 pt-8">
            {ABOUT.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div>
                  <div className="font-display text-2xl text-maroon-900 sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs leading-snug tracking-wide text-ink-500 uppercase">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
