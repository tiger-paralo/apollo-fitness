# Apollo Website Level-Up Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Level up the Apollo Fitness Studio website with Lenis smooth scrolling, GSAP ScrollTrigger animations, StaggeredText hero, scroll-velocity marquee, animated stats, mobile CTA fix, Vimeo crash fix, and section layout variety.

**Architecture:** Replace CSS-based scroll-reveal with GSAP ScrollTrigger for all section animations. Add Lenis smooth scrolling at the app level. Create new ReactBits components (ScrollVelocity). Use existing StaggeredText for hero. Lazy-load Vimeo iframe to fix iOS crashes.

**Tech Stack:** Next.js 16, React 19, GSAP 3.14 + ScrollTrigger, Lenis 1.3, Motion 12 (for StaggeredText/ScrollVelocity), Tailwind CSS v4

---

## Task 1: Fix Mobile CTA Bug

**Files:**
- Modify: `components/hero.tsx:17` — add `id="hero"` to the section element

**Step 1: Add id="hero"**

In `components/hero.tsx` line 17, change:
```tsx
<section className="hero relative min-h-screen flex items-center overflow-hidden">
```
to:
```tsx
<section id="hero" className="hero relative min-h-screen flex items-center overflow-hidden">
```

That's it. The MobileCTA component already references `document.getElementById('hero')`.

**Step 2: Commit**
```bash
git add components/hero.tsx
git commit -m "fix: add id=hero so MobileCTA becomes visible on scroll"
```

---

## Task 2: Create Lenis Smooth Scrolling Provider

**Files:**
- Create: `components/lenis-provider.tsx`
- Modify: `app/layout.tsx` — wrap children with LenisProvider
- Modify: `app/globals.css` — remove `scroll-behavior: smooth` (conflicts with Lenis)

**Step 1: Create LenisProvider component**

Create `components/lenis-provider.tsx`:
```tsx
'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

**Step 2: Wrap app in LenisProvider**

In `app/layout.tsx`, import and wrap `{children}` with `<LenisProvider>`:
```tsx
import { LenisProvider } from '@/components/lenis-provider'

// Inside body:
<LenisProvider>
  {children}
