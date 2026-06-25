import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import 'swiper/css'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { EVENTS } from '@/data/content'

export function Events() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section id="events" className="relative overflow-hidden bg-maroon-900 py-24 text-cream-50 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(249,173,85,0.3), transparent 65%)' }}
      />

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
        <Swiper
          modules={[FreeMode, Mousewheel, Keyboard]}
          onSwiper={(s) => (swiperRef.current = s)}
          freeMode={{ enabled: true, momentum: true }}
          keyboard={{ enabled: true }}
          grabCursor
          slidesPerView={1.15}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 24 },
            1024: { slidesPerView: 3.1, spaceBetween: 28 },
            1440: { slidesPerView: 3.6, spaceBetween: 32 },
          }}
          className="!px-5 sm:!px-8 lg:!px-12 xl:!px-16 2xl:!px-24 3xl:!px-32 4xl:!px-48"
        >
          {EVENTS.items.map((ev) => (
            <SwiperSlide key={ev.title} className="!h-auto">
              <article className="group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-cream-50/12 bg-gradient-to-b from-maroon-800/60 to-maroon-950/60 p-7 transition-colors duration-500 hover:border-gold-400/50">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-gold-300">{ev.meta}</span>
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-saffron-400 transition-transform duration-500 group-hover:scale-150"
                  />
                </div>
                <div>
                  <div className="font-serif text-lg text-cream-100/70">{ev.date}</div>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-cream-50 sm:text-3xl">
                    {ev.title}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="absolute -bottom-10 -right-6 font-display text-[7rem] leading-none text-cream-50/[0.04] transition-colors duration-500 group-hover:text-gold-400/10"
                >
                  ॐ
                </span>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        <Reveal delay={0.1}>
          <Button href="#events" variant="solid" className="ring-1 ring-gold-400/40">
            View Full E-Calendar
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
