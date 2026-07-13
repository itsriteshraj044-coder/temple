import type { CSSProperties } from 'react'
import { useTextReveal } from '@/hooks/useTextReveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  titleClassName?: string
  titleStyle?: CSSProperties
}

/**
 * Eyebrow + masked text-reveal heading used across sections for a consistent
 * editorial rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  light = false,
  className = '',
  titleClassName = 'text-display',
  titleStyle,
}: SectionHeadingProps) {
  const titleRef = useTextReveal<HTMLHeadingElement>()
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'

  return (
    <div className={`flex max-w-3xl flex-col ${alignCls} ${className}`}>
      <span
        className={`eyebrow mb-5 inline-flex items-center gap-3 ${
          light ? 'text-gold-300' : 'text-saffron-600'
        }`}
      >
        <span
          aria-hidden
          className={`h-px w-8 ${light ? 'bg-gold-300/60' : 'bg-saffron-500/60'}`}
        />
        {eyebrow}
      </span>
      <h2
        ref={titleRef}
        style={titleStyle}
        className={`${titleClassName} ${light ? 'text-cream-50' : 'text-maroon-900'}`}
      >
        {title}
      </h2>
    </div>
  )
}
