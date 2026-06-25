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

export default function App() {
  return (
    <SmoothScroll>
      <ScrollProgress />
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
    </SmoothScroll>
  )
}
