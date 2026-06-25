import { motion, useReducedMotion, type Variants } from 'motion/react'
import { type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'span' | 'p'
}

/**
 * Lightweight in-view fade/slide reveal built on Motion. Honors
 * prefers-reduced-motion automatically. Use for small/leaf elements; use the
 * GSAP hooks for scrubbed, parallax, or text-mask effects.
 */
export function Reveal({ children, className = '', delay = 0, y = 24, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </MotionTag>
  )
}
