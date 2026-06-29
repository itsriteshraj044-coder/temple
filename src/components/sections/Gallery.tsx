import { useState } from 'react'
import { motion } from 'motion/react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { Lightbox, type Photo } from '@/components/ui/Lightbox'
import { GALLERY } from '@/data/content'
import { IMAGES } from '@/data/images'

// Editorial, asymmetric layout — the first photo of each album is the hero tile.
const spans = [
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
]

const pad = (n: number) => String(n).padStart(2, '0')

// Build the full album photo list for a section's "View all" slider.
function albumPhotos(section: (typeof IMAGES.gallerySections)[number]): Photo[] {
  const { dir, count } = section.album
  return Array.from({ length: count }, (_, i) => ({
    src: `${dir}/${pad(i + 1)}.jpg`,
    alt: `${section.title} — photo ${i + 1}`,
  }))
}

export function Gallery() {
  // Which section's album is open, and at which photo. null = closed.
  const [open, setOpen] = useState<{ section: number; index: number } | null>(null)

  const activePhotos = open !== null ? albumPhotos(IMAGES.gallerySections[open.section]) : []

  return (
    <section id="gallery" className="relative bg-cream-100 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={GALLERY.eyebrow} title={GALLERY.title} />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[1.05rem] leading-relaxed text-ink-700">{GALLERY.body}</p>
          </Reveal>
        </div>

        {IMAGES.gallerySections.map((section, s) => (
          <div key={section.title} className={s === 0 ? 'mt-16' : 'mt-20'}>
            {/* album heading + View all */}
            <Reveal>
              <div className="flex flex-col gap-4 border-t border-maroon-900/10 pt-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-3xl text-maroon-900 sm:text-4xl">
                    {section.title}
                  </h3>
                  <p className="mt-2 max-w-md font-serif text-lg italic text-ink-600">
                    {section.blurb}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen({ section: s, index: 0 })}
                  className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-maroon-900/30 px-5 py-2.5 text-sm font-medium tracking-wide text-maroon-900 transition-colors hover:border-maroon-900/60 hover:bg-maroon-900 hover:text-cream-50 sm:self-auto"
                  aria-label={`View all ${section.album.count} photos from ${section.title}`}
                >
                  View all {section.album.count}
                  <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </Reveal>

            <div className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-5 xl:auto-rows-[260px] 2xl:auto-rows-[300px] 3xl:auto-rows-[360px]">
              {section.photos.map((g, i) => (
                <motion.figure
                  key={g.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setOpen({ section: s, index: 0 })}
                  className={`group relative cursor-pointer overflow-hidden rounded-[1.5rem] ${spans[i % spans.length]}`}
                >
                  <Img src={g.src} alt={g.alt} zoom className="h-full w-full" />
                  <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-maroon-950/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-serif text-lg text-cream-50">{g.alt}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        photos={activePhotos}
        index={open?.index ?? null}
        title={open !== null ? IMAGES.gallerySections[open.section].title : undefined}
        onClose={() => setOpen(null)}
        onIndexChange={(i) => setOpen((o) => (o ? { ...o, index: i } : o))}
      />
    </section>
  )
}