</LenisProvider>
```

**Step 3: Remove conflicting CSS**

In `app/globals.css`, remove `scroll-behavior: smooth;` from the `html` rule (Lenis handles smooth scrolling now).

**Step 4: Commit**
```bash
git add components/lenis-provider.tsx app/layout.tsx app/globals.css
git commit -m "feat: activate Lenis smooth scrolling"
```

---

## Task 3: Wire Up GSAP ScrollTrigger Animations

**Files:**
- Modify: `components/why-different.tsx` — replace useReveal with GSAP
- Modify: `components/programs.tsx` — replace useReveal with GSAP, add parallax on images
- Modify: `components/coaches.tsx` — replace useReveal with GSAP, parallax on photos
- Modify: `components/schedule.tsx` — replace useReveal with GSAP
- Modify: `components/footer.tsx` — replace useReveal with GSAP
- Modify: `app/globals.css` — remove `.reveal` CSS (no longer needed)
- Keep: `hooks/useReveal.ts` — leave in place but unused (can be cleaned up later)

**Approach:** Each section registers its own GSAP ScrollTrigger animations in a useEffect/useLayoutEffect. Use `gsap.registerPlugin(ScrollTrigger)` in each component. Use `gsap.context()` for cleanup. Stagger child elements. Add parallax (y translation) on images. Respect `prefers-reduced-motion`.

**Step 1: Update WhyDifferent with GSAP**

Replace `useReveal` with GSAP animations. The stat cards stagger in from below with opacity. The header slides in from left.

**Step 2: Update Programs with GSAP**

Program cards stagger in. Images get subtle parallax (move slower than scroll).

**Step 3: Update Coaches with GSAP**

Coach cards animate in — first from left, second from right (alternating). Photos get parallax.

**Step 4: Update Schedule with GSAP**

Two-column layout animates in — left column from left, right column from right.

**Step 5: Update Footer with GSAP**

Simple fade+slide up with stagger.

**Step 6: Clean up globals.css**

Remove the `.reveal`, `.reveal-ready`, `.reveal-ready .reveal`, `.reveal-ready .reveal.visible`, `.reveal.visible` CSS rules. Keep the `prefers-reduced-motion` media query but update it.

**Step 7: Commit**
```bash
git add components/why-different.tsx components/programs.tsx components/coaches.tsx components/schedule.tsx components/footer.tsx app/globals.css
git commit -m "feat: replace CSS scroll-reveal with GSAP ScrollTrigger animations"
```

---

## Task 4: StaggeredText Hero Headline

**Files:**
- Modify: `components/hero.tsx` — import and use StaggeredText for the h1

**Step 1: Replace the h1 with StaggeredText**

Import `StaggeredText` from `@/components/react-bits/staggered-text`. Replace the existing h1 block (lines 64-69) with two StaggeredText instances:
- "BUILD YOUR" — first line
- "STRONGEST SELF" — second line, with the "STRONGEST" word styled in orange

Since StaggeredText renders as spans, we wrap it in an h1 container div. Use `segmentBy="words"`, `staggerDirection="center"`, `delay={100}`, `duration={0.8}`, `blur={true}`, `direction="bottom"`.

For the orange "STRONGEST" we'll need to handle this outside StaggeredText since it doesn't support per-word styling. Use two StaggeredText components on separate lines, or a single one with the full text and apply the orange color to the container knowing "STRONGEST" won't be individually styled. Best approach: Use a single StaggeredText for "BUILD YOUR" and another for "STRONGEST SELF" where the second one has `className` for orange on just the STRONGEST word — but that won't work per-word.

Simplest premium approach: Use StaggeredText for the full headline "BUILD YOUR STRONGEST SELF" with `segmentBy="words"`, and manually style the word. Since StaggeredText renders each word as a `<motion.span>`, we can't conditionally style one word. Instead, use TWO StaggeredText components:
1. "BUILD YOUR" — white
2. "STRONGEST SELF" — wrap in a container, the StaggeredText will animate the words

Actually, the cleanest approach: Keep the h1 wrapper with the Oswald font classes, and nest two StaggeredText components (one for each line), with the second having the orange class on its wrapper. We style the "STRONGEST" word via CSS on the first word of the second line.

**Step 2: Commit**
```bash
git add components/hero.tsx
git commit -m "feat: use StaggeredText for premium hero headline animation"
```

---

## Task 5: ScrollVelocity Marquee

**Files:**
- Create: `components/react-bits/scroll-velocity.tsx` — port from ReactBits
- Create: `components/marquee.tsx` — wrapper component for the marquee section
- Modify: `app/page.tsx` — add Marquee between WhyDifferent and Programs

**Step 1: Create ScrollVelocity component**

Port the ReactBits ScrollVelocity component to TypeScript. It uses `motion/react` hooks (useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame). Replace CSS file with Tailwind classes.

**Step 2: Create Marquee section component**

Create `components/marquee.tsx` that uses ScrollVelocity with:
- `texts={['STRENGTH • COMMUNITY • PROGRESS • FUNCTIONAL FITNESS •', 'STRENGTH • COMMUNITY • PROGRESS • FUNCTIONAL FITNESS •']}`
- `velocity={80}`
- Font: Oswald display, uppercase, large
- Colors: white text with low opacity, or teal/orange accents

**Step 3: Add to page**

In `app/page.tsx`, import Marquee and place it between `<WhyDifferent />` and `<Programs />`.

**Step 4: Commit**
```bash
git add components/react-bits/scroll-velocity.tsx components/marquee.tsx app/page.tsx
git commit -m "feat: add scroll-velocity marquee between sections"
```

---

## Task 6: Improve Section Variety

**Files:**
- Modify: `components/coaches.tsx` — alternating layout (image-left/text-right, then flipped)
- Modify: `components/why-different.tsx` — different heading alignment, remove teal eyebrow pattern
- Modify: `components/programs.tsx` — asymmetric grid (first program large)

**Step 1: Coaches alternating layout**

Instead of identical cards, make the first coach image-left text-right, and the second coach text-left image-right. Use full-width cards (not 2-col grid) stacked vertically with alternating flex-direction.

**Step 2: Programs asymmetric grid**

Make the first program span 2 rows in the grid (tall feature card), with the other two stacked to its right.

**Step 3: WhyDifferent heading variety**

Move heading to center-aligned. Remove the teal eyebrow line pattern (use a different visual treatment — e.g., just a subtle teal gradient or no eyebrow at all, let the large heading speak for itself).

**Step 4: Commit**
```bash
git add components/coaches.tsx components/programs.tsx components/why-different.tsx
git commit -m "feat: improve section variety — alternating coaches, asymmetric programs, centered stats"
```

---

## Task 7: Fix Vimeo Iframe Crash on Mobile

**Files:**
- Modify: `components/hero.tsx` — lazy-load iframe with IntersectionObserver, unmount when scrolled away

**Step 1: Lazy-load and unmount Vimeo iframe**

Replace the static iframe with a component that:
1. Uses IntersectionObserver with a generous rootMargin (e.g., `"200px"`) to detect when the hero is near viewport
2. Only renders the iframe when in/near viewport
3. Unmounts the iframe when scrolled 2 viewports away (rootMargin: `"-100% 0px"` or similar)
4. Shows a dark placeholder when iframe is not mounted

This prevents the Vimeo iframe from consuming resources when not visible, which causes the iOS Safari crash.

**Step 2: Commit**
```bash
git add components/hero.tsx
git commit -m "fix: lazy-load Vimeo iframe on mobile to prevent iOS Safari crash"
```

---

## Task 8: Animated Stats (CountUp)

**Files:**
- Modify: `components/why-different.tsx` — animate stat numbers with GSAP ScrollTrigger

**Step 1: Add GSAP count-up animation**

In the WhyDifferent component, use GSAP ScrollTrigger to animate:
- "8" counts up from 0 to 8
- "2" and "8" in "2:8" count up
- "0" in "0ego" — just reveal with a scale/bounce effect (it's already 0)

Use `gsap.to()` with a proxy object, updating state on each frame. Or use GSAP's `textContent` tween with `snap` for integers.

This integrates naturally into Task 3's GSAP work on WhyDifferent.

**Step 2: Commit**
```bash
git add components/why-different.tsx
git commit -m "feat: animate stat numbers with GSAP count-up on scroll"
```

---

## Task 9: Build Verification

**Step 1: Run build**
```bash
npm run build
```

**Step 2: Fix any build errors**

Address TypeScript errors, missing imports, or other build failures.

**Step 3: Final commit if needed**

**Step 4: Send completion event**
```bash
openclaw system event --text "Done: Apollo website levelled up — Lenis, GSAP ScrollTrigger, StaggeredText hero, marquee, animated stats, mobile CTA fix, Vimeo crash fix" --mode now
```
