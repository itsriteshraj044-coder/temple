import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

type RevealOpts = {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  start?: string
  /** stagger direct children instead of the element itself */
  stagger?: number
  childSelector?: string
}

/**
 * Scroll-triggered reveal. Attach the returned ref to any element.
 * Adds `.reveal-init` semantics in JS so SSR/no-JS still shows content.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: RevealOpts = {}) {
  const ref = useRef<T>(null)
  const {
    y = 30,
    opacity = 0,
    duration = 1,
    delay = 0,
    start = 'top 85%',
    stagger,
    childSelector,
  } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.querySelectorAll(childSelector ?? ':scope > *') : el, {
        clearProps: 'all',
      })
      return
    }

    const targets = stagger
      ? el.querySelectorAll(childSelector ?? ':scope > *')
      : [el]

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity,
        duration,
        delay,
        ease: 'power3.out',
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [y, opacity, duration, delay, start, stagger, childSelector])

  return ref
}
