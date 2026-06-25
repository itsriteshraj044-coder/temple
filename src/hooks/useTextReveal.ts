import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Word-by-word masked text reveal. Wraps each word in a clipped span and
 * animates it up into view on scroll. Returns a ref for the text container.
 */
export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
  options: { start?: string; stagger?: number; delay?: number } = {},
) {
  const ref = useRef<T>(null)
  const { start = 'top 88%', stagger = 0.06, delay = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    // Split into words, preserving existing markup-free text.
    const original = el.innerHTML
    const words = el.textContent?.split(/(\s+)/) ?? []
    el.innerHTML = words
      .map((w) =>
        /\s+/.test(w)
          ? w
          : `<span class="reveal-word" style="display:inline-block;overflow:hidden;vertical-align:top"><span style="display:inline-block">${w}</span></span>`,
      )
      .join('')

    const inners = el.querySelectorAll<HTMLElement>('.reveal-word > span')

    const ctx = gsap.context(() => {
      gsap.from(inners, {
        yPercent: 115,
        duration: 0.9,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)

    return () => {
      ctx.revert()
      el.innerHTML = original
    }
  }, [start, stagger, delay])

  return ref
}
