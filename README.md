# Sri Vakrathunda Vinayagar Temple — Homepage

A premium, immersive redesign of the homepage for **Sri Vakrathunda Vinayagar
Temple**, The Basin, Victoria (reference: mvhs.org.au). The visual language is
modern, editorial and spiritual while preserving the temple's identity, content,
navigation and section sequence.

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **GSAP** + ScrollTrigger — scroll reveals, parallax, masked text reveals
- **Motion** (Framer Motion) — hover & micro-interactions
- **Three.js** via **React Three Fiber** + **Drei** — subtle sacred diya particles in the hero
- **Lenis** — cinematic smooth scrolling
- **Swiper** — events carousel
- **React Icons**

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    layout/      Navbar, Footer
    sections/    Hero, About, History, Services, Canteen, Events,
                 Timings, Donate, Join, Gallery, Contact
    three/       SacredParticles (R3F diya embers, lazy-loaded)
    ui/          Button, Img, Reveal, SectionHeading, ScrollProgress
  hooks/         useReveal, useParallax, useTextReveal (reusable GSAP hooks)
  providers/     SmoothScroll (Lenis + ScrollTrigger sync)
  data/          content.ts (all preserved copy), images.ts (image manifest)
  lib/           gsap.ts (plugin registration + reduced-motion helper)
  index.css      design tokens + base styles
```

## Design system

Palette is drawn from the temple's existing identity — **saffron, maroon, gold,
cream, white** — defined as Tailwind tokens in `src/index.css`:
`maroon-*`, `saffron-*`, `gold-*`, `cream-*`, `ink-*`.

Typography pairs **Playfair Display** / **Cormorant Garamond** (display & serif)
with **Inter** (body), loaded in `index.html`.

## Content is preserved

All copy — temple name, address, phone, navigation, services, events, temple &
canteen hours — lives in `src/data/content.ts` and is taken verbatim from the
original site. Only the presentation/layout was redesigned. The navigation
structure and section sequence are unchanged.

## Swapping in the real temple photography

`src/data/images.ts` currently references high-quality reference imagery as
elegant placeholders. To use the temple's own photos, either:

1. Drop the files into `public/images/` and update each `src` to e.g.
   `'/images/hero.jpg'`, or
2. Replace the URLs directly.

The `<Img>` component lazy-loads, shows a shimmer placeholder, and gracefully
falls back to `public/images/placeholder.svg` if any source fails — so the
layout never breaks.

## Accessibility & performance

- `prefers-reduced-motion` disables smooth scroll, parallax and reveals.
- Keyboard focus rings, ARIA labels on icon-only controls, semantic landmarks.
- Images are lazy-loaded; the Three.js canvas is code-split and loaded off the
  critical path.
- Responsive from 320px → 3840px (32" desktop friendly).
```
