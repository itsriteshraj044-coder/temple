import { useEffect, useState } from 'react'

/**
 * Minimal hash-based router. The site is a single homepage plus one standalone
 * route — the full E-Calendar — so a tiny `hashchange` listener is all we need,
 * with no extra dependency. In-page anchor links (`#about`, `#events`, …) are
 * handled by `scrollToHash` and never set `window.location.hash`, so they don't
 * collide with these route hashes (which all begin with `#/`).
 */
export type Route = 'home' | 'e-calendar' | 'flash' | 'daily-pooja' | 'canteen-menu'

const FLASH_PREFIX = '#/flash/'

export function parseRoute(): Route {
  // Normalise: drop any trailing slash and query/extra so '#/daily-pooja/' and
  // '#/daily-pooja' resolve the same, and stray characters don't break routing.
  const hash = window.location.hash.replace(/\/+$/, '')
  if (hash === '#/e-calendar') return 'e-calendar'
  if (hash === '#/daily-pooja') return 'daily-pooja'
  if (hash === '#/canteen-menu') return 'canteen-menu'
  if (hash.startsWith(FLASH_PREFIX)) return 'flash'
  return 'home'
}

/** The current Flash Story slug (e.g. 'canteen-menu'), or '' when off-route. */
export function getFlashSlug(): string {
  const hash = window.location.hash
  return hash.startsWith(FLASH_PREFIX) ? hash.slice(FLASH_PREFIX.length) : ''
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute)

  useEffect(() => {
    const onChange = () => setRoute(parseRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export function navigate(route: Route) {
  window.location.hash = route === 'e-calendar' ? '/e-calendar' : ''
}
