/**
 * Single source of truth for all site content — now bilingual (English + Tamil).
 *
 * The English wording is preserved from the original Sri Vakrathunda Vinayagar
 * Temple website (mvhs.org.au). Tamil (`ta`) is a hand-crafted translation of
 * the same content. Language-neutral facts (phone, email, address, links,
 * proper-noun event posters) live in `SITE` / shared constants and never change
 * between languages. Use `getContent(lang)` (or the `useContent()` hook) to read
 * the tree for the active language.
 */

export type Lang = 'en' | 'ta'

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface ServiceItem {
  index: string
  title: string
  description: string
}

export interface FlashItem {
  /** Language-neutral URL slug, e.g. 'canteen-menu' → #/flash/canteen-menu */
  slug: string
  /** Headline shown in the ticker and as the page title. */
  label: string
  /** Body copy shown on the item's own page. */
  body: string
  /** Label for the button linking to the related homepage section. */
  ctaLabel: string
  /** In-page anchor for the related section, e.g. '#canteen'. */
  ctaHref: string
}

export interface EventItem {
  title: string
  /** Human-readable date shown on the card. */
  date: string
  /** Short category label — also drives the E-Calendar filters. */
  category: string
  /** Event poster image (sourced from the temple's official listings). */
  img: string
  /** ISO start date (yyyy-mm-dd) used for ordering and month grouping. */
  start: string
}

/** Language-neutral facts — identical in every language. */
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

const ev = (path: string) => `/images/events/${path}.webp`

/**
 * Event posters, dates and ISO start are fixed data (shared across languages);
 * only the title + category text differ per language.
 */
const EVENT_ITEMS_EN: EventItem[] = [
  { title: 'Lalitha Sahasranam', date: '16 – 25 June 2026', category: 'Recitation', img: ev('lalitha-sahasranam'), start: '2026-06-16' },
  { title: 'Sani Pradosham', date: '27 June 2026', category: 'Pradosham', img: ev('pradosham'), start: '2026-06-27' },
  { title: 'Aani Pournami Utsavam', date: '29 June 2026', category: 'Utsavam', img: ev('aani-karthikai-utsavam'), start: '2026-06-29' },
  { title: 'Aani Sangadahara Chathurthi', date: '3 July 2026', category: 'Chathurthi', img: ev('aani-sangadahara-chathurthi'), start: '2026-07-03' },
  { title: 'Monthly Nagar Abishegam', date: '5 July 2026', category: 'Abishegam', img: ev('monthly-nagar-abishegam'), start: '2026-07-05' },
  { title: 'Aani Thei Pirai Ashtami', date: '7 July 2026', category: 'Observance', img: ev('aani-thei-pirai-ashtami'), start: '2026-07-07' },
  { title: 'Aani Karthikai Utsavam', date: '10 July 2026', category: 'Utsavam', img: ev('aani-karthikai-utsavam'), start: '2026-07-10' },
  { title: 'Pradosham', date: '12 July 2026', category: 'Pradosham', img: ev('pradosham'), start: '2026-07-12' },
  { title: 'Chathurthi Utsavam', date: '17 July 2026', category: 'Utsavam', img: ev('chathurthi-utsavam'), start: '2026-07-17' },
  { title: 'Hanuman Homam', date: '18 July 2026', category: 'Homam', img: ev('hanuman-homam'), start: '2026-07-18' },
  { title: 'Aadi Gayathri Ambal Abhishekam & Shukla Shasti', date: '19 July 2026', category: 'Abishegam', img: ev('aadi-gayathri-shukla-shasti'), start: '2026-07-19' },
  { title: 'Aadi Chevvai 1', date: '21 July 2026', category: 'Observance', img: ev('aadi-chevvai'), start: '2026-07-21' },
  { title: 'Suntharar Guru Pooja', date: '22 July 2026', category: 'Pooja', img: ev('suntharar-guru-pooja'), start: '2026-07-22' },
  { title: 'Pradosham', date: '27 July 2026', category: 'Pradosham', img: ev('pradosham'), start: '2026-07-27' },
  { title: 'Aadi Chevvai', date: '28 July 2026', category: 'Observance', img: ev('aadi-chevvai'), start: '2026-07-28' },
  { title: 'Aadi Pournami Utsavam', date: '29 July 2026', category: 'Utsavam', img: ev('aani-karthikai-utsavam'), start: '2026-07-29' },
]

