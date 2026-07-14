import { motion } from 'motion/react'
import { type ReactNode, type MouseEvent } from 'react'
import { scrollToHash } from '@/providers/SmoothScroll'

type Variant = 'solid' | 'outline' | 'ghost'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  icon?: ReactNode
  onClick?: () => void
  ariaLabel?: string
}

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer select-none'

const variants: Record<Variant, string> = {
  solid: 'text-cream-50 bg-maroon-900',
  outline: 'text-maroon-900 border border-maroon-900/30 hover:border-maroon-900/60',
  ghost: 'text-cream-50/90 hover:text-cream-50',
}

/**
 * Premium animated button. A saffron "light" sweeps from the pointer on hover
 * (solid), with a subtle press micro-interaction. Renders as an anchor when
 * `href` is provided and smooth-scrolls in-page hashes.
 */
export function Button({
  children,
  href,
  variant = 'solid',
  className = '',
  icon,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const handleClick = (e: MouseEvent) => {
    // Intercept in-page anchors (#) and internal route paths (/…) so they
    // scroll / route within the SPA instead of triggering a full reload.
    if (href && (href.startsWith('#') || href.startsWith('/'))) {
      e.preventDefault()
      scrollToHash(href)
    }
    onClick?.()
  }

  const inner = (
    <>
      {variant === 'solid' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-t from-saffron-500 to-saffron-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        />
      )}
      {variant === 'outline' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 origin-left scale-x-0 bg-maroon-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      )}
      <span
        className={`relative z-10 flex items-center gap-3 ${
          variant === 'outline' ? 'transition-colors duration-300 group-hover:text-cream-50' : ''
        }`}
      >
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  )

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={cls}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cls}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  )
}
