import { type ReactNode } from 'react'
import { HiOutlineHome, HiChevronRight } from 'react-icons/hi2'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { navigate } from '@/lib/router'

interface Crumb {
  label: string
  href?: string
}

/**
 * Thin chrome shared by every standalone header page: solid Navbar, a tinted
 * textured backdrop, a breadcrumb, and the Footer. Deliberately minimal — each
 * page supplies its own distinctive hero and body so no two pages repeat. The
 * `tint` sets the page's radial-glow accent colour and the surface gradient.
 */
export function StandalonePage({
  children,
  crumbs = [],
  tint = 'rgba(201,161,74,0.20)',
  surface = 'from-cream-100 to-cream-50',
}: {
  children: ReactNode
  crumbs?: Crumb[]
  tint?: string
  surface?: string
}) {
  return (
    <>
      <Navbar solid />
      <div className={`relative min-h-screen overflow-hidden bg-gradient-to-b ${surface} text-ink-900`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(55% 40% at 50% -8%, ${tint}, transparent 68%)` }}
        />
        <div aria-hidden className="grain absolute inset-0" />

        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="relative z-10 shell flex items-center gap-1.5 pt-24 text-[0.72rem] text-ink-500 sm:pt-28"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                navigate('/')
              }}
              className="inline-flex items-center gap-1 transition-colors hover:text-maroon-900"
            >
              <HiOutlineHome className="h-3.5 w-3.5" />
              Home
            </a>
            {crumbs.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                <HiChevronRight className="h-3 w-3 opacity-50" />
                {c.href ? (
                  <a
                    href={c.href}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(c.href!)
                    }}
                    className="transition-colors hover:text-maroon-900"
                  >
                    {c.label}
                  </a>
                ) : (
                  <span className="text-maroon-800">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <main className="relative z-10">{children}</main>

        <Footer />
      </div>
    </>
  )
}