const EVENT_ITEMS_TA: EventItem[] = [
  { title: 'லலிதா சஹஸ்ரநாமம்', date: '16 – 25 June 2026', category: 'பாராயணம்', img: ev('lalitha-sahasranam'), start: '2026-06-16' },
  { title: 'சனி பிரதோஷம்', date: '27 June 2026', category: 'பிரதோஷம்', img: ev('pradosham'), start: '2026-06-27' },
  { title: 'ஆனி பௌர்ணமி உற்சவம்', date: '29 June 2026', category: 'உற்சவம்', img: ev('aani-karthikai-utsavam'), start: '2026-06-29' },
  { title: 'ஆனி சங்கடஹர சதுர்த்தி', date: '3 July 2026', category: 'சதுர்த்தி', img: ev('aani-sangadahara-chathurthi'), start: '2026-07-03' },
  { title: 'மாதாந்திர நாகர் அபிஷேகம்', date: '5 July 2026', category: 'அபிஷேகம்', img: ev('monthly-nagar-abishegam'), start: '2026-07-05' },
  { title: 'ஆனி தேய்பிறை அஷ்டமி', date: '7 July 2026', category: 'வழிபாடு', img: ev('aani-thei-pirai-ashtami'), start: '2026-07-07' },
  { title: 'ஆனி கார்த்திகை உற்சவம்', date: '10 July 2026', category: 'உற்சவம்', img: ev('aani-karthikai-utsavam'), start: '2026-07-10' },
  { title: 'பிரதோஷம்', date: '12 July 2026', category: 'பிரதோஷம்', img: ev('pradosham'), start: '2026-07-12' },
  { title: 'சதுர்த்தி உற்சவம்', date: '17 July 2026', category: 'உற்சவம்', img: ev('chathurthi-utsavam'), start: '2026-07-17' },
  { title: 'அனுமன் ஹோமம்', date: '18 July 2026', category: 'ஹோமம்', img: ev('hanuman-homam'), start: '2026-07-18' },
  { title: 'ஆடி காயத்ரி அம்பாள் அபிஷேகம் & சுக்ல சஷ்டி', date: '19 July 2026', category: 'அபிஷேகம்', img: ev('aadi-gayathri-shukla-shasti'), start: '2026-07-19' },
  { title: 'ஆடி செவ்வாய் 1', date: '21 July 2026', category: 'வழிபாடு', img: ev('aadi-chevvai'), start: '2026-07-21' },
  { title: 'சுந்தரர் குரு பூஜை', date: '22 July 2026', category: 'பூஜை', img: ev('suntharar-guru-pooja'), start: '2026-07-22' },
  { title: 'பிரதோஷம்', date: '27 July 2026', category: 'பிரதோஷம்', img: ev('pradosham'), start: '2026-07-27' },
  { title: 'ஆடி செவ்வாய்', date: '28 July 2026', category: 'வழிபாடு', img: ev('aadi-chevvai'), start: '2026-07-28' },
  { title: 'ஆடி பௌர்ணமி உற்சவம்', date: '29 July 2026', category: 'உற்சவம்', img: ev('aani-karthikai-utsavam'), start: '2026-07-29' },
]

export interface Content {
  NAV: NavItem[]
  ABOUT: {
    eyebrow: string
    title: string
    lead: string
    body: string
    stats: { value: string; label: string }[]
  }
  HISTORY: { eyebrow: string; title: string; paragraphs: string[] }
  SERVICES: { eyebrow: string; title: string; items: ServiceItem[] }
  CANTEEN: {
    eyebrow: string
    title: string
    body: string
    phoneLabel: string
    hours: { day: string; time: string }[]
  }
  EVENTS: {
    eyebrow: string
    title: string
    intro: string
    calendarCta: string
    items: EventItem[]
  }
  TIMINGS: {
    eyebrow: string
    title: string
    note: string
    schedule: { day: string; sessions: string[] }[]
  }
  DONATE: { eyebrow: string; title: string; body: string; cta: string }
  JOIN: {
    eyebrow: string
    title: string
    body: string
    membershipCta: string
    volunteerCta: string
  }
  CONTACT: { eyebrow: string; title: string; body: string }
  GALLERY: {
    eyebrow: string
    title: string
    body: string
    sections: { title: string; blurb: string }[]
  }
  UI: {
    heroEyebrow: string
    heroLead: string
    planVisit: string
    templeTimings: string
    openDaily: string
    darshanAbishegam: string
    call: string
    scroll: string
    omMantra: string
    readMore: string
    historySteps: string[]
    servicesIntro: string
    enquire: string
    prasadam: string
    vegetarian: string
    session: string
    openDailyDarshan: string
    viewAll: string
    contactAddress: string
    contactPhone: string
    contactEmail: string
    callTemple: string
    joinCommunity: string
    membershipTitle: string
    membershipBody: string
    volunteerTitle: string
    volunteerBody: string
    footerRegion: string
    backToTop: string
    visit: string
    protectedBy: string
    developedBy: string
    rightsReserved: string
    calYear: string
    eCalendarTitle: string
    backToHome: string
    all: string
    observanceSingular: string
    observancePlural: string
    noObservances: string
    splashSubtitle: string
    templeName: string
    donate: string
    titleLine1: string
    titleLine2: string
    titleLine3: string
    flashLabel: string
    flashItems: FlashItem[]
    flashRead: string
    flashBackToHome: string
    quickEyebrow: string
    quickTitle: string
    quickTempleHours: string
    quickCanteenTimings: string
    quickCanteenPhone: string
  }
}

