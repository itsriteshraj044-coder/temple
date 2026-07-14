import { HiArrowLongLeft, HiOutlineCalendarDays } from 'react-icons/hi2'
import { type EventItem } from '@/data/content'
import { useContent } from '@/i18n/lang'

/** A compact day/month badge from an ISO start date (e.g. "03" / "Jul"). */
function dateBadge(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  return {
    day: d.toLocaleDateString('en-AU', { day: '2-digit' }),
    mon: d.toLocaleDateString('en-AU', { month: 'short' }),
  }
}

/** Month heading like "July 2026" from an ISO start date. */
function monthLabel(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
}

/** Group ordered events into [month, events] buckets, preserving order. */
function groupByMonth(items: EventItem[]) {
  const groups: { label: string; events: EventItem[] }[] = []
  for (const e of items) {
    const label = monthLabel(e.start)
    const last = groups[groups.length - 1]
    if (last && last.label === label) last.events.push(e)
    else groups.push({ label, events: [e] })
  }
  return groups
}

type Variant = 'dark' | 'light'

const THEME: Record<
  Variant,
  {
    card: string
    header: string
    headerTitle: string
    headerSub: string
    iconWrap: string
    icon: string
    month: string
    row: string
    badge: string
    badgeDay: string
    badgeMon: string
    title: string
    category: string
    footer: string
  }
> = {
  dark: {
    card: 'border-gold-400/20 bg-cream-50/[0.04] backdrop-blur-sm',
    header: 'border-gold-400/15 bg-gradient-to-r from-gold-400/10 to-transparent',
    headerTitle: 'text-cream-50',
    headerSub: 'text-gold-300/70',
    iconWrap: 'bg-gold-400/15 ring-1 ring-gold-400/30',
    icon: 'text-gold-300',
    month: 'bg-maroon-950/90 text-gold-300',
    row: 'border-gold-400/10',
    badge: 'border-gold-400/25 bg-maroon-900',
    badgeDay: 'text-cream-50',
    badgeMon: 'text-gold-300',
    title: 'text-cream-50',
    category: 'text-saffron-300/90',
    footer: 'border-gold-400/15 text-gold-300 hover:bg-gold-400/10 hover:text-gilded',
  },
  light: {
    card: 'border-maroon-900/10 bg-cream-50 shadow-soft',
    header: 'border-maroon-900/10 bg-gradient-to-r from-saffron-300/25 to-transparent',
    headerTitle: 'text-maroon-900',
    headerSub: 'text-saffron-600/80',
    iconWrap: 'bg-saffron-300/20 ring-1 ring-saffron-500/30',
    icon: 'text-saffron-600',
    month: 'bg-cream-100/95 text-saffron-600',
    row: 'border-maroon-900/10',
    badge: 'border-maroon-900/15 bg-cream-100',
    badgeDay: 'text-maroon-900',
    badgeMon: 'text-saffron-600',
    title: 'text-maroon-900',
    category: 'text-saffron-600',
    footer: 'border-maroon-900/10 text-saffron-600 hover:bg-saffron-300/15 hover:text-saffron-700',
  },
}

/**
 * The temple's occasions calendar — upcoming events grouped by month, ordered
 * latest-first, from the shared EVENTS data. Rendered as a sidebar on the
 * standalone pages (Daily Pooja, Canteen). The inner list carries
 * `data-lenis-prevent` so it scrolls natively inside the Lenis smooth-scroll.
 */
export function OccasionsCalendar({ variant = 'dark' }: { variant?: Variant }) {
  const { EVENTS, UI } = useContent()
  const t = THEME[variant]
  const ordered = [...EVENTS.items].sort((a, b) => b.start.localeCompare(a.start))
  const groups = groupByMonth(ordered)

  return (
    <div className={`overflow-hidden rounded-3xl border ${t.card}`}>
      {/* header */}
      <div className={`flex items-center gap-3 border-b px-6 py-5 ${t.header}`}>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${t.iconWrap}`}>
          <HiOutlineCalendarDays className={`h-5 w-5 ${t.icon}`} />
        </span>
        <div>
          <h2 className={`font-display text-lg ${t.headerTitle}`}>{EVENTS.eyebrow}</h2>
          <p className={`text-[0.62rem] uppercase tracking-[0.22em] ${t.headerSub}`}>{UI.calYear}</p>
        </div>
      </div>

      {/* scrollable occasion list — data-lenis-prevent lets it scroll natively
          instead of Lenis hijacking the wheel */}
      <div data-lenis-prevent className="max-h-[34rem] overflow-y-auto overscroll-contain">
        {groups.map((group) => (
          <div key={group.label}>
            <h3
              className={`sticky top-0 z-10 px-6 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur ${t.month}`}
            >
              {group.label}
            </h3>
            <ul>
              {group.events.map((e) => {
                const b = dateBadge(e.start)
                return (
                  <li
                    key={`${e.start}-${e.title}`}
                    className={`flex items-center gap-4 border-t px-6 py-3.5 first:border-t-0 ${t.row}`}
                  >
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border leading-none ${t.badge}`}
                    >
                      <span className={`font-display text-lg ${t.badgeDay}`}>{b.day}</span>
                      <span
                        className={`mt-0.5 text-[0.58rem] uppercase tracking-[0.14em] ${t.badgeMon}`}
                      >
                        {b.mon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className={`truncate font-serif text-[0.98rem] ${t.title}`}>{e.title}</h4>
                      <span className={`text-[0.7rem] uppercase tracking-[0.14em] ${t.category}`}>
                        {e.category}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* footer link to full calendar */}
      <a
        href="#/e-calendar"
        className={`group flex items-center justify-center gap-2 border-t px-6 py-4 text-sm font-medium tracking-wide transition-colors ${t.footer}`}
      >
        {EVENTS.calendarCta}
        <HiArrowLongLeft className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}
