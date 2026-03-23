# Changelog — Apollo Fitness Studio Website

## 2026-03-23 — Major Rebuild

### 1. Logo Fix (CRITICAL)
- **Removed** the 40x40 rounded square crop and extra "APOLLO" text span
- Logo now renders at proper landscape aspect ratio (`h-10 w-auto` on mobile, `h-12` on desktop)
- The full "APOLLO FITNESS STUDIO" wordmark is now visible as intended
- Added mobile hamburger menu with animated toggle

### 2. Coaches — Both Named Alex
- Changed Coach 1 from "Ed" to "Alex" with tagline **"The Programmer"** (teal accent)
- Coach 2 remains "Alex" with tagline **"The Engine"** (orange accent)
- Each card now shows "Coach Alex" with distinct tagline, accent colour, and bio
- Used `coach.tagline` as React key instead of name to avoid duplicate key issues

### 3. Schedule — Native Timetable Component
- **Replaced** the static PNG timetable image with a fully native HTML/CSS component
- Mobile: accordion-style day-by-day expansion with smooth CSS grid animation
- Desktop: clean grid layout with 2-column class pills per day
- Colour-coded by class type:
  - **WOD** → orange
  - **S&C** → teal
  - **Pilates** → purple
  - **Yoga** → indigo
- Each class shows a coloured dot, time, and type
- Thursday tagged with "HYROX DAY" badge
- Saturday shows "Team Workout!" note
- Added colour legend below the CTA

### 4. Hero Video — Desktop Fix
- **Mobile:** Video iframe retained (portrait Vimeo video works naturally on mobile viewports)
- **Desktop:** Replaced video with **ReactBits Silk Waves** WebGL shader background using Apollo brand colours (black, teal, orange)
- Added gradient overlay for text readability on desktop
- Silk Waves lazy-loaded with `next/dynamic` + `ssr: false` for performance

### 5. ReactBits Pro Integration
- Set up `.env.local` with license key
- Configured `components.json` with `@reactbits-starter` and `@reactbits-pro` registries
- Installed **Silk Waves** component (`components/react-bits/silk-waves.tsx`)
- Installed **Staggered Text** component (`components/react-bits/staggered-text.tsx`) — available for future use
- Added `// @ts-nocheck` to ReactBits generated files to fix strict TypeScript errors
- Set up `lib/utils.ts` with `cn()` utility via shadcn init

### 6. General Polish & Cleanup
- **Removed 16 unused template components:** `apollo-about`, `apollo-faq`, `apollo-footer`, `apollo-header`, `apollo-hero`, `apollo-services`, `apollo-timetable`, `contact`, `gallery`, `providers`, `skip-to-content`, `smooth-scroll`, `theme-switch`, `theme-toggle`, `video`, `water-ripple`
- **Cleaned globals.css** — removed shadcn's default light/dark theme variables and `@layer base` overrides that conflicted with Apollo's dark-only design
- Added CSS for schedule accordion animation (`.schedule-accordion-content`)
- Mobile header now has a working hamburger menu with nav links
- All scroll-to-section links work correctly
- Build passes cleanly with zero errors

### Files Changed
- `components/header.tsx` — logo fix, mobile menu
- `components/hero.tsx` — Silk Waves desktop, video mobile-only
- `components/coaches.tsx` — both Alex, distinct identities
- `components/schedule.tsx` — full native timetable
- `app/globals.css` — cleaned up, added accordion styles
- `components.json` — ReactBits registries added
- `.env.local` — ReactBits license key
- `lib/utils.ts` — cn() utility (via shadcn)
- `components/react-bits/silk-waves.tsx` — installed
- `components/react-bits/staggered-text.tsx` — installed
- `components/ui/button.tsx` — installed (shadcn init)
