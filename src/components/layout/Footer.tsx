import { FaYoutube, FaFacebookF, FaWhatsapp } from 'react-icons/fa6'
import { HiArrowUp } from 'react-icons/hi2'
import { SITE } from '@/data/content'
import { scrollToHash } from '@/providers/SmoothScroll'
import { useContent } from '@/i18n/lang'

const socials = [
  { icon: FaYoutube, href: SITE.social.youtube, label: 'YouTube' },
  { icon: FaFacebookF, href: SITE.social.facebook, label: 'Facebook' },
  { icon: FaWhatsapp, href: SITE.social.whatsapp, label: 'WhatsApp' },
]

export function Footer() {
  const { NAV, UI } = useContent()
  const year = new Date().getFullYear()
  const cols = [NAV.slice(0, 3), NAV.slice(3, 6), NAV.slice(6)]

  return (
    <footer className="relative overflow-hidden bg-maroon-900 text-cream-100">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="shell pb-[calc(3rem+env(safe-area-inset-bottom))] pt-20 lg:pt-28">
        {/* Top: wordmark + back to top */}
        <div className="flex flex-col gap-8 border-b border-cream-50/12 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/Client%20Website%20Logo.svg"
                alt={`${SITE.name} logo`}
                className="h-32 w-32 shrink-0 object-contain [filter:brightness(0)_invert(1)] sm:h-40 sm:w-40"
              />
              <span className="eyebrow text-gold-300">{UI.footerRegion}</span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-cream-50 sm:text-5xl lg:text-6xl">
              {UI.titleLine1} <span className="text-gilded">{UI.titleLine2}</span> {UI.titleLine3}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            {/* large faint Om shadow above the button */}
            <span
              aria-hidden
              className="pointer-events-none -mb-4 select-none font-display leading-none text-gold-400/10 text-[8rem] sm:text-[10rem]"
            >
              ॐ
            </span>
            <button
              type="button"
              onClick={() => scrollToHash('#home')}
              className="group inline-flex items-center gap-3 rounded-full border border-cream-50/25 px-5 py-3 text-sm transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              {UI.backToTop}
              <HiArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Middle: nav + contact */}
        <div className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-3 lg:grid-cols-5">
          {cols.map((col, i) => (
            <nav key={i} aria-label={`Footer navigation ${i + 1}`}>
              <ul className="space-y-3">
                {col.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault()
                          scrollToHash(item.href)
                        }
                      }}
                      className="text-sm text-cream-100/70 transition-colors hover:text-gold-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-2">
            <span className="text-xs tracking-[0.25em] uppercase text-cream-100/50">{UI.visit}</span>
            <address className="mt-3 not-italic font-serif text-lg leading-relaxed text-cream-50">
              {SITE.address}
            </address>
            <a
              href={SITE.phoneHref}
              className="mt-3 inline-block font-serif text-lg text-gold-300 transition-colors hover:text-saffron-400"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        {/* Protected by badge — sits above the divider */}
        <div className="flex justify-center pb-8 sm:justify-end">
          <a
            href="https://egdigital.com.au/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-cream-50/15 py-1.5 pl-1.5 pr-4 transition-colors hover:border-gold-400/60"
          >
            <img
              src="/Shield%20Animation.gif"
              alt="EG Digital security shield"
              className="h-12 w-12 shrink-0 object-contain"
            />
            <span className="text-left leading-tight">
              <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-cream-100/45">
                {UI.protectedBy}
              </span>
              <span className="block text-xs font-medium text-gold-300 transition-colors group-hover:text-saffron-400">
                EG Digital
              </span>
            </span>
          </a>
        </div>

        {/* Bottom: socials + copyright */}
        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-cream-50/12 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-cream-100/50">
            © {year} {SITE.copyright}. {UI.rightsReserved}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/20 text-cream-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-maroon-950"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
            </div>
            <p className="text-xs text-cream-100/50">
              {UI.developedBy}{' '}
              <a
                href="https://egdigital.com.au/"
                target="_blank"
                rel="noreferrer"
                className="text-gold-300 transition-colors hover:text-saffron-400"
              >
                EG Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
