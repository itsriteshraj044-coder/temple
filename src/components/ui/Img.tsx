import { useState, type CSSProperties } from 'react'
import { IMAGES } from '@/data/images'

interface ImgProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** subtle hover zoom */
  zoom?: boolean
  priority?: boolean
  /** object-fit mode — defaults to cover */
  fit?: 'cover' | 'contain'
  style?: CSSProperties
}

/**
 * Lazy, accessible image with a graceful cream→gold shimmer placeholder and an
 * automatic fallback to the bundled temple SVG if the source fails to load.
 * Wrap-and-overflow makes hover zoom + parallax crops trivial.
 */
export function Img({
  src,
  alt,
  className = '',
  imgClassName = '',
  zoom = false,
  priority = false,
  fit = 'cover',
  style,
}: ImgProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-cream-200 ${className}`} style={style}>
      {!loaded && (
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-cream-200 via-cream-100 to-cream-300"
        />
      )}
      <img
        src={failed ? IMAGES.fallback : src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) setFailed(true)
          setLoaded(true)
        }}
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${zoom ? 'group-hover:scale-[1.06]' : ''} ${imgClassName}`}
      />
    </div>
  )
}
