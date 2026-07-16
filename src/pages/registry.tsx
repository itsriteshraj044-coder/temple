import { lazy, type ComponentType } from 'react'

/**
 * Central registry of standalone routes → page component. Adding a page is a
 * one-line change here; the router and App never need editing. Components are
 * lazy-loaded so each page ships in its own chunk and the homepage stays lean.
 */
export const PAGES: Record<string, ComponentType> = {
  // Existing standalone pages (were previously switch-cased in App).
  '/e-calendar': lazy(() => import('@/components/sections/ECalendar').then((m) => ({ default: m.ECalendar }))),
  '/daily-pooja': lazy(() => import('@/components/sections/DailyPooja').then((m) => ({ default: m.DailyPooja }))),
  '/canteen-menu': lazy(() => import('@/components/sections/CanteenMenu').then((m) => ({ default: m.CanteenMenu }))),
  '/abishegam': lazy(() => import('@/components/sections/Abishegam').then((m) => ({ default: m.Abishegam }))),
  '/festivals': lazy(() => import('@/components/sections/Festivals').then((m) => ({ default: m.Festivals }))),

  // Phase 1 — top-level header pages.
  '/about-temple': lazy(() => import('@/pages/AboutTemple').then((m) => ({ default: m.AboutTemple }))),
  '/services': lazy(() => import('@/pages/Services').then((m) => ({ default: m.Services }))),
  '/canteen': lazy(() => import('@/pages/Canteen').then((m) => ({ default: m.Canteen }))),
  '/events': lazy(() => import('@/pages/Events').then((m) => ({ default: m.Events }))),
  '/how-to-donate': lazy(() => import('@/pages/Donate').then((m) => ({ default: m.Donate }))),
  '/join-us': lazy(() => import('@/pages/JoinUs').then((m) => ({ default: m.JoinUs }))),
  '/contacts': lazy(() => import('@/pages/Contacts').then((m) => ({ default: m.Contacts }))),

  // Phase 2 — About-section child pages.
  '/history': lazy(() => import('@/pages/History').then((m) => ({ default: m.History }))),
  '/deities': lazy(() => import('@/pages/Deities').then((m) => ({ default: m.Deities }))),
  '/miracles': lazy(() => import('@/pages/Miracles').then((m) => ({ default: m.Miracles }))),
  '/community-hub': lazy(() => import('@/pages/CommunityHub').then((m) => ({ default: m.CommunityHub }))),
  '/trustees': lazy(() => import('@/pages/Trustees').then((m) => ({ default: m.Trustees }))),
  '/management-team': lazy(() => import('@/pages/ManagementTeam').then((m) => ({ default: m.ManagementTeam }))),
  '/priests': lazy(() => import('@/pages/Priests').then((m) => ({ default: m.Priests }))),
  '/temple-staff': lazy(() => import('@/pages/TempleStaff').then((m) => ({ default: m.TempleStaff }))),
  '/media': lazy(() => import('@/pages/Media').then((m) => ({ default: m.Media }))),
  '/granite-shrine': lazy(() => import('@/pages/GraniteShrine').then((m) => ({ default: m.GraniteShrine }))),
  '/opening-hours': lazy(() => import('@/pages/OpeningHours').then((m) => ({ default: m.OpeningHours }))),

  // Phase 3 — Services / Canteen / Events / Join child pages.
  '/pooja-service': lazy(() => import('@/pages/PoojaService').then((m) => ({ default: m.PoojaService }))),
  '/wedding-services': lazy(() => import('@/pages/WeddingServices').then((m) => ({ default: m.WeddingServices }))),
  '/pooja-bookings': lazy(() => import('@/pages/PoojaBookings').then((m) => ({ default: m.PoojaBookings }))),
  '/community-services': lazy(() => import('@/pages/CommunityServices').then((m) => ({ default: m.CommunityServices }))),
  '/catering': lazy(() => import('@/pages/Catering').then((m) => ({ default: m.Catering }))),
  '/community-events': lazy(() => import('@/pages/CommunityEvents').then((m) => ({ default: m.CommunityEvents }))),
  '/become-a-member': lazy(() => import('@/pages/BecomeMember').then((m) => ({ default: m.BecomeMember }))),
  '/volunteering': lazy(() => import('@/pages/Volunteering').then((m) => ({ default: m.Volunteering }))),
}
