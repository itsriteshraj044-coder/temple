import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters, useTilt } from '@/hooks/useAnime'
import { navigate } from '@/lib/router'

const TRUSTEES: { name: string; role: string }[] = [
  { name: 'Mrs. Mani Selvendra', role: 'Chairman' },
  { name: 'Mr. Sivasinthamani Somasundram', role: 'Secretary' },
  { name: 'Dr. Rajendra', role: 'Trustee' },
  { name: 'Mr. Canagalingam Visvalingam', role: 'Trustee' },
  { name: 'Dr. Joy Maheswaran', role: 'Trustee' },
  { name: 'Dr. Vidya Dharshani Pillay', role: 'Trustee' },
]

function initials(name: string) {
  const parts = name.replace(/^(Mr|Mrs|Dr|Ms)\.?\s+/i, '').split(' ')
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')
}

function TrusteeCard({ name, role }: { name: string; role: string }) {
  const ref = useTilt<HTMLDivElement>(8)
  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-maroon-900/10 bg-cream-50 p-8 text-center shadow-soft transition-colors [transform-style:preserve-3d] hover:border-saffron-500/50"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-saffron-400/12 blur-2xl"
        />
        <span className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-maroon-900 to-[#240505] font-display text-3xl text-gold-300 shadow-inner">
          {initials(name)}
        </span>
        <span className="mt-3 inline-block rounded-full bg-saffron-500/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-saffron-700 uppercase">
          {role}
        </span>
        <h3 className="mt-3 font-display text-xl leading-snug text-maroon-900">{name}</h3>
      </div>
    </div>
  )
}

export function Trustees() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Board of Trustees' }]}
      tint="rgba(201,161,74,0.20)"
    >
      <section className="relative shell pt-10 pb-12 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Leadership
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          Board of Trustees
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            The custodians of the temple’s vision — guiding its worship, growth and service to the
            community with devotion and care.
          </p>
        </Reveal>
      </section>

      <section className="relative shell pb-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUSTEES.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.06}>
              <TrusteeCard {...t} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* cross-links */}
      <section className="relative shell pb-24">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-ink-500">Meet the rest of the temple:</span>
            {[
              { label: 'Management Team', href: '/management-team' },
              { label: 'Priests', href: '/priests' },
              { label: 'Temple Staff', href: '/temple-staff' },
            ].map((l) => (
              <button
                key={l.href}
                onClick={() => navigate(l.href)}
                className="rounded-full border border-maroon-900/15 bg-cream-50 px-4 py-2 font-medium text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
              >
                {l.label}
              </button>
            ))}
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
