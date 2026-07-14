import { useEffect, useState } from 'react'

/**
 * Minimal History-API router with clean paths (no hash). The homepage plus a
 * handful of standalone routes are served by index.html; on a static host an
 * SPA fallback (see public/.htaccess) rewrites any deep link back to index.html
 * so these paths resolve on refresh. In-page section links (#about, #events, …)
 * are handled by `scrollToHash` and never touch the pathname.
 */
export type Route =
  | 'home'
  | 'e-calendar'
  | 'daily-pooja'
  | 'canteen-menu'
  | 'abishegam'
  | 'festivals'
  | 'flash'

/** Canonical path for each route. */
const PATHS: Record<Exclude<Route, 'flash'>, string> = {
  home: '/',
  'e-calendar': '/e-calendar',
  'daily-pooja': '/daily-pooja',
  'canteen-menu': '/canteen-menu',
  abishegam: '/abishegam',
  festivals: '/festivals',
}

const FLASH_PREFIX = '/flash/'

/** Current pathname with any trailing slash trimmed (root stays '/'). */
function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export function parseRoute(): Route {
  const path = currentPath()
  for (const [route, p] of Object.entries(PATHS)) {
    if (p === path) return route as Route
  }
  if (path.startsWith(FLASH_PREFIX)) return 'flash'
  return 'home'
}

/** The current Flash Story slug (e.g. 'canteen-menu'), or '' when off-route. */
export function getFlashSlug(): string {
  const path = currentPath()
  return path.startsWith(FLASH_PREFIX) ? path.slice(FLASH_PREFIX.length) : ''
}

/** Fired after a programmatic pushState so `useRoute` can re-read the path. */
const NAV_EVENT = 'app:navigate'

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute)

  useEffect(() => {
    const onChange = () => setRoute(parseRoute())
    window.addEventListener('popstate', onChange)
    window.addEventListener(NAV_EVENT, onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener(NAV_EVENT, onChange)
    }
  }, [])

  return route
}

/**
 * Navigate to a route (by name) or an absolute app path (e.g. '/daily-pooja').
 * Uses pushState + a custom event so the SPA updates without a full reload.
 */
export function navigate(to: Route | string) {
  const path = to.startsWith('/') ? to : (PATHS[to as Exclude<Route, 'flash'>] ?? '/')
  if (path === currentPath()) return
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event(NAV_EVENT))
}
