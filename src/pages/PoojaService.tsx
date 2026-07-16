import { useMemo, useState } from 'react'
import { HiOutlineMagnifyingGlass, HiOutlinePhone, HiOutlineFire } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { useContent } from '@/i18n/lang'
import { SITE } from '@/data/content'

export function PoojaService() {
  const { POOJA_SERVICE, TIMINGS } = useContent()
  const titleRef = useLetters<HTMLHeadingElement>(200)
  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return POOJA_SERVICE.items
    return POOJA_SERVICE.items.filter((it) => it.name.toLowerCase().includes(q))
  }, [query, POOJA_SERVICE.items])

  return (
    <StandalonePage
      crumbs={[{ label: 'Services', href: '/services' }, { label: 'Pooja Service' }]}
      tint="rgba(238,123,30,0.18)"
      surface="from-[#fbf3e7] to-cream-50"
    >
      <section className="relative shell pt-10 pb-8 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <HiOutlineFire className="h-4 w-4" />
            {POOJA_SERVICE.eyebrow}
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.03] text-maroon-900"
        >
          {POOJA_SERVICE.title}
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            {POOJA_SERVICE.intro}
          </p>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.16}>
          <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-full border border-maroon-900/12 bg-cream-50 px-5 py-3 shadow-soft focus-within:border-saffron-500/60">
            <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search an offering — archanai, homam, abishegam…"
              className="w-full bg-transparent text-sm text-maroon-900 outline-none placeholder:text-ink-400"
            />
          </div>
        </Reveal>
      </section>

      {/* Real temple imagery */}
      <section className="relative shell pb-12">
        <Reveal>
          <Img
            src="/images/web/services/pooja.webp"
            alt="Priests performing pooja and abishegam at the golden Ganesha shrine"
            className="h-56 w-full rounded-3xl border border-maroon-900/10 shadow-soft sm:h-72"
          />
        </Reveal>
      </section>

      {/* Offerings grid */}
      <section className="relative shell pb-16">
        <p className="mb-5 text-center text-sm text-ink-500">
          {items.length} of {POOJA_SERVICE.items.length} offerings
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.name}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.02, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start justify-between gap-3 rounded-2xl border border-maroon-900/10 bg-cream-50 px-4 py-3.5 shadow-soft transition-colors hover:border-saffron-500/40"
            >
              <div className="min-w-0">
                <p className="font-serif text-[1rem] leading-snug text-maroon-900">{it.name}</p>
                {it.note && <p className="mt-0.5 text-[0.78rem] italic text-ink-500">{it.note}</p>}
              </div>
              <span className="shrink-0 font-display text-[0.98rem] font-semibold text-saffron-700">
                {it.price}
              </span>
            </motion.div>
          ))}
        </div>
        {items.length === 0 && (
          <p className="mt-10 text-center font-serif text-ink-500">
            No offering matches “{query}”. Try another word, or call us — we’re happy to help.
          </p>
        )}
      </section>

      {/* Contact strip */}
      <section className="relative shell pb-24">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft sm:flex-row sm:p-7">
            <div>
              <p className="font-display text-lg text-maroon-900">{POOJA_SERVICE.contactLabel}</p>
              <p className="mt-1 text-sm text-ink-500">
                {POOJA_SERVICE.hoursTitle}: {TIMINGS.schedule[0].day} — {TIMINGS.schedule[0].sessions.join(' · ')}
              </p>
            </div>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#8a2526] px-6 py-3 text-sm font-medium text-cream-50 shadow-[0_16px_40px_-16px_rgba(58,10,10,0.7)] transition-colors hover:bg-[#240505]"
            >
              <HiOutlinePhone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
