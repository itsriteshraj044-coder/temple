import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import 'swiper/css'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { EVENTS } from '@/data/content'

// Duration of one slide advance in the continuous marquee (ms).
const MARQUEE_MS = 6000

export function Events() {
  const swiperRef = useRef<SwiperType | null>(null)
  const reduceMotion = useReducedMotion()
  const hovering = useRef(false)
  const resumeTimer = useRef<number | null>(null)
  // The live position the marquee was frozen at, plus the slide it was gliding
  // toward — used to resume at the exact same velocity.
  const frozenAt = useRef<{ target: number; live: number } | null>(null)

  // Hover → halt the marquee instantly by snapping the wrapper transition to
  // 0ms at its exact live position (the in-flight glide would otherwise keep
  // drifting). Clearing `animating` keeps the next transition clean.
  const freeze = () => {
    const s = swiperRef.current
    if (!s || reduceMotion) return
    hovering.current = true
    if (resumeTimer.current !== null) {
      clearTimeout(resumeTimer.current)
      resumeTimer.current = null
    }
    s.autoplay?.stop()
    const live = s.getTranslate()
    frozenAt.current = { target: s.translate, live }
    s.translateTo(live, 0, false)
    s.animating = false
  }

  const startLoop = () => {
    resumeTimer.current = null
    if (hovering.current) return
    swiperRef.current?.autoplay?.start()
  }

  // Leave → finish the slide that was mid-glide at the *same* marquee velocity
  // (proportional speed for the remaining distance), then hand back to autoplay
  // so it picks up seamlessly with no lag or jump.
  const resume = () => {
    const s = swiperRef.current
    if (!s || reduceMotion) return
    hovering.current = false
    const info = frozenAt.current
    frozenAt.current = null
    if (!info) {
      s.autoplay?.start()
      return
    }
    const snap = s.snapGrid
    const step =
      snap && snap.length > 1
        ? Math.abs(snap[1] - snap[0])
        : (s.slidesSizesGrid?.[0] ?? 0) + (Number(s.params.spaceBetween) || 0)
    const remaining = Math.abs(info.target - info.live)
    const firstSpeed = step > 0 ? Math.min(MARQUEE_MS, Math.round((MARQUEE_MS * remaining) / step)) : 0
    if (firstSpeed < 60) {
      s.autoplay?.start()
      return
    }
    s.slideTo(s.activeIndex, firstSpeed, false)
    resumeTimer.current = window.setTimeout(startLoop, firstSpeed)
  }

  useEffect(
    () => () => {
      if (resumeTimer.current !== null) clearTimeout(resumeTimer.current)
    },
    [],
  )

  return (
    <section id="events" className="relative overflow-hidden bg-maroon-900 py-24 text-cream-50 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(249,173,85,0.3), transparent 65%)' }}
      />

      {/* Large sacred Om watermark anchored in the top-right corner. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-4 top-6 select-none font-display leading-[1.1] text-cream-50/[0.05] text-[9rem] sm:right-8 sm:top-8 sm:text-[13rem] lg:text-[17rem]"
        style={{ textShadow: '0 24px 50px rgba(0,0,0,0.25)' }}
        animate={reduceMotion ? undefined : { y: [0, -14, 0], scale: [1, 1.04, 1], opacity: [0.75, 1, 0.75] }}
        transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        ॐ
      </motion.span>

      <div className="relative mx-auto max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={EVENTS.eyebrow} title={EVENTS.title} light />
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous events"
              onClick={() => swiperRef.current?.slidePrev()}
              className="grid h-12 w-12 place-items-center rounded-full border border-cream-50/25 text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <HiArrowLongLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next events"
              onClick={() => swiperRef.current?.slideNext()}
              className="grid h-12 w-12 place-items-center rounded-full border border-cream-50/25 text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <HiArrowLongRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <Reveal delay={0.1} className="relative mt-14">
       <div onMouseEnter={freeze} onMouseLeave={resume}>
        <Swiper
          modules={[FreeMode, Mousewheel, Keyboard, Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          freeMode={{ enabled: true, momentum: true }}
          keyboard={{ enabled: true }}
          loop
          speed={reduceMotion ? 400 : MARQUEE_MS}
          autoplay={reduceMotion ? false : { delay: 0, disableOnInteraction: false }}
          grabCursor
          slidesPerView={1.15}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 24 },
            1024: { slidesPerView: 3.1, spaceBetween: 28 },
            1440: { slidesPerView: 3.6, spaceBetween: 32 },
          }}
          className="events-marquee !px-5 sm:!px-8 lg:!px-12 xl:!px-16 2xl:!px-24 3xl:!px-32 4xl:!px-48"
        >
          {EVENTS.items.map((ev) => (
            <SwiperSlide key={`${ev.title}-${ev.start}`} className="!h-auto">
              <article className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] border border-cream-50/12 bg-gradient-to-b from-maroon-800/60 to-maroon-950/60 transition-colors duration-500 hover:border-gold-400/50">
                <div className="relative aspect-square overflow-hidden bg-maroon-950">
                  <Img src={ev.img} alt={ev.title} fit="contain" zoom className="h-full w-full" />
                  <span className="absolute right-3 top-3 rounded-full bg-maroon-950/65 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm">
                    {ev.category}
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 font-serif text-base text-cream-100/70">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-saffron-400 transition-transform duration-500 group-hover:scale-150"
                    />
                    {ev.date}
                  </div>
                  <h3 className="mt-1 font-display text-2xl leading-tight text-cream-50 sm:text-[1.65rem]">
                    {ev.title}
                  </h3>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-9 -right-5 font-display text-[6rem] leading-none text-cream-50/[0.04] transition-colors duration-500 group-hover:text-gold-400/10"
                  >
                    ॐ
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
       </div>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        <Reveal delay={0.1}>
          <Button href="#/e-calendar" variant="solid" className="ring-1 ring-gold-400/40">
            {EVENTS.calendarCta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
