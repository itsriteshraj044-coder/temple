import { Reveal } from '@/components/ui/Reveal'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Img } from '@/components/ui/Img'
import { useLetters } from '@/hooks/useAnime'
import { useParallax } from '@/hooks/useParallax'

const IMG = {
  b: '/images/granite-shrine.webp',
  c: '/images/web/services/pooja.webp',
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useParallax<HTMLDivElement>(60)
  return (
    <div className="relative my-12 overflow-hidden rounded-3xl border border-maroon-900/10 shadow-soft">
      <div ref={ref} className="scale-110">
        <Img src={src} alt={alt} className="aspect-[16/10] w-full" />
      </div>
    </div>
  )
}

export function GraniteShrine() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[
        { label: 'About Temple', href: '/about-temple' },
        { label: 'The First Granite Temple' },
      ]}
      tint="rgba(120,120,120,0.14)"
      surface="from-[#f3efe8] to-cream-50"
    >
      {/* Masthead */}
      <section className="relative shell pt-10 pb-6 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            A Long Read
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[1.04] text-maroon-900"
        >
          The Southern Hemisphere’s first granite shrine
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-lg italic text-ink-600">
            The experience of building this divine temple — in the words of its Sthapati,
            Purushothaman Jayaraman.
          </p>
        </Reveal>
      </section>

      {/* Article body */}
      <article className="relative shell max-w-2xl pb-24 lg:mx-auto">
        <Reveal>
          <p className="font-serif text-[1.08rem] leading-[1.85] text-ink-800 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-maroon-900">
            As ancient as Hinduism is the art of temple building. One thousand three hundred years
            ago, the South Indian Pallava kings promoted building temples of granite. The Cholas and
            Vijayanagaras who came after built upon that expertise, and the art reached its pinnacle —
            one need look no further than the architectural marvel of the grand Bṛhadeeswarar temple
            in Thanjavur.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-6 font-serif text-[1.08rem] leading-[1.85] text-ink-800">
            Granite is an age-defying stone endowed with unique strength — which is why our ancestors
            chose it for the House of Gods. Following the tradition of the Pallavas, Cholas and
            Vijayanagaras, the Melbourne Vinayagar Hindu Sangam resolved to transform their temple
            into granite. The one blessed to be chosen was the Sthapati, Mr Purushothaman, who had
            built the temple’s first abode in 1992 and was now recalled a third time by Vinayagar.
          </p>
        </Reveal>

        <Reveal>
          <blockquote className="my-10 border-l-4 border-saffron-500 pl-6 font-display text-2xl leading-snug text-maroon-900">
            “This is not a temple building contract that I am fulfilling — I am blessed to dedicate my
            knowledge, skill and time at the lotus feet of Vakrathunda Vinayagar.”
          </blockquote>
        </Reveal>

        <ParallaxImage src={IMG.b} alt="The granite Vimaanam of the temple under construction" />

        <Reveal>
          <p className="font-serif text-[1.08rem] leading-[1.85] text-ink-800">
            He left for India in November 2018 and spent a year immersed in the mission — completing
            in twelve months what would normally take five. The Moolasthaanam alone required over 270
            tons of granite. Following the great tradition, Purushothaman wished for all the stone to
            be carved from a single mountain, and found it at Raasipuram in Naamakkal — the land of
            the gigantic Hanuman.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-6 font-serif text-[1.08rem] leading-[1.85] text-ink-800">
            A sample was sent to IIT Madras and certified safe against earthquakes. Sixty traditional
            temple sculptors worked tirelessly at Mamallapuram, and ten shipments of cut-and-carved
            granite shrines arrived in Melbourne. On the Mohs scale of hardness, our shilpis chose
            granite — a hardness of 8 — even though it is extraordinarily difficult to chisel. It is
            the ideal stone to absorb the divine vibrations of mantras from air and water.
          </p>
        </Reveal>

        <Reveal>
          <blockquote className="my-10 border-l-4 border-saffron-500 pl-6 font-display text-2xl leading-snug text-maroon-900">
            “The sthapati creates musical compositions, which transform into the temple.”
          </blockquote>
        </Reveal>

        <ParallaxImage src={IMG.c} alt="Hand-carved granite detail of the temple shrines" />

        <Reveal>
          <p className="font-serif text-[1.08rem] leading-[1.85] text-ink-800">
            More than 1,000 pieces of architectural stone were assembled. The Moolasthaanam was built
            in 17 layers using almost 400 stones — many over 400kg, the largest a single six-tonne
            shikhara crowning the Vimaanam. Its interior was shaped into an unusual hexagonal cone to
            amplify the sound of the mantras chanted within.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-6 font-serif text-[1.08rem] leading-[1.85] text-ink-800">
            Purushothaman Jayaraman is an accomplished traditional temple architect from the
            University of Madras, who has designed and built temples across India, Sri Lanka,
            Malaysia, Singapore, the USA and Australia. May Sri Vakrathunda Vinayagar bless us all.
          </p>
        </Reveal>
      </article>
    </StandalonePage>
  )
}
