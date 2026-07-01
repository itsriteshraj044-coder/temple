/**
 * Image manifest.
 *
 * These point at high-quality reference imagery as elegant placeholders.
 * To use the real temple photography, replace each `src` below with the
 * corresponding asset (e.g. drop files into /public/images and reference them
 * as '/images/hero.webp'). The layout, crops and masks are designed to flatter
 * portrait/landscape temple photography. The <Img> component degrades
 * gracefully to /images/placeholder.svg if any source fails to load.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  // The temple's own official emblem (Sri Vakrathunda Vinayagar), reused from
  // the reference site — a transparent PNG line-art seal of Lord Vinayagar.
  emblem: '/images/svvt-emblem.webp',
  emblemAlt: 'Official emblem of Sri Vakrathunda Vinayagar Temple, Australia',

  // Hero deity composition: stable Ayyappa murti in front, rotating Chakara behind.
  ayyappa: '/images/Ayyappa.webp',
  ayyappaAlt: 'Lord Ayyappa',
  chakara: '/images/Chakara.webp',
  chakaraAlt: 'Rotating sacred chakra',

  hero: u('1604608672516-f1b9b1d37076', 2000), // Ganesha murti (hero unchanged)
  heroAlt: 'Sacred murti of Lord Ganesha adorned with flowers',

  // Feature-section imagery — real photographs from the temple's festivals.
  about: '/images/web/shasti/02.webp',
  aboutAlt: 'The garlanded golden murti enshrined at the temple',

  history: '/images/granite-shrine.webp',
  historyAlt: 'The hand-carved granite shrine with its sculpted gopuram and deity niches inside the temple',

  canteen: '/images/web/shasti/07.webp',
  canteenAlt: 'Fruits and prasadam offerings arranged for devotees',

  donate: '/images/web/donate.webp',
  donateAlt: 'Devotees carrying the golden festival murti of Lord Vinayagar in procession before the granite gopuram',

  join: '/images/community-family.webp',
  joinAlt: 'Trustees and members of the temple community gathered together',

  // Section-wise gallery — each festival album with its own heading.
  gallerySections: [
    {
      title: 'Mahotsavam 2025',
      blurb: 'The grand annual festival — processions, music and devotion in full bloom.',
      photos: [
        { src: '/images/web/mahotsavam/06.webp', alt: 'Priests offering deepa aarti to the adorned utsava murti during Mahotsavam' },
        { src: '/images/web/mahotsavam/05.webp', alt: 'Young boys sounding the sacred conch (shanku)' },
        { src: '/images/web/mahotsavam/02.webp', alt: 'Children offering aarti during Mahotsavam' },
        { src: '/images/web/mahotsavam/01.webp', alt: 'A thavil drummer performing in the temple hall' },
        { src: '/images/web/mahotsavam/04.webp', alt: 'The utsava murti adorned with flowers on the festival vahanam' },
        { src: '/images/web/mahotsavam/03.webp', alt: 'Priests performing the sacred flag-hoisting rite to open the festival' },
      ],
    },
    {
      title: 'Bhavahostam 2025',
      blurb: 'Sacred rites, abishegam and the radiant evening float festival.',
      photos: [
        { src: '/images/web/bhavahostam/06.webp', alt: 'Evening float festival of the deity before the illuminated temple' },
        { src: '/images/web/bhavahostam/08.webp', alt: 'Priests performing abishegam at the golden Vinayagar shrine' },
        { src: '/images/web/bhavahostam/03.webp', alt: 'Devotees at darshan before the decorated golden sanctum' },
        { src: '/images/web/bhavahostam/05.webp', alt: 'A young devotee reciting prayers during the festival' },
        { src: '/images/web/bhavahostam/07.webp', alt: 'Nadaswaram and thavil musicians leading the procession' },
        { src: '/images/web/bhavahostam/02.webp', alt: 'The garlanded stone murti of Lord Murugan honoured during the festival' },
      ],
    },
    {
      title: 'Shasti 2025',
      blurb: 'Skanda Shasti — deeparadhana, the peacock vahanam and offerings of gratitude.',
      photos: [
        { src: '/images/web/shasti/03.webp', alt: 'Priests offering deeparadhana with rows of sacred lamps' },
        { src: '/images/web/shasti/04.webp', alt: 'Aarti offered to the deity upon the golden peacock vahanam' },
        { src: '/images/web/shasti/02.webp', alt: 'The garlanded golden murti of Lord Murugan at Shasti' },
        { src: '/images/web/shasti/07.webp', alt: 'Fruits and offerings arranged for the Shasti pooja' },
        { src: '/images/web/shasti/01.webp', alt: 'Devotees gathered in the hall for the Shasti observance' },
        { src: '/images/web/shasti/08.webp', alt: 'A priest performing pooja at the golden sanctum during Shasti' },
      ],
    },
  ],

  fallback: '/images/placeholder.svg',
} as const
