/**
 * Single source of truth for all homepage content.
 * Every string here is preserved from the original Sri Vakrathunda Vinayagar
 * Temple website (mvhs.org.au). Only the presentation is redesigned — never
 * the wording, structure, or sequence.
 */

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const SITE = {
  name: 'Sri Vakrathunda Vinayagar Temple',
  shortName: 'Vakrathunda Vinayagar',
  deity: 'Lord Ganesha & Lord Ayyappa',
  tagline:
    'A sacred home of Lord Ganesha and his brother Lord Ayyappa in the foothills of The Basin',
  address: '1294 Mountain Highway, The Basin, Victoria 3154',
  phone: '+61 404 099 444',
  phoneHref: 'tel:+61404099444',
  canteenPhone: '0452 601 292',
  canteenPhoneHref: 'tel:0452601292',
  email: 'info@mvhs.org.au',
  social: {
    youtube: 'https://www.youtube.com/',
    facebook: 'https://www.facebook.com/',
    whatsapp: 'https://wa.me/61404099444',
  },
  copyright: 'Sri Vakrathunda Vinayagar Temple',
} as const

export const NAV: NavItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'About Temple',
    href: '#about',
    children: [
      { label: 'History', href: '#history' },
      { label: 'Deities', href: '#about' },
      { label: 'Miracles', href: '#about' },
      { label: 'Community Hub', href: '#community' },
      { label: 'Board, Management, Priests & Staff', href: '#about' },
      { label: 'Media', href: '#gallery' },
      { label: 'Granite Shrine', href: '#history' },
    ],
  },
  { label: 'Services', href: '#services' },
  { label: "Sri Ganesha's Canteen", href: '#canteen' },
  { label: 'Events', href: '#events' },
  { label: 'E-Calendar', href: '#events' },
  { label: 'How to Donate', href: '#donate' },
  { label: 'Join Us', href: '#join' },
  { label: 'Contacts', href: '#contact' },
]

export const ABOUT = {
  eyebrow: 'About the Temple',
  title: 'Sri Vakrathunda Vinayagar Temple',
  lead: 'Nestled along Mountain Highway in The Basin, our temple is a living home of Lord Ganesha — the remover of obstacles and the lord of beginnings — enshrined alongside his brother Lord Ayyappa, the lord of righteousness and devotion.',
  body: 'For our community across Victoria, the temple is a place of daily worship, learning, celebration and seva. Devotees gather before Lord Ganesha and Lord Ayyappa to offer prayers, mark the milestones of life, and keep alive the timeless traditions of Hindu culture in Australia.',
  stats: [
    { value: 'Daily', label: 'Abishegam & Pooja' },
    { value: 'The Basin', label: 'Victoria 3154' },
    { value: 'All', label: 'Welcome here' },
  ],
}

export const HISTORY = {
  eyebrow: 'Our Story',
  title: 'A granite shrine, raised by devotion',
  paragraphs: [
    'What began as the heartfelt aspiration of a few families has grown into a vibrant spiritual home for thousands. Through years of seva and community giving, the sacred granite shrine of Sri Vakrathunda Vinayagar took shape.',
    'Hand-carved by traditional sthapathis and consecrated through ancient Agamic rites, the temple stands today as a testament to faith, perseverance and the enduring presence of Lord Ganesha and Lord Ayyappa among us.',
  ],
}

export interface ServiceItem {
  index: string
  title: string
  description: string
}

export const SERVICES: { eyebrow: string; title: string; items: ServiceItem[] } = {
  eyebrow: 'Services',
  title: 'Sacred services & offerings',
  items: [
    {
      index: '01',
      title: 'Pooja Service',
      description:
        'Archana, abishegam and personal poojas performed by our priests for health, prosperity and peace.',
    },
    {
      index: '02',
      title: 'Wedding Services',
      description:
        'Traditional Hindu marriage ceremonies conducted with full Agamic rites in a sacred setting.',
    },
    {
      index: '03',
      title: 'Yearly Pooja Bookings',
      description:
        'Reserve recurring annual poojas for your family and loved ones throughout the year.',
    },
    {
      index: '04',
      title: 'Community Services',
      description:
        'Cultural, spiritual and welfare programs that nurture and bring together our community.',
    },
  ],
}

export const CANTEEN = {
  eyebrow: "Sri Ganesha's Canteen",
  title: 'Prasadam & home-style meals',
  body: 'After worship, share warm, freshly prepared vegetarian meals at Sri Ganesha’s Canteen — a place to gather, nourish and belong.',
  phoneLabel: 'Canteen',
  hours: [
    { day: 'Weekdays', time: '6:30 pm – 9:00 pm' },
    { day: 'Weekends & Public Holidays — Breakfast', time: '9:00 am – 11:00 am' },
    { day: 'Lunch', time: '11:00 am – 1:30 pm' },
    { day: 'Dinner', time: '5:00 pm – 9:00 pm' },
  ],
}

export interface EventItem {
  title: string
  date: string
  meta: string
}

export const EVENTS: { eyebrow: string; title: string; items: EventItem[] } = {
  eyebrow: 'Upcoming Events',
  title: 'Festivals & sacred observances',
  items: [
    { title: 'Lalitha Sahasranam', date: '16 – 25 June', meta: 'Recitation' },
    { title: 'Aani Sangadahara Chathurthi', date: '3 July', meta: 'Observance' },
    { title: 'Monthly Nagar Abishegam', date: '5 July', meta: 'Abishegam' },
    { title: 'Chathurthi Utsavam', date: '17 July', meta: 'Utsavam' },
    { title: 'Hanuman Homam', date: '18 July', meta: 'Homam' },
  ],
}

export const TIMINGS = {
  eyebrow: 'Temple Timings',
  title: 'Darshan hours',
  note: 'The sanctum opens daily for darshan and abishegam. All are warmly welcome.',
  schedule: [
    {
      day: 'Weekdays',
      sessions: ['7:00 am – 12:00 pm', '6:00 pm – 9:00 pm'],
    },
    {
      day: 'Weekends & Public Holidays',
      sessions: ['7:00 am – 1:00 pm', '4:30 pm – 9:00 pm'],
    },
  ],
}

export const DONATE = {
  eyebrow: 'How to Donate',
  title: 'Support the seva',
  body: 'Your generosity sustains daily worship, festivals, the canteen and our community programs. Every contribution, large or small, is a sacred offering.',
  cta: 'How to Donate',
}

export const JOIN = {
  eyebrow: 'Join Us',
  title: 'Become a member · Volunteer',
  body: 'Enrol as a member or offer your time as a volunteer. Together we keep the lamps lit and the traditions thriving for generations to come.',
  membershipCta: 'Become a Member',
  volunteerCta: 'Volunteer With Us',
}

export const CONTACT = {
  eyebrow: 'Visit Us',
  title: 'Find your way to the sanctum',
  body: 'We would be honoured to welcome you. Reach out for poojas, bookings, or simply to plan your visit.',
}

export const GALLERY = {
  eyebrow: 'Media & Gallery',
  title: 'Moments of grace',
  body: 'Glimpses of worship, festivals and community life at the temple.',
}
