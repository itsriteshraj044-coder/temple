import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Vertical parallax tied to scroll. `amount` is the total travel in px across
 * the element's full scroll pass (positive = moves up as you scroll down).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(amount = 80) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount / 10 },
        {
          yPercent: amount / 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [amount])

  return ref
}
