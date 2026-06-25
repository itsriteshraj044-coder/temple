import { useParallax } from '@/hooks/useParallax'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
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

      <div className="relative mx-auto grid max-w-none grid-cols-1 items-center gap-14 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:py-44 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow={HISTORY.eyebrow} title={HISTORY.title} light />
          <div className="mt-8 space-y-6">
            {HISTORY.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="max-w-xl text-[1.05rem] leading-relaxed text-cream-100/80">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* timeline accents */}
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
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
        </div>

        <div className="order-1 lg:order-2">
          <div className="group relative ml-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem]">
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
