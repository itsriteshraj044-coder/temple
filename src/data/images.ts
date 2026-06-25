/**
 * Image manifest.
 *
 * These point at high-quality reference imagery as elegant placeholders.
 * To use the real temple photography, replace each `src` below with the
 * corresponding asset (e.g. drop files into /public/images and reference them
 * as '/images/hero.jpg'). The layout, crops and masks are designed to flatter
 * portrait/landscape temple photography. The <Img> component degrades
 * gracefully to /images/placeholder.svg if any source fails to load.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  // The temple's own official emblem (Sri Vakrathunda Vinayagar), reused from
  // the reference site — a transparent PNG line-art seal of Lord Vinayagar.
  emblem: '/images/svvt-emblem.png',
  emblemAlt: 'Official emblem of Sri Vakrathunda Vinayagar Temple, Australia',

  // Hero deity composition: stable Ayyappa murti in front, rotating Chakara behind.
  ayyappa: '/images/Ayyappa.png',
  ayyappaAlt: 'Lord Ayyappa',
  chakara: '/images/Chakara.png',
  chakaraAlt: 'Rotating sacred chakra',

  hero: u('1604608672516-f1b9b1d37076', 2000), // Ganesha murti (hero unchanged)
  heroAlt: 'Sacred murti of Lord Ganesha adorned with flowers',

  // Feature-section imagery — real photographs from the temple's festivals.
  about: '/images/web/shasti/02.jpg',
  aboutAlt: 'The garlanded golden murti enshrined at the temple',

  history: '/images/web/bhavahostam/06.jpg',
  historyAlt: 'The illuminated temple during the evening float festival',

  canteen: '/images/web/shasti/07.jpg',
  canteenAlt: 'Fruits and prasadam offerings arranged for devotees',

  donate: '/images/web/shasti/03.jpg',
  donateAlt: 'Rows of sacred lamps glowing during deeparadhana',

  join: '/images/web/mahotsavam/02.jpg',
  joinAlt: 'Devotees and children offering aarti together',

  // Section-wise gallery — each festival album with its own heading.
  gallerySections: [
    {
      title: 'Mahotsavam 2025',
      blurb: 'The grand annual festival — processions, music and devotion in full bloom.',
      album: { dir: '/images/album/mahotsavam', count: 40 },
      photos: [
        { src: '/images/web/mahotsavam/06.jpg', alt: 'The deity carried in procession on the shoulders of devotees' },
        { src: '/images/web/mahotsavam/05.jpg', alt: 'Young boys sounding the sacred conch (shanku)' },
        { src: '/images/web/mahotsavam/02.jpg', alt: 'Children offering aarti during Mahotsavam' },
        { src: '/images/web/mahotsavam/01.jpg', alt: 'A thavil drummer performing in the temple hall' },
        { src: '/images/web/mahotsavam/04.jpg', alt: 'The utsava murti adorned with flowers on the festival vahanam' },
      ],
    },
    {
      title: 'Bhavahostam 2025',
      blurb: 'Sacred rites, abishegam and the radiant evening float festival.',
      album: { dir: '/images/album/bhavahostam', count: 40 },
      photos: [
        { src: '/images/web/bhavahostam/06.jpg', alt: 'Evening float festival of the deity before the illuminated temple' },
        { src: '/images/web/bhavahostam/08.jpg', alt: 'Priests performing abishegam at the golden Vinayagar shrine' },
        { src: '/images/web/bhavahostam/03.jpg', alt: 'Devotees at darshan before the decorated golden sanctum' },
        { src: '/images/web/bhavahostam/05.jpg', alt: 'A young devotee reciting prayers during the festival' },
        { src: '/images/web/bhavahostam/07.jpg', alt: 'Nadaswaram and thavil musicians leading the procession' },
      ],
    },
    {
      title: 'Shasti 2025',
      blurb: 'Skanda Shasti — deeparadhana, the peacock vahanam and offerings of gratitude.',
      album: { dir: '/images/album/shasti', count: 40 },
      photos: [
        { src: '/images/web/shasti/03.jpg', alt: 'Priests offering deeparadhana with rows of sacred lamps' },
        { src: '/images/web/shasti/04.jpg', alt: 'Aarti offered to the deity upon the golden peacock vahanam' },
        { src: '/images/web/shasti/02.jpg', alt: 'The garlanded golden murti of Lord Murugan at Shasti' },
        { src: '/images/web/shasti/07.jpg', alt: 'Fruits and offerings arranged for the Shasti pooja' },
        { src: '/images/web/shasti/01.jpg', alt: 'Devotees gathered in the hall for the Shasti observance' },
      ],
    },
  ],

  fallback: '/images/placeholder.svg',
} as const
