import { useEffect, useRef } from 'react'
import { HiArrowDown, HiArrowUpRight } from 'react-icons/hi2'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useParallax } from '@/hooks/useParallax'
import { Button } from '@/components/ui/Button'
import { IMAGES } from '@/data/images'
import { SITE } from '@/data/content'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const media = useParallax<HTMLDivElement>(45)
  const ringRef = useRef<HTMLImageElement>(null)
  const emblemRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('[data-hero="eyebrow"]', { y: 24, opacity: 0, duration: 0.9, delay: 0.2 })
        .from(
          '[data-hero="line"]',
          { yPercent: 120, opacity: 0, duration: 1.2, stagger: 0.12 },
          '-=0.5',
        )
        .from('[data-hero="lead"]', { y: 24, opacity: 0, duration: 1 }, '-=0.7')
        .from('[data-hero="cta"]', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
        .from('[data-hero="meta"]', { y: 16, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('[data-hero="halo"]', { scale: 0.6, opacity: 0, duration: 1.2 }, 0.4)
        .from(
          '[data-hero="emblem"]',
          { scale: 0.5, opacity: 0, duration: 1.4, ease: 'expo.out' },
          0.6,
        )
        .from('[data-hero="ring"]', { opacity: 0, scale: 1.15, duration: 1 }, '-=0.9')
        .from('[data-hero="scroll"]', { opacity: 0, duration: 1 }, '-=0.5')

      // Chakara rotates forever; Ayyappa stays stable.
      gsap.to(ringRef.current, { rotation: 360, repeat: -1, ease: 'none', duration: 18 })
      gsap.to('[data-hero="halo"]', {
        opacity: 0.7,
        scale: 1.06,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 3.2,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream-50"
    >
      {/* soft saffron sunlight + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 78% 18%, rgba(249,173,85,0.22), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.18), transparent 65%)' }}
      />
      <div aria-hidden className="grain absolute inset-0" />

      {/* vertical sanskrit side label (decorative) */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 -rotate-180 text-[0.62rem] tracking-[0.5em] text-maroon-900/40 uppercase [writing-mode:vertical-rl] xl:block"
      >
        Om Gam Ganapataye Namaha
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-none grid-cols-1 items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48 lg:pb-24 lg:pt-28">
        {/* ---------- Left: editorial text ---------- */}
        <div className="lg:col-span-6 xl:col-span-7">
          <span
            data-hero="eyebrow"
            className="eyebrow inline-flex items-center gap-3 text-saffron-600"
          >
            <span className="h-px w-10 bg-saffron-500/60" />
            The Basin · Victoria 3154
          </span>

          <h1 className="mt-7 font-display text-maroon-900">
            <span className="block overflow-hidden">
              <span data-hero="line" className="block text-hero font-medium">
                Sri Vakrathunda
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero="line" className="block text-hero font-medium italic text-gilded">
                Vinayagar
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero="line" className="block text-hero font-medium">
                Temple
              </span>
            </span>
          </h1>

          <p
            data-hero="lead"
            className="mt-8 max-w-md font-serif text-xl leading-relaxed text-ink-700 sm:text-2xl"
          >
            {SITE.tagline}. A living sanctuary of devotion, culture and community.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <span data-hero="cta">
              <Button href="#contact" variant="solid" icon={<HiArrowUpRight />}>
                Plan Your Visit
              </Button>
            </span>
            <span data-hero="cta">
              <Button href="#timings" variant="outline">
                Temple Timings
              </Button>
            </span>
          </div>

          {/* meta row */}
          <div
            data-hero="meta"
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-maroon-900/10 pt-6"
          >
            <div>
              <div className="text-[0.62rem] tracking-[0.25em] text-ink-500 uppercase">
                Open Daily
              </div>
              <div className="mt-1 font-serif text-lg text-maroon-900">Darshan &amp; Abishegam</div>
            </div>
            <div className="h-8 w-px bg-maroon-900/10" />
            <a
              href={SITE.phoneHref}
              className="group transition-colors"
              aria-label={`Call the temple at ${SITE.phone}`}
            >
              <div className="text-[0.62rem] tracking-[0.25em] text-ink-500 uppercase">Call</div>
              <div className="mt-1 font-serif text-lg text-maroon-900 group-hover:text-saffron-600">
                {SITE.phone}
              </div>
            </a>
          </div>
        </div>

        {/* ---------- Right: Ayyappa murti over a rotating Chakara ---------- */}
        <div className="relative lg:col-span-6 xl:col-span-5">
          <div
            ref={media}
            className="relative mx-auto grid aspect-square w-full max-w-[22rem] place-items-center sm:max-w-[28rem] lg:max-w-[30rem] 2xl:max-w-[34rem] 3xl:max-w-[40rem]"
          >
            {/* pulsing saffron halo */}
            <div
              aria-hidden
              data-hero="halo"
              className="absolute inset-[3%] rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(249,173,85,0.45), rgba(201,161,74,0.15) 55%, transparent 72%)',
              }}
            />

            {/* Chakara — centered behind, infinite rotation */}
            <img
              ref={ringRef}
              data-hero="ring"
              src={IMAGES.chakara}
              alt={IMAGES.chakaraAlt}
              aria-hidden
              loading="eager"
              decoding="async"
              className="absolute inset-[2%] left-[6%] h-[96%] w-[96%] max-w-none object-contain"
            />

            {/* Ayyappa — centered in front, stable */}
            <img
              ref={emblemRef}
              data-hero="emblem"
              src={IMAGES.ayyappa}
              alt={IMAGES.ayyappaAlt}
              loading="eager"
              decoding="async"
              className="relative h-[104%] w-[104%] max-w-none object-contain drop-shadow-[0_10px_30px_rgba(42,6,6,0.35)]"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        data-hero="scroll"
        aria-label="Scroll to explore"
        className="group absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-maroon-900/70"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-maroon-900/30 pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-saffron-500" />
        </span>
        <HiArrowDown className="h-4 w-4 opacity-60 transition-transform duration-300 group-hover:translate-y-1" />
      </a>
    </section>
  )
}