const en: Content = {
  NAV: [
    { label: 'Home', href: '#home' },
    {
      label: 'About Temple',
      href: '#about',
      children: [
        { label: 'A Brief History of the Temple', href: '#history' },
        { label: 'Deities at the Temple', href: '#about' },
        { label: 'Miracles of Sri Vakrathunda Vinayagar', href: '#about' },
        { label: 'Community HUB', href: '#community' },
        { label: 'Board of Trustees', href: '#about' },
        { label: 'Temple Staff', href: '#about' },
        { label: 'Media', href: '#gallery' },
        { label: "The Southern Hemisphere's first Granite Temple", href: '#history' },
        { label: 'Temple Opening Hours', href: '#contact' },
      ],
    },
    {
      label: 'Services',
      href: '#services',
      children: [
        { label: 'Pooja Service', href: '#services' },
        { label: 'Wedding Services', href: '#services' },
        { label: 'Yearly Pooja Bookings & Availability', href: '#services' },
        { label: 'Community Services', href: '#services' },
      ],
    },
    {
      label: 'Sri Ganeshas Canteen',
      href: '#canteen',
      children: [
        { label: 'Canteen Menu', href: '#canteen' },
        { label: 'Opening hours', href: '#canteen' },
        { label: 'Catering (Internal and External)', href: '#canteen' },
      ],
    },
    {
      label: 'Events',
      href: '#events',
      children: [{ label: 'Community Events', href: '#events' }],
    },
    { label: 'E-Calendar', href: '#/e-calendar' },
    { label: 'How to donate', href: '#donate' },
    {
      label: 'Join Us',
      href: '#join',
      children: [
        { label: 'Become a Member', href: '#join' },
        { label: 'Volunteering', href: '#join' },
      ],
    },
    { label: 'Contacts', href: '#contact' },
  ],
  ABOUT: {
    eyebrow: 'About the Temple',
    title: 'Sri Vakrathunda Vinayagar Temple',
    lead: 'Nestled along Mountain Highway in The Basin, our temple is a living home of Lord Ganesha — the remover of obstacles and the lord of beginnings — enshrined alongside his brother Lord Ayyappa, the lord of righteousness and devotion.',
    body: 'For our community across Victoria, the temple is a place of daily worship, learning, celebration and seva. Devotees gather before Lord Ganesha and Lord Ayyappa to offer prayers, mark the milestones of life, and keep alive the timeless traditions of Hindu culture in Australia.',
    stats: [
      { value: 'Daily', label: 'Abishegam & Pooja' },
      { value: 'The Basin', label: 'Victoria 3154' },
      { value: 'All', label: 'Welcome here' },
    ],
  },
  HISTORY: {
    eyebrow: 'Our Story',
    title: 'A granite shrine,\nraised by devotion',
    paragraphs: [
      'What began as the heartfelt aspiration of a few families has grown into a vibrant spiritual home for thousands. Through years of seva and community giving, the sacred granite shrine of Sri Vakrathunda Vinayagar took shape.',
      'Hand-carved by traditional sthapathis and consecrated through ancient Agamic rites, the temple stands today as a testament to faith, perseverance and the enduring presence of Lord Ganesha and Lord Ayyappa among us.',
    ],
  },
  SERVICES: {
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
  },
  CANTEEN: {
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
  },
  EVENTS: {
    eyebrow: 'Upcoming Events',
    title: 'Festivals & sacred observances',
    intro:
      'The temple calendar turns with the sacred rhythm of the year — abishegams, utsavams, homams and observances. All devotees are warmly welcome to join.',
    calendarCta: 'View Full E-Calendar',
    items: EVENT_ITEMS_EN,
  },
  TIMINGS: {
    eyebrow: 'Temple Timings',
    title: 'Darshan hours',
    note: 'The sanctum opens daily for darshan and abishegam. All are warmly welcome.',
    schedule: [
      { day: 'Weekdays', sessions: ['7:00 am – 12:00 pm', '6:00 pm – 9:00 pm'] },
      { day: 'Weekends & Public Holidays', sessions: ['7:00 am – 1:00 pm', '4:30 pm – 9:00 pm'] },
    ],
  },
  DONATE: {
    eyebrow: 'How to Donate',
    title: 'Support the seva',
    body: 'Your generosity sustains daily worship, festivals, the canteen and our community programs. Every contribution, large or small, is a sacred offering.',
    cta: 'How to Donate',
  },
  JOIN: {
    eyebrow: 'Join Us',
    title: 'Become a member · Volunteer',
    body: 'Enrol as a member or offer your time as a volunteer. Together we keep the lamps lit and the traditions thriving for generations to come.',
    membershipCta: 'Become a Member',
    volunteerCta: 'Volunteer With Us',
  },
  CONTACT: {
    eyebrow: 'Visit Us',
    title: 'Find your way to the sanctum',
    body: 'We would be honoured to welcome you. Reach out for poojas, bookings, or simply to plan your visit.',
  },
  GALLERY: {
    eyebrow: 'Media & Gallery',
    title: 'Moments of grace',
    body: 'Glimpses of worship, festivals and community life at the temple.',
    sections: [
      { title: 'Mahotsavam 2025', blurb: 'The grand annual festival — processions, music and devotion in full bloom.' },
      { title: 'Bhavahostam 2025', blurb: 'Sacred rites, abishegam and the radiant evening float festival.' },
      { title: 'Shasti 2025', blurb: 'Skanda Shasti — deeparadhana, the peacock vahanam and offerings of gratitude.' },
    ],
  },
  UI: {
    heroEyebrow: 'Established in Victoria 1992',
    heroLead:
      'A sacred home of Lord Ganesha and his brother Lord Ayyappa in the foothills of The Basin. A living sanctuary of devotion, culture and community.',
    planVisit: 'Plan Your Visit',
    templeTimings: 'Temple Timings',
    openDaily: 'Open Daily',
    darshanAbishegam: 'Darshan & Abishegam',
    call: 'Call',
    scroll: 'Scroll',
    omMantra: 'Om Gan Ganapataye Namaha',
    readMore: 'Read More',
    historySteps: ['Aspiration', 'Seva', 'Granite Shrine', 'Consecration'],
    servicesIntro: 'Offered with devotion by our priests, in keeping with timeless Agamic tradition.',
    enquire: 'Enquire',
    prasadam: 'Prasadam',
    vegetarian: 'Vegetarian',
    session: 'Session',
    openDailyDarshan: 'Open daily for darshan',
    viewAll: 'View all',
    contactAddress: 'Address',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    callTemple: 'Call the Temple',
    joinCommunity: 'Join the Community',
    membershipTitle: 'Membership',
    membershipBody: 'Enrol as a member and become part of the temple family, with a voice in our shared journey.',
    volunteerTitle: 'Volunteer',
    volunteerBody: 'Offer your time and skills in seva — from festivals to the canteen and community programs.',
    footerRegion: 'The Basin · Victoria',
    backToTop: 'Back to top',
    visit: 'Visit',
    protectedBy: 'Protected by',
    developedBy: 'Developed by',
    rightsReserved: 'All rights reserved.',
    calYear: 'Temple Calendar · 2026',
    eCalendarTitle: 'E-Calendar',
    backToHome: 'Back to Home',
    all: 'All',
    observanceSingular: 'observance',
    observancePlural: 'observances',
    noObservances: 'No observances in this category.',
    splashSubtitle: 'Choose your language',
    templeName: 'Sri Vakrathunda Vinayagar Temple',
    donate: 'Donate',
    titleLine1: 'Sri Vakrathunda',
    titleLine2: 'Vinayagar',
    titleLine3: 'Temple',
    flashLabel: 'Flash Story',
    flashItems: [
      {
        slug: 'canteen-menu',
        label: "Sri Ganesha's Canteen Menu",
        body: 'Warm, freshly prepared vegetarian meals are served daily at Sri Ganesha’s Canteen. From tiffin and dosai to full-plate lunches and evening prasadam, every dish is cooked with devotion. Browse the full menu and opening hours below.',
        ctaLabel: 'Go to Canteen',
        ctaHref: '#canteen',
      },
      {
        slug: 'pooja-times',
        label: 'Daily Pooja Times',
        body: 'The sanctum opens daily for darshan and abishegam. Morning and evening poojas follow the timeless Agamic rhythm. Check the current darshan hours so you can plan your visit and receive the deity’s blessings.',
        ctaLabel: 'View Timings',
        ctaHref: '#timings',
      },
      {
        slug: 'weekend-abishegam',
        label: 'Weekend Special Abishegam',
        body: 'Join us each weekend for a special abishegam to Lord Ganesha and Lord Ayyappa — a sacred bathing ritual accompanied by chanting and deeparadhana. All devotees are warmly welcome to participate.',
        ctaLabel: 'See Schedule',
        ctaHref: '#timings',
      },
      {
        slug: 'upcoming-festivals',
        label: 'Upcoming Festivals & Utsavams',
        body: 'The temple calendar turns with the sacred rhythm of the year — utsavams, homams, pradoshams and observances. Explore what is coming up and mark your family’s festivals in advance.',
        ctaLabel: 'Browse Events',
        ctaHref: '#events',
      },
    ],
    flashRead: 'Related section',
    flashBackToHome: 'Back to Home',
    quickEyebrow: 'At a Glance',
    quickTitle: 'Hours & Timings',
    quickTempleHours: 'Temple Hours',
    quickCanteenTimings: "Sri Ganesha's Canteen Timings",
    quickCanteenPhone: 'Canteen Phone',
  },
}

