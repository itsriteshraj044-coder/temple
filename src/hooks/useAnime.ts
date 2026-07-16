import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { prefersReducedMotion } from '@/lib/gsap'

/**
 * anime.js (v4) magnetic hover. The element eases toward the pointer while
 * hovered and springs back on leave. Great for buttons, cards and 3D-feel
 * chips. Honors prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * strength
      const y = (e.clientY - r.top - r.height / 2) * strength
      animate(el, { translateX: x, translateY: y, duration: 500, ease: 'out(3)' })
    }
    const onLeave = () =>
      animate(el, { translateX: 0, translateY: 0, duration: 700, ease: 'outElastic(1, .5)' })

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}

/**
 * anime.js 3D tilt. Rotates the element in perspective toward the pointer for a
 * tactile, card-lifts-off-the-page feel. Add `style={{ transformStyle:
 * 'preserve-3d' }}` on the parent for children depth.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 10) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      animate(el, {
        rotateY: px * max * 2,
        rotateX: -py * max * 2,
        duration: 400,
        ease: 'out(3)',
      })
    }
    const onLeave = () =>
      animate(el, { rotateX: 0, rotateY: 0, duration: 800, ease: 'outElastic(1, .4)' })

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])

  return ref
}

/**
 * anime.js letter cascade. Splits the target's text into per-letter spans and
 * floats them up with a stagger once mounted — a premium page-title entrance.
 */
export function useLetters<T extends HTMLElement = HTMLHeadingElement>(delay = 150) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const text = el.textContent ?? ''
    // Main headings render in Title Case ("capitalize" — first letter of every
    // word). Applied here since this hook is used only on page main headings.
    el.classList.add('capitalize')
    if (prefersReducedMotion()) return

    el.setAttribute('aria-label', text)
    el.innerHTML = text
      .split('')
      .map((ch) =>
        ch === ' '
          ? '<span style="display:inline-block">&nbsp;</span>'
          : `<span class="anime-letter" aria-hidden="true" style="display:inline-block;will-change:transform,opacity">${ch}</span>`,
      )
      .join('')

    animate(el.querySelectorAll('.anime-letter'), {
      translateY: ['0.7em', '0em'],
      opacity: [0, 1],
      rotateZ: [6, 0],
      duration: 900,
      delay: stagger(38, { start: delay }),
      ease: 'out(4)',
    })
  }, [delay])

  return ref
}

/**
 * anime.js number counter — rolls a numeric value up to `to` when it scrolls
 * into view. Returns a ref for the element whose textContent gets updated.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  to: number,
  { duration = 1600, suffix = '', prefix = '' }: { duration?: number; suffix?: string; prefix?: string } = {},
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${to}${suffix}`
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const obj = { v: 0 }
        animate(obj, {
          v: to,
          duration,
          ease: 'out(3)',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`
          },
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration, suffix, prefix])

  return ref
}
