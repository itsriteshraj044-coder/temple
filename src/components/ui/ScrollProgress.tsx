import { motion, useScroll, useSpring } from 'motion/react'

/** Slim gilded reading-progress bar fixed to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-saffron-500 via-gold-400 to-saffron-500"
    />
  )
}
