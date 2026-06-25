import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiArrowUpRight } from 'react-icons/hi2'
import { useTextReveal } from '@/hooks/useTextReveal'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { CONTACT, SITE } from '@/data/content'

export function Contact() {
  const title = useTextReveal<HTMLHeadingElement>()

  const details = [
    { icon: HiOutlineMapPin, label: 'Address', value: SITE.address, href: 'https://maps.google.com/?q=1294+Mountain+Highway+The+Basin+VIC+3154' },
    { icon: HiOutlinePhone, label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
    { icon: HiOutlineEnvelope, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-maroon-950 text-cream-50">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(238,123,30,0.3), transparent 65%)' }}
      />
      <div className="relative mx-auto max-w-none px-5 py-28 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-48 lg:py-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow inline-flex items-center gap-3 text-gold-300">
              <span className="h-px w-8 bg-gold-300/60" />
              {CONTACT.eyebrow}
            </span>
            <h2 ref={title} className="mt-6 text-hero font-medium text-cream-50">
              {CONTACT.title}
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-cream-100/85 sm:text-2xl">
                {CONTACT.body}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={SITE.phoneHref} variant="solid" icon={<HiArrowUpRight />} className="ring-1 ring-gold-400/40">
                  Call the Temple
                </Button>
                <Button href="#join" variant="ghost">
                  Join the Community
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <ul className="space-y-2">
              {details.map((d, i) => (
                <Reveal as="li" key={d.label} delay={0.1 + i * 0.08}>
                  <a
                    href={d.href}
                    target={d.label === 'Address' ? '_blank' : undefined}
                    rel={d.label === 'Address' ? 'noreferrer' : undefined}
                    className="group flex items-start gap-5 border-b border-cream-50/12 py-5 transition-colors hover:border-gold-400/40"
                  >
                    <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream-50/20 text-gold-300 transition-colors group-hover:border-gold-400 group-hover:bg-gold-400/10">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs tracking-[0.25em] uppercase text-cream-100/50">
                        {d.label}
                      </span>
                      <span className="mt-1 block font-serif text-xl text-cream-50">{d.value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
