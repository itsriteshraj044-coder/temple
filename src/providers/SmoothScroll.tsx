import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * Cinematic smooth scrolling via Lenis, kept in lockstep with GSAP
 * ScrollTrigger. Respects prefers-reduced-motion by skipping smoothing.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // expose for in-page anchor navigation
    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete (window as Window & { __lenis?: Lenis }).__lenis
    }
  }, [])

  return <>{children}</>
}

/** Smoothly scroll to an in-page anchor, falling back to native behaviour. */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  const lenis = (window as Window & { __lenis?: Lenis }).__lenis
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
