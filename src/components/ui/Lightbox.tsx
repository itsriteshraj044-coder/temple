import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { HiChevronLeft, HiChevronRight, HiXMark } from 'react-icons/hi2'

export interface Photo {
  src: string
  alt: string
}

interface LightboxProps {
  photos: Photo[]
  /** index to open on; null = closed */
  index: number | null
  title?: string
  onClose: () => void
  onIndexChange: (i: number) => void
}

/**
 * Full-screen popup slider for a photo album. Keyboard (←/→/Esc), swipe,
 * backdrop-click to close, a live counter and a thumbnail rail. Rendered into
 * a portal so it escapes any transformed/clipped ancestor.
 */
export function Lightbox({ photos, index, title, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null
  const total = photos.length

  const go = useCallback(
    (dir: number) => {
      if (index === null) return
      onIndexChange((index + dir + total) % total)
    },
    [index, total, onIndexChange],
  )

  // Keyboard controls + body scroll-lock while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, go, onClose])

  return createPortal(
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-maroon-950/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title} gallery` : 'Photo gallery'}
        >
          {/* top bar */}
          <div
            className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              {title && (
                <div className="truncate font-display text-lg text-cream-50 sm:text-xl">
                  {title}
                </div>
              )}
              <div className="text-xs tracking-[0.25em] text-cream-50/60 uppercase">
                {index + 1} / {total}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-cream-50/80 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
            >
              <HiXMark className="h-6 w-6" />
            </button>
          </div>

          {/* stage */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 text-cream-50 backdrop-blur transition-colors hover:bg-cream-50/20 sm:left-5"
            >
              <HiChevronLeft className="h-7 w-7" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={index}
                src={photos[index].src}
                alt={photos[index].alt}
                className="max-h-full max-w-full cursor-grab rounded-lg object-contain shadow-2xl active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1)
                  else if (info.offset.x > 80) go(-1)
                }}
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 text-cream-50 backdrop-blur transition-colors hover:bg-cream-50/20 sm:right-5"
            >
              <HiChevronRight className="h-7 w-7" />
            </button>
          </div>

          {/* caption */}
          <div
            className="px-5 pb-2 text-center font-serif text-sm text-cream-50/70 sm:text-base"
            onClick={(e) => e.stopPropagation()}
          >
            {photos[index].alt}
          </div>

          {/* thumbnail rail */}
          <div
            className="flex gap-2 overflow-x-auto px-5 py-4 sm:px-8 [scrollbar-width:thin]"
            onClick={(e) => e.stopPropagation()}
          >
            {photos.map((p, i) => (
              <button
                type="button"
                key={p.src}
                onClick={() => onIndexChange(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all ${
                  i === index
                    ? 'ring-2 ring-saffron-400'
                    : 'opacity-50 hover:opacity-90'
                }`}
              >
                <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
