/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 *
 * Customize your landing page by editing the values below.
 * All text, links, and settings are centralized here for easy editing.
 */

export const siteConfig = {
  name: "Apollo Fitness Studio",
  tagline: "Your Strength, Our Focus.",
  description:
    "Apollo Fitness Studio in Maidenhead offers expert-led strength & conditioning sessions, WODs, and yoga classes. No mirrors. No egos. Just progress.",
  url: "https://apollofitnessstudio.com",
  twitter: "@apollofitnessstudio",

  nav: {
    cta: {
      text: "Join Us",
      href: "#contact",
    },
    signIn: {
      text: "Book a Class",
      href: "#contact",
    },
  },
} as const;

/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
 *
 * Toggle features on/off without touching component code.
 */
export const features = {
  smoothScroll: false,
  darkMode: true,
} as const;

/**
 * ============================================================================
 * THEME CONFIGURATION
 * ============================================================================
 *
 * Colors are defined in globals.css using CSS custom properties.
 * This config controls which theme features are enabled.
 */
export const themeConfig = {
  defaultTheme: "dark" as const,
  enableSystem: true,
} as const;
