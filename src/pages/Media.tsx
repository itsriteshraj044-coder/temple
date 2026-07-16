import { FaYoutube, FaFacebookF } from 'react-icons/fa6'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { useLetters, useMagnetic } from '@/hooks/useAnime'
import { IMAGES } from '@/data/images'
import { SITE } from '@/data/content'

function ChannelButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.4)
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2.5 rounded-full border border-maroon-900/15 bg-cream-50 px-5 py-3 text-sm font-medium text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
    >
      {children}
      {label}
    </a>
  )
}

export function Media() {
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const photos: { src: string; alt: string }[] = [
    { src: '/images/IMG_0933.jpg', alt: 'Priests performing a homam ceremony inside the temple' },
    { src: '/images/IMG_0865.jpg', alt: 'A thavil drummer and musicians during a temple ritual' },
    ...IMAGES.gallerySections.flatMap((s) => s.photos.map((p) => ({ src: p.src, alt: p.alt }))),
  ]

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Media' }]}
      tint="rgba(139,37,38,0.16)"
    >
      <section className="relative shell pt-10 pb-10 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Media & Gallery
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Moments of grace
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            Glimpses of worship, festivals and community life at the temple. Follow our channels for
            live streams, recordings and announcements.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ChannelButton href={SITE.social.youtube} label="YouTube">
              <FaYoutube className="h-5 w-5 text-[#ff0000]" />
            </ChannelButton>
            <ChannelButton href={SITE.social.facebook} label="Facebook">
              <FaFacebookF className="h-4 w-4 text-[#1877f2]" />
            </ChannelButton>
          </div>
        </Reveal>
      </section>

      {/* Masonry media wall */}
      <section className="relative shell pb-24">
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-2xl border border-maroon-900/10 shadow-soft break-inside-avoid"
            >
              <Img src={p.src} alt={p.alt} zoom className="w-full" />
            </motion.div>
          ))}
        </div>
      </section>
    </StandalonePage>
  )
}
