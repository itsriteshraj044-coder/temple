import { HiArrowUpRight } from 'react-icons/hi2'
import { useParallax } from '@/hooks/useParallax'
import { useTextReveal } from '@/hooks/useTextReveal'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { IMAGES } from '@/data/images'
import { useContent } from '@/i18n/lang'

export function Donate() {
  const { DONATE } = useContent()
  const bg = useParallax<HTMLDivElement>(60)
  const title = useTextReveal<HTMLHeadingElement>({ stagger: 0.05 })

  return (
    <section id="donate" className="relative flex min-h-[80svh] items-center overflow-hidden bg-maroon-950 text-cream-50">
      <div ref={bg} className="absolute inset-0 scale-110">
        <Img src={IMAGES.donate} alt={IMAGES.donateAlt} className="h-full w-full" imgClassName="object-center" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-maroon-950 via-maroon-950/80 to-maroon-950/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-maroon-950 to-transparent" />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="relative z-10 shell py-28">
        <div className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-3 text-gold-300">
            <span className="h-px w-8 bg-gold-300/60" />
            {DONATE.eyebrow}
          </span>
          <h2 ref={title} className="mt-6 text-display text-cream-50">
            {DONATE.title}
          </h2>
          <Reveal delay={0.1}>
            <p className="text-lead mt-7 max-w-xl font-serif leading-relaxed text-cream-100/85">
              {DONATE.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <Button href="#donate" variant="solid" icon={<HiArrowUpRight />} className="ring-1 ring-gold-400/40">
                {DONATE.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
