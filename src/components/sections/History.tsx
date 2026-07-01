import { HiArrowLongRight } from 'react-icons/hi2'
import { useParallax } from '@/hooks/useParallax'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { scrollToHash } from '@/providers/SmoothScroll'
import { HISTORY } from '@/data/content'
import { IMAGES } from '@/data/images'

export function History() {
  const imgRef = useParallax<HTMLDivElement>(80)

  return (
    <section id="history" className="relative overflow-hidden bg-maroon-950 text-cream-50">
      {/* curved top transition from the cream section above */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-24 bg-cream-50"
        style={{ clipPath: 'ellipse(75% 100% at 50% 0%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(238,123,30,0.25), transparent 65%)' }}
      />

      <div className="relative shell grid grid-cols-1 items-stretch gap-10 py-28 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:py-40 xl:gap-16">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <SectionHeading
            eyebrow={HISTORY.eyebrow}
            title={HISTORY.title}
            light
            titleClassName="text-display whitespace-pre-line leading-[1.5]!"
          />
          <div className="mt-8 space-y-6">
            {HISTORY.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="max-w-xl text-[1.05rem] leading-relaxed text-cream-100/80">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* timeline accents */}
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            {['Aspiration', 'Seva', 'Granite Shrine', 'Consecration'].map((step, i) => (
              <Reveal key={step} delay={0.15 + i * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-gold-400/40 font-display text-sm text-gold-300">
                    {i + 1}
                  </span>
                  <span className="text-sm tracking-wide text-cream-100/70">{step}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* animated Read More button */}
          <Reveal delay={0.3}>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#about')
              }}
              className="group relative mt-12 inline-flex items-center gap-3 self-start overflow-hidden rounded-full border border-gold-400/50 px-7 py-3.5 text-sm font-medium tracking-wide text-gold-300 transition-colors duration-300 hover:text-maroon-950"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gradient-to-r from-gold-300 to-saffron-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <span className="relative z-10 flex items-center gap-3">
                Read More
                <HiArrowLongRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] sm:aspect-[16/11] lg:h-full lg:aspect-auto lg:min-h-[34rem]">
            <div ref={imgRef} className="absolute inset-0 scale-110">
              <Img src={IMAGES.history} alt={IMAGES.historyAlt} zoom className="h-full w-full" />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 to-transparent" />
            <div aria-hidden className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-gold-400/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
