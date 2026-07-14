import { useEffect, useRef, useState } from 'react'
import { useContent } from '@/i18n/lang'

/** Seconds the marquee takes to travel one pass of the item list. Kept constant
 *  per pass so the scroll speed feels the same on every screen width. */
const SECONDS_PER_PASS = 19

/**
 * A "Flash Story" news ticker that sits between the hero and the About section.
 * The scrolling headlines come from the active-language content tree, so the
 * strip reads in Tamil when Tamil is selected. Each headline links to its own
 * page (`#/flash/<slug>`), and items are separated by a small Om symbol.
 *
 * Seamless, gap-free infinite loop:
 *   - We repeat the item list enough times (`reps`, measured from the strip
 *     width) that a single group ALWAYS overflows the visible strip.
 *   - The track renders two identical groups and slides by exactly -50%, so the
 *     duplicate group is already on-screen before the first scrolls away —
 *     there is never an empty gap or a visible restart.
 */
export function FlashStory() {
  const { UI } = useContent()
  const wrapRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLUListElement>(null)
  const [reps, setReps] = useState(1)

  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current
      const group = groupRef.current
      if (!wrap || !group) return
      const unit = group.scrollWidth / reps // width of ONE pass of the items
      if (!unit) return
      // Enough passes to overflow the strip (plus one, for safety).
      const need = Math.max(1, Math.ceil(wrap.clientWidth / unit) + 1)
      if (need !== reps) setReps(need)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
    // Re-measure whenever the pass count or the (language-specific) items change.
  }, [reps, UI.flashItems])

  // One group = the item list repeated `reps` times.
  const group = Array.from({ length: reps }).flatMap(() => UI.flashItems)

  const Om = () => (
    <span aria-hidden className="mx-6 font-display text-base leading-none text-gold-500 sm:mx-7">
      ॐ
    </span>
  )

  return (
    <div className="flash-strip relative z-10 flex items-stretch overflow-hidden border-y border-maroon-900/10 bg-cream-100">
      {/* Fixed label */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 bg-maroon-600 px-4 py-3 text-cream-50 sm:px-6">
        <span className="font-display text-lg leading-none text-gold-300" aria-hidden title="Om">
          ॐ
        </span>
        <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase whitespace-nowrap sm:text-xs">
          {UI.flashLabel}
        </span>
        {/* arrow notch */}
        <span
          aria-hidden
          className="absolute top-0 -right-3 h-full w-3"
          style={{
            background: 'var(--color-maroon-600)',
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
          }}
        />
      </div>

      {/* Scrolling headlines */}
      <div ref={wrapRef} className="relative flex-1 overflow-hidden py-3 pl-6">
        <div
          className="flash-track flex w-max items-center"
          style={{ animationDuration: `${reps * SECONDS_PER_PASS}s` }}
        >
          {/* Two identical groups → translate -50% loops seamlessly. */}
          {[0, 1].map((g) => (
            <ul
              key={g}
              ref={g === 0 ? groupRef : undefined}
              className="flex items-center"
              aria-hidden={g === 1 ? true : undefined}
              aria-label={g === 0 ? UI.flashLabel : undefined}
            >
              {group.map((item, i) => (
                <li key={i} className="flex items-center whitespace-nowrap">
                  <a
                    href={item.href ?? `/flash/${item.slug}`}
                    className="font-serif text-sm text-maroon-900 underline-offset-4 transition-colors hover:text-saffron-600 hover:underline sm:text-[0.95rem]"
                  >
                    {item.label}
                  </a>
                  <Om />
                </li>
              ))}
            </ul>
          ))}
        </div>
        {/* fade the tail into the cream background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12"
          style={{ background: 'linear-gradient(to right, transparent, var(--color-cream-100))' }}
        />
      </div>
    </div>
  )
}