const ta: Content = {
  NAV: [
    { label: 'முகப்பு', href: '#home' },
    {
      label: 'கோயில் பற்றி',
      href: '#about',
      children: [
        { label: 'கோயிலின் சுருக்க வரலாறு', href: '#history' },
        { label: 'கோயில் மூர்த்திகள்', href: '#about' },
        { label: 'ஸ்ரீ வக்ரதுண்ட விநாயகரின் அற்புதங்கள்', href: '#about' },
        { label: 'சமூக மையம்', href: '#community' },
        { label: 'அறங்காவலர் குழு', href: '#about' },
        { label: 'கோயில் பணியாளர்கள்', href: '#about' },
        { label: 'ஊடகம்', href: '#gallery' },
        { label: 'தென் அரைக்கோளத்தின் முதல் கருங்கல் கோயில்', href: '#history' },
        { label: 'கோயில் திறக்கும் நேரம்', href: '#contact' },
      ],
    },
    {
      label: 'சேவைகள்',
      href: '#services',
      children: [
        { label: 'பூஜை சேவை', href: '#services' },
        { label: 'திருமண சேவைகள்', href: '#services' },
        { label: 'வருடாந்திர பூஜை முன்பதிவு & கிடைப்பு', href: '#services' },
        { label: 'சமூக சேவைகள்', href: '#services' },
      ],
    },
    {
      label: 'கணேஷா உணவகம்',
      href: '#canteen',
      children: [
        { label: 'உணவக பட்டியல்', href: '#canteen' },
        { label: 'திறக்கும் நேரம்', href: '#canteen' },
        { label: 'கேட்டரிங் (உள் & வெளி)', href: '#canteen' },
      ],
    },
    {
      label: 'நிகழ்வுகள்',
      href: '#events',
      children: [{ label: 'சமூக நிகழ்வுகள்', href: '#events' }],
    },
    { label: 'மின்-நாட்காட்டி', href: '#/e-calendar' },
    { label: 'நன்கொடை', href: '#donate' },
    {
      label: 'இணையுங்கள்',
      href: '#join',
      children: [
        { label: 'உறுப்பினராகுங்கள்', href: '#join' },
        { label: 'தன்னார்வ சேவை', href: '#join' },
      ],
    },
    { label: 'தொடர்புகள்', href: '#contact' },
  ],
  ABOUT: {
    eyebrow: 'கோயில் பற்றி',
    title: 'ஸ்ரீ வக்ரதுண்ட விநாயகர் கோயில்',
    lead: 'த பேசினில் மவுண்டன் நெடுஞ்சாலையை ஒட்டி அமைந்துள்ள எங்கள் கோயில், தடைகளை நீக்கும், தொடக்கங்களின் அதிபதியான விநாயகப் பெருமானின் உயிருள்ள உறைவிடமாகும் — அறத்தின், பக்தியின் தலைவரான அவரது சகோதரர் ஐயப்பப் பெருமானுடன் இணைந்து எழுந்தருளியுள்ளார்.',
    body: 'விக்டோரியா முழுவதும் உள்ள எங்கள் சமூகத்திற்கு, இக்கோயில் தினசரி வழிபாடு, கற்றல், கொண்டாட்டம் மற்றும் சேவைக்கான இடமாகும். பக்தர்கள் விநாயகர் மற்றும் ஐயப்பன் முன் ஒன்றுகூடி வழிபாடு செய்து, வாழ்வின் முக்கிய தருணங்களைக் கொண்டாடி, ஆஸ்திரேலியாவில் இந்து பண்பாட்டின் நித்திய மரபுகளை உயிர்ப்புடன் காக்கின்றனர்.',
    stats: [
      { value: 'தினமும்', label: 'அபிஷேகம் & பூஜை' },
      { value: 'த பேசின்', label: 'விக்டோரியா 3154' },
      { value: 'அனைவரும்', label: 'வரவேற்கிறோம்' },
    ],
  },
  HISTORY: {
    eyebrow: 'எங்கள் கதை',
    title: 'கருங்கல் ஆலயம்,\nபக்தியால் எழுந்தது',
    paragraphs: [
      'சில குடும்பங்களின் உளமார்ந்த ஆசையாகத் தொடங்கியது இன்று ஆயிரக்கணக்கானோருக்கு உயிரோட்டமுள்ள ஆன்மிக இல்லமாக வளர்ந்துள்ளது. பல ஆண்டுகளின் சேவை மற்றும் சமூக அர்ப்பணிப்பின் மூலம், ஸ்ரீ வக்ரதுண்ட விநாயகரின் புனித கருங்கல் ஆலயம் உருவெடுத்தது.',
      'பாரம்பரிய ஸ்தபதிகளால் கைவினையால் செதுக்கப்பட்டு, தொன்மையான ஆகம முறைப்படி கும்பாபிஷேகம் செய்யப்பட்ட இக்கோயில், நம்பிக்கை, விடாமுயற்சி மற்றும் விநாயகர் ஐயப்பனின் நிலையான அருட்பிரசன்னத்திற்குச் சான்றாக இன்று திகழ்கிறது.',
    ],
  },
  SERVICES: {
    eyebrow: 'சேவைகள்',
    title: 'புனித சேவைகளும் வழிபாடுகளும்',
    items: [
      {
        index: '01',
        title: 'பூஜை சேவை',
        description:
          'ஆரோக்கியம், செழிப்பு மற்றும் அமைதிக்காக எங்கள் அர்ச்சகர்களால் செய்யப்படும் அர்ச்சனை, அபிஷேகம் மற்றும் தனிப்பட்ட பூஜைகள்.',
      },
      {
        index: '02',
        title: 'திருமண சேவைகள்',
        description:
          'புனிதச் சூழலில் முழு ஆகம முறைப்படி நடத்தப்படும் பாரம்பரிய இந்து திருமண வைபவங்கள்.',
      },
      {
        index: '03',
        title: 'வருடாந்திர பூஜை முன்பதிவு',
        description:
          'உங்கள் குடும்பத்திற்காகவும் அன்பிற்குரியவர்களுக்காகவும் ஆண்டு முழுவதும் நடைபெறும் வருடாந்திர பூஜைகளை முன்பதிவு செய்யுங்கள்.',
      },
      {
        index: '04',
        title: 'சமூக சேவைகள்',
        description:
          'எங்கள் சமூகத்தை வளர்த்து ஒன்றிணைக்கும் பண்பாட்டு, ஆன்மிக மற்றும் நல்வாழ்வு நிகழ்ச்சிகள்.',
      },
    ],
  },
  CANTEEN: {
    eyebrow: 'ஸ்ரீ கணேஷா உணவகம்',
    title: 'பிரசாதமும் வீட்டு உணவும்',
    body: 'வழிபாட்டிற்குப் பிறகு, ஸ்ரீ கணேஷா உணவகத்தில் சூடான, புத்தம்புதிதாகச் சமைத்த சைவ உணவைப் பகிர்ந்து கொள்ளுங்கள் — கூடி, உண்டு, ஒன்றாய் இணையும் இடம்.',
    phoneLabel: 'உணவகம்',
    hours: [
      { day: 'வார நாட்கள்', time: '6:30 pm – 9:00 pm' },
      { day: 'வார இறுதி & பொது விடுமுறை — காலை உணவு', time: '9:00 am – 11:00 am' },
      { day: 'மதிய உணவு', time: '11:00 am – 1:30 pm' },
      { day: 'இரவு உணவு', time: '5:00 pm – 9:00 pm' },
    ],
  },
  EVENTS: {
    eyebrow: 'வரவிருக்கும் நிகழ்வுகள்',
    title: 'திருவிழாக்களும் புனித வழிபாடுகளும்',
    intro:
      'ஆண்டின் புனித தாளத்திற்கேற்ப கோயில் நாட்காட்டி சுழல்கிறது — அபிஷேகங்கள், உற்சவங்கள், ஹோமங்கள் மற்றும் வழிபாடுகள். அனைத்து பக்தர்களும் அன்புடன் வரவேற்கப்படுகிறார்கள்.',
    calendarCta: 'முழு மின்-நாட்காட்டியைக் காண',
    items: EVENT_ITEMS_TA,
  },
  TIMINGS: {
    eyebrow: 'கோயில் நேரம்',
    title: 'தரிசன நேரம்',
    note: 'கருவறை தினமும் தரிசனம் மற்றும் அபிஷேகத்திற்காகத் திறக்கப்படுகிறது. அனைவரும் அன்புடன் வரவேற்கப்படுகிறார்கள்.',
    schedule: [
      { day: 'வார நாட்கள்', sessions: ['7:00 am – 12:00 pm', '6:00 pm – 9:00 pm'] },
      { day: 'வார இறுதி & பொது விடுமுறை', sessions: ['7:00 am – 1:00 pm', '4:30 pm – 9:00 pm'] },
    ],
  },
  DONATE: {
    eyebrow: 'நன்கொடை வழங்குவது எப்படி',
    title: 'சேவையை ஆதரியுங்கள்',
    body: 'உங்கள் தாராள மனம் தினசரி வழிபாடு, திருவிழாக்கள், உணவகம் மற்றும் எங்கள் சமூக நிகழ்ச்சிகளைத் தாங்குகிறது. சிறியதோ பெரியதோ, ஒவ்வொரு பங்களிப்பும் ஒரு புனிதக் காணிக்கை.',
    cta: 'நன்கொடை வழங்க',
  },
  JOIN: {
    eyebrow: 'எங்களுடன் இணையுங்கள்',
    title: 'உறுப்பினராகுங்கள் · தன்னார்வலராகுங்கள்',
    body: 'உறுப்பினராகப் பதிவு செய்யுங்கள் அல்லது தன்னார்வலராக உங்கள் நேரத்தை வழங்குங்கள். இணைந்து, தலைமுறைகள் தோறும் விளக்குகளை ஏற்றி மரபுகளை வளர்த்தெடுப்போம்.',
    membershipCta: 'உறுப்பினராகுங்கள்',
    volunteerCta: 'எங்களுடன் தன்னார்வ சேவை',
  },
  CONTACT: {
    eyebrow: 'எங்களை வாருங்கள்',
    title: 'கருவறைக்கு வழி காணுங்கள்',
    body: 'உங்களை வரவேற்பதில் பெருமை கொள்கிறோம். பூஜைகள், முன்பதிவுகள், அல்லது உங்கள் வருகையைத் திட்டமிட எங்களைத் தொடர்பு கொள்ளுங்கள்.',
  },
  GALLERY: {
    eyebrow: 'ஊடகம் & படத்தொகுப்பு',
    title: 'அருள் தருணங்கள்',
    body: 'கோயிலின் வழிபாடு, திருவிழாக்கள் மற்றும் சமூக வாழ்வின் காட்சிகள்.',
    sections: [
      { title: 'மகோற்சவம் 2025', blurb: 'பிரம்மாண்ட ஆண்டு விழா — ஊர்வலங்கள், இசை மற்றும் பக்தி முழுமையாக மலர்ந்த திருவிழா.' },
      { title: 'பவஹோற்சவம் 2025', blurb: 'புனிதச் சடங்குகள், அபிஷேகம் மற்றும் ஒளிரும் மாலை தெப்பத் திருவிழா.' },
      { title: 'சஷ்டி 2025', blurb: 'கந்த சஷ்டி — தீபாராதனை, மயில் வாகனம் மற்றும் நன்றிக் காணிக்கைகள்.' },
    ],
  },
  UI: {
    heroEyebrow: 'விக்டோரியாவில் 1992-ல் நிறுவப்பட்டது',
    heroLead:
      'த பேசின் மலையடிவாரத்தில் விநாயகப் பெருமானுக்கும் அவரது சகோதரர் ஐயப்பப் பெருமானுக்கும் உறையும் புனித இல்லம். பக்தி, பண்பாடு மற்றும் சமூகத்தின் உயிருள்ள புகலிடம்.',
    planVisit: 'உங்கள் வருகையைத் திட்டமிடுங்கள்',
    templeTimings: 'கோயில் நேரம்',
    openDaily: 'தினமும் திறந்திருக்கும்',
    darshanAbishegam: 'தரிசனம் & அபிஷேகம்',
    call: 'அழைக்க',
    scroll: 'உருட்டு',
    omMantra: 'ஓம் கண் கணபதயே நமஹ',
    readMore: 'மேலும் படிக்க',
    historySteps: ['ஆசை', 'சேவை', 'கருங்கல் ஆலயம்', 'கும்பாபிஷேகம்'],
    servicesIntro: 'நித்திய ஆகம மரபின்படி, எங்கள் அர்ச்சகர்களால் பக்தியுடன் வழங்கப்படுகிறது.',
    enquire: 'விசாரிக்க',
    prasadam: 'பிரசாதம்',
    vegetarian: 'சைவம்',
    session: 'அமர்வு',
    openDailyDarshan: 'தினமும் தரிசனத்திற்குத் திறந்திருக்கும்',
    viewAll: 'அனைத்தையும் காண',
    contactAddress: 'முகவரி',
    contactPhone: 'தொலைபேசி',
    contactEmail: 'மின்னஞ்சல்',
    callTemple: 'கோயிலை அழையுங்கள்',
    joinCommunity: 'சமூகத்தில் இணையுங்கள்',
    membershipTitle: 'உறுப்பினர்',
    membershipBody: 'உறுப்பினராகப் பதிந்து, நமது கூட்டுப் பயணத்தில் குரல் கொண்ட கோயில் குடும்பத்தின் ஒரு பகுதியாகுங்கள்.',
    volunteerTitle: 'தன்னார்வலர்',
    volunteerBody: 'திருவிழாக்கள் முதல் உணவகம் மற்றும் சமூக நிகழ்ச்சிகள் வரை சேவையில் உங்கள் நேரத்தையும் திறமையையும் வழங்குங்கள்.',
    footerRegion: 'த பேசின் · விக்டோரியா',
    backToTop: 'மேலே செல்ல',
    visit: 'வருகை',
    protectedBy: 'பாதுகாப்பு',
    developedBy: 'உருவாக்கியவர்',
    rightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    calYear: 'கோயில் நாட்காட்டி · 2026',
    eCalendarTitle: 'மின்-நாட்காட்டி',
    backToHome: 'முகப்புக்குத் திரும்ப',
    all: 'அனைத்தும்',
    observanceSingular: 'வழிபாடு',
    observancePlural: 'வழிபாடுகள்',
    noObservances: 'இந்த வகையில் வழிபாடுகள் இல்லை.',
    splashSubtitle: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    templeName: 'ஸ்ரீ வக்ரதுண்ட விநாயகர் கோயில்',
    donate: 'நன்கொடை',
    titleLine1: 'ஸ்ரீ வக்ரதுண்ட',
    titleLine2: 'விநாயகர்',
    titleLine3: 'கோயில்',
    flashLabel: 'செய்தி ஓட்டம்',
    flashItems: [
      {
        slug: 'canteen-menu',
        label: 'ஸ்ரீ கணேஷா உணவக பட்டியல்',
        body: 'ஸ்ரீ கணேஷா உணவகத்தில் தினமும் சூடான, புத்தம்புதிதாகச் சமைத்த சைவ உணவு வழங்கப்படுகிறது. டிஃபன், தோசை முதல் முழு மதிய உணவு மற்றும் மாலை பிரசாதம் வரை ஒவ்வொரு உணவும் பக்தியுடன் சமைக்கப்படுகிறது. முழு பட்டியலையும் திறக்கும் நேரத்தையும் கீழே காணுங்கள்.',
        ctaLabel: 'உணவகத்திற்குச் செல்ல',
        ctaHref: '#canteen',
      },
      {
        slug: 'pooja-times',
        label: 'தினசரி பூஜை நேரங்கள்',
        body: 'கருவறை தினமும் தரிசனம் மற்றும் அபிஷேகத்திற்காகத் திறக்கப்படுகிறது. காலை மற்றும் மாலை பூஜைகள் நித்திய ஆகம முறையைப் பின்பற்றுகின்றன. உங்கள் வருகையைத் திட்டமிட்டு இறைவனின் அருளைப் பெற தற்போதைய தரிசன நேரங்களைப் பாருங்கள்.',
        ctaLabel: 'நேரங்களைக் காண',
        ctaHref: '#timings',
      },
      {
        slug: 'weekend-abishegam',
        label: 'வார இறுதி சிறப்பு அபிஷேகம்',
        body: 'ஒவ்வொரு வார இறுதியிலும் விநாயகர் மற்றும் ஐயப்பனுக்கு நடைபெறும் சிறப்பு அபிஷேகத்தில் கலந்து கொள்ளுங்கள் — மந்திரம் மற்றும் தீபாராதனையுடன் கூடிய புனித அபிஷேக வழிபாடு. அனைத்து பக்தர்களும் அன்புடன் வரவேற்கப்படுகிறார்கள்.',
        ctaLabel: 'அட்டவணையைக் காண',
        ctaHref: '#timings',
      },
      {
        slug: 'upcoming-festivals',
        label: 'வரவிருக்கும் திருவிழாக்கள் & உற்சவங்கள்',
        body: 'ஆண்டின் புனித தாளத்திற்கேற்ப கோயில் நாட்காட்டி சுழல்கிறது — உற்சவங்கள், ஹோமங்கள், பிரதோஷங்கள் மற்றும் வழிபாடுகள். வரவிருக்கும் நிகழ்வுகளை ஆராய்ந்து உங்கள் குடும்பத்தின் திருவிழாக்களை முன்கூட்டியே குறித்துக் கொள்ளுங்கள்.',
        ctaLabel: 'நிகழ்வுகளைக் காண',
        ctaHref: '#events',
      },
    ],
    flashRead: 'தொடர்புடைய பகுதி',
    flashBackToHome: 'முகப்புக்குத் திரும்ப',
    quickEyebrow: 'ஒரு பார்வையில்',
    quickTitle: 'நேரங்களும் வேளைகளும்',
    quickTempleHours: 'கோயில் நேரம்',
    quickCanteenTimings: 'ஸ்ரீ கணேஷா உணவக நேரம்',
    quickCanteenPhone: 'உணவக தொலைபேசி',
  },
}

export const CONTENT: Record<Lang, Content> = { en, ta }

export function getContent(lang: Lang): Content {
  return CONTENT[lang]
}
