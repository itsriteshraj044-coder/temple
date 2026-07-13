import { HiOutlineUserGroup, HiOutlineHeart, HiArrowUpRight } from 'react-icons/hi2'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { IMAGES } from '@/data/images'
import { useContent, useLang } from '@/i18n/lang'

export function Join() {
  const { JOIN, UI } = useContent()
  const { lang } = useLang()
  const cards = [
    {
      icon: HiOutlineUserGroup,
      title: UI.membershipTitle,
      body: UI.membershipBody,
      cta: JOIN.membershipCta,
    },
    {
      icon: HiOutlineHeart,
      title: UI.volunteerTitle,
      body: UI.volunteerBody,
      cta: JOIN.volunteerCta,
    },
  ]

  return (
    <section id="join" className="relative bg-cream-50 py-24 sm:py-32 lg:py-40">
      <span id="community" className="absolute -top-24" aria-hidden />
      <div className="shell grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow={JOIN.eyebrow}
            title={JOIN.title}
            titleStyle={{ color: '#8a2526' }}
            titleClassName={
              lang === 'ta'
                ? 'font-display text-4xl leading-tight sm:text-5xl lg:text-6xl'
                : 'text-display'
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed" style={{ color: '#8a2526' }}>
              {JOIN.body}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={0.1 + i * 0.1}>
                <div className="group flex h-full flex-col rounded-[1.5rem] bg-cream-100 p-7 transition-colors duration-500 hover:bg-cream-200">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#8a2526] text-gold-300">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-maroon-900">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{c.body}</p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-saffron-600 transition-colors hover:text-maroon-900"
                  >
                    {c.cta}
                    <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="group relative aspect-[3/2] w-full overflow-hidden rounded-[2.5rem] shadow-soft">
            <Img src={IMAGES.join} alt={IMAGES.joinAlt} zoom className="absolute inset-0 h-full w-full" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-maroon-950/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
