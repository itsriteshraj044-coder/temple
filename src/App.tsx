import { useEffect } from 'react'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
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
import { ECalendar } from '@/components/sections/ECalendar'
import { useRoute } from '@/lib/router'
import type Lenis from 'lenis'

export default function App() {
  const route = useRoute()

  // Reset to the top of the page whenever the route changes.
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [route])

  return (
    <SmoothScroll>
      <ScrollProgress />
      {route === 'e-calendar' ? (
        <ECalendar />
      ) : (
        <>
          <Navbar />
          <main id="top">
            <Hero />
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
