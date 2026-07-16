import { Suspense, useEffect } from 'react'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { BackgroundMusic } from '@/components/ui/BackgroundMusic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { FlashStory } from '@/components/sections/FlashStory'
import { QuickInfo } from '@/components/sections/QuickInfo'
import { About } from '@/components/sections/About'
import { History } from '@/components/sections/History'
import { Services } from '@/components/sections/Services'
import { Canteen } from '@/components/sections/Canteen'
import { Events } from '@/components/sections/Events'
import { Timings } from '@/components/sections/Timings'
import { Donate } from '@/components/sections/Donate'
import { Join } from '@/components/sections/Join'
import { Gallery } from '@/components/sections/Gallery'
import { Contact } from '@/components/sections/Contact'
import { FlashPage } from '@/components/sections/FlashPage'
import { PAGES } from '@/pages/registry'
import { navigate, usePathname } from '@/lib/router'
import type Lenis from 'lenis'

export default function App() {
  const path = usePathname()
  const StandalonePageComponent = PAGES[path]

  // Reset to the top of the page whenever the route changes.
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [path])

  // Intercept clicks on internal route links (href="/…") so navigation happens
  // in-app via the History router instead of triggering a full page reload.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const anchor = (e.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      if (anchor.target && anchor.target !== '_self') return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <SmoothScroll>
      <ScrollProgress />
      <BackgroundMusic />
      {path.startsWith('/flash/') ? (
        <FlashPage />
      ) : StandalonePageComponent ? (
        <Suspense fallback={<div className="min-h-screen bg-cream-50" />}>
          <StandalonePageComponent />
        </Suspense>
      ) : (
        <>
          <Navbar />
          <main id="top">
            <Hero />
            <FlashStory />
            <QuickInfo />
            <About />
            <History />
            <Services />
            <Canteen />
            <Events />
            <Timings />
            <Donate />
            <Join />
            <Gallery />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </SmoothScroll>
  )
}
