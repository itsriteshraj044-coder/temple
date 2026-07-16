import { motion } from 'motion/react'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters, useMagnetic } from '@/hooks/useAnime'

const OFFICE_BEARERS: { role: string; name: string }[] = [
  { role: 'President', name: 'Ramana Akula' },
  { role: 'Vice President', name: 'Uthayasankar Arunnachalam' },
  { role: 'Secretary', name: 'Kadiresan Ramachandran' },
  { role: 'Assistant Secretary', name: 'Ram Muddam' },
  { role: 'Treasurer', name: 'Shanmugaratnam Pillai' },
  { role: 'Assistant Treasurer', name: 'Gobi Sinnarasoo' },
  { role: 'Editor & Education Affairs', name: 'Sasikanth Yadabettu' },
  { role: 'Cultural & Welfare Secretary', name: 'Bindhu Anantharaman' },
]

const COMMITTEE = [
  'Thevatha Sivathash',
  'Ganesh Guha Ravishankar',
  'Prishnee Venkiah',
  'Kusalavan Sivathash',
  'Sivanathan Thamboo',
  'Ganesan Sambasivam',
  'Ganesh Pillai',
]

function CommitteeChip({ name }: { name: string }) {
  const ref = useMagnetic<HTMLSpanElement>(0.5)
  return (
    <span
      ref={ref}
      className="inline-block rounded-full border border-maroon-900/12 bg-cream-50 px-4 py-2 font-display text-[0.9rem] text-maroon-900 shadow-soft transition-colors hover:border-saffron-500/60"
    >
      {name}
    </span>
  )
}

export function ManagementTeam() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'About Temple', href: '/about-temple' }, { label: 'Management Team' }]}
      tint="rgba(238,123,30,0.16)"
      surface="from-[#fbf3e7] to-cream-50"
    >
      <section className="relative shell pt-10 pb-12 text-center lg:pt-16">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
            Management Committee
            <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
          </span>
        </Reveal>
        <h1
          ref={titleRef}
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] text-maroon-900"
        >
          The management team
        </h1>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink-700">
            The volunteers who keep the lamps lit — office bearers and committee members serving the
            temple and its community, year after year.
          </p>
        </Reveal>
      </section>

      {/* Office bearers */}
      <section className="relative shell pb-14">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OFFICE_BEARERS.map((m, i) => (
            <motion.div
              key={m.role}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-maroon-900/10 bg-cream-50 px-5 py-4 shadow-soft transition-colors hover:border-saffron-500/40"
            >
              <div>
                <span className="text-[0.66rem] tracking-[0.16em] text-saffron-700 uppercase">
                  {m.role}
                </span>
                <p className="font-display text-lg text-maroon-900">{m.name}</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-maroon-900/5 font-display text-sm font-semibold text-saffron-600 transition-colors group-hover:bg-saffron-500/15">
                {m.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Committee members */}
      <section className="relative shell pb-24">
        <Reveal>
          <h2 className="mb-6 text-center font-display text-2xl text-maroon-900 sm:text-3xl">
            Committee members
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-3">
            {COMMITTEE.map((name) => (
              <CommitteeChip key={name} name={name} />
            ))}
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
