import { useEffect, useState } from 'react'

/**
 * Minimal History-API router with clean paths (no hash). The homepage plus a
 * set of standalone routes are served by index.html; on a static host an SPA
 * fallback (see public/.htaccess / vercel.json) rewrites any deep link back to
 * index.html so these paths resolve on refresh. In-page section links (#about,
 * #events, …) are handled by `scrollToHash` and never touch the pathname.
 *
 * Standalone pages are registered in `src/pages/registry.tsx` keyed by path, so
 * adding a page never requires touching this router or App.
 */

const FLASH_PREFIX = '/flash/'

/** Current pathname with any trailing slash trimmed (root stays '/'). */
export function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

/** The current Flash Story slug (e.g. 'canteen-menu'), or '' when off-route. */
export function getFlashSlug(): string {
  const path = currentPath()
  return path.startsWith(FLASH_PREFIX) ? path.slice(FLASH_PREFIX.length) : ''
}

/** Fired after a programmatic pushState so `usePathname` can re-read the path. */
const NAV_EVENT = 'app:navigate'

/** Reactive current pathname. Re-renders on back/forward and in-app navigation. */
export function usePathname(): string {
  const [path, setPath] = useState<string>(currentPath)

  useEffect(() => {
    const onChange = () => setPath(currentPath())
    window.addEventListener('popstate', onChange)
    window.addEventListener(NAV_EVENT, onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener(NAV_EVENT, onChange)
    }
  }, [])

  return path
}

/**
 * Navigate to an absolute app path (e.g. '/about-temple'). Uses pushState + a
 * custom event so the SPA updates without a full reload.
 */
export function navigate(to: string) {
  const path = to.startsWith('/') ? to : `/${to}`
  if (path === currentPath()) return
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event(NAV_EVENT))
}
