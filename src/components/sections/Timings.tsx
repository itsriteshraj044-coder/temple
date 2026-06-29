import { HiOutlineClock } from 'react-icons/hi2'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { TIMINGS } from '@/data/content'

export function Timings() {
  return (
    <section id="timings" className="relative bg-cream-100 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-28 5xl:px-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={TIMINGS.eyebrow} title={TIMINGS.title} />
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-ink-700">
                {TIMINGS.note}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <span className="mt-10 inline-flex items-center gap-3 text-saffron-600">
                <HiOutlineClock className="h-6 w-6" />
                <span className="font-serif text-xl text-maroon-900">Open daily for darshan</span>
              </span>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-[2rem] bg-maroon-900/10 sm:grid-cols-2">
              {TIMINGS.schedule.map((s, i) => (
                <Reveal key={s.day} delay={0.1 + i * 0.1} className="bg-cream-50">
                  <div className="flex h-full flex-col justify-between p-8 sm:p-10">
                    <div>
                      <span className="eyebrow text-saffron-600">{`Session ${i === 0 ? 'I' : 'II'}`}</span>
                      <h3 className="mt-3 font-display text-2xl text-maroon-900 sm:text-3xl">
                        {s.day}
                      </h3>
                    </div>
                    <ul className="mt-8 space-y-4">
                      {s.sessions.map((t) => (
                        <li
                          key={t}
                          className="flex items-center gap-4 border-t border-maroon-900/10 pt-4 first:border-t-0 first:pt-0"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
                          <span className="font-serif text-2xl text-maroon-800 sm:text-3xl">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
