import { motion } from 'motion/react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { SERVICES } from '@/data/content'

export function Services() {
  return (
    <section id="services" className="relative bg-cream-100 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow={SERVICES.eyebrow}
            title={SERVICES.title}
            className="lg:col-span-8"
          />
          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="text-[1.05rem] leading-relaxed text-ink-700 lg:text-right">
              Offered with devotion by our priests, in keeping with timeless Agamic tradition.
            </p>
          </Reveal>
        </div>

        {/* Editorial rows */}
        <ul className="mt-16 border-t border-maroon-900/15">
          {SERVICES.items.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-b border-maroon-900/15"
            >
              {/* saffron wash on hover */}
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-saffron-400/15 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />
              <a
                href="#contact"
                className="relative grid grid-cols-[auto_1fr_auto] items-center gap-5 px-1 py-8 transition-[padding] duration-500 group-hover:px-4 sm:gap-10 sm:py-10"
              >
                <span className="font-display text-lg text-saffron-600 sm:text-xl">{s.index}</span>
                <span className="min-w-0">
                  <span className="block font-display text-2xl text-maroon-900 transition-colors duration-300 group-hover:text-maroon-700 sm:text-4xl">
                    {s.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
                    {s.description}
                  </span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-maroon-900/20 text-maroon-900 transition-all duration-300 group-hover:border-saffron-500 group-hover:bg-saffron-500 group-hover:text-maroon-950 sm:h-14 sm:w-14">
                  <HiArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
