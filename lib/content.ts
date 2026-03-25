import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../keystatic.config'

export const reader = createReader(process.cwd(), keystaticConfig)

// ── Image helpers ──
// Cloud mode returns { src, alt, height, width }
// Local mode returns a string path or null
// We normalise everything to a CloudImage shape for components

export interface CloudImage {
  src: string
  alt: string
  width: number | null
  height: number | null
}

/**
 * Normalise whatever the Keystatic reader gives us into CloudImage | null.
 * Handles: cloudImage objects, plain string paths, null/undefined.
 */
function normaliseImage(
  raw: unknown,
  fallbackAlt = ''
): CloudImage | null {
  if (!raw) return null
  if (typeof raw === 'string') {
    // Local mode — just a file path
    return { src: raw, alt: fallbackAlt, width: null, height: null }
  }
  if (typeof raw === 'object' && 'src' in (raw as Record<string, unknown>)) {
    const obj = raw as { src?: string; alt?: string; width?: number; height?: number }
    if (!obj.src) return null
    return {
      src: obj.src,
      alt: obj.alt ?? fallbackAlt,
      width: obj.width ?? null,
      height: obj.height ?? null,
    }
  }
  return null
}

// ── Types ──

export interface CoachData {
  name: string
  tagline: string
  role: string
  photo: CloudImage | null
  accent: 'apollo-teal' | 'apollo-orange'
  bio: string
  stats: Array<{ value: string; label: string }>
  order: number
}

export interface ProgramData {
  title: string
  id: string
  image: CloudImage | null
  imageAlt: string
  description: string
  accent: string
  order: number
}

export interface HeroData {
  eyebrow: string
  headlineLine1: string
  headlineLine2Word1: string
  headlineLine2Word2: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  heroImage: CloudImage | null
  vimeoUrl: string
}

export interface ScheduleClassData {
  time: string
  type: string
  note: string
}

export interface ScheduleDayData {
  day: string
  shortDay: string
  subtitle: string
  classes: ScheduleClassData[]
}

export interface ScheduleData {
  days: ScheduleDayData[]
}

export interface PricingTierData {
  name: string
  price: number
  period: string
  description: string
  features: readonly string[]
  accent: 'teal' | 'orange' | 'white'
  popular: boolean
  teamUpUrl: string
}

export interface PricingData {
  sectionSubtitle: string
  tiers: PricingTierData[]
}

export interface SiteInfoData {
  studioName: string
  tagline: string
  description: string
  url: string
  address: {
    line1: string
    line2: string
    line3: string
  }
  phone: string
  email: string
  whatsappNumber: string
  instagramUrl: string
  instagramHandle: string
  googleMapsUrl: string
  logo: CloudImage | null
  teamUpBaseUrl: string
}

export interface GalleryItemData {
  caption: string
  image: CloudImage | null
  order: number
}

// ── Fetchers ──

export async function getCoaches(): Promise<CoachData[]> {
  const slugs = await reader.collections.coaches.list()
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.coaches.read(slug)
      if (!data) return null
      return {
        name: data.name,
        tagline: data.tagline,
        role: data.role,
        photo: normaliseImage(data.photo, `${data.name} — coach at Apollo Fitness`),
        accent: data.accent,
        bio: data.bio,
        stats: [...data.stats],
        order: data.order ?? 0,
      } satisfies CoachData
    })
  )
  return entries
    .filter((e): e is CoachData => e !== null)
    .sort((a, b) => a.order - b.order)
}

export async function getPrograms(): Promise<ProgramData[]> {
  const slugs = await reader.collections.programs.list()
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.programs.read(slug)
      if (!data) return null
      return {
        title: data.title,
        id: data.id,
        image: normaliseImage(data.image, data.imageAlt),
        imageAlt: data.imageAlt,
        description: data.description,
        accent: data.accent,
        order: data.order ?? 0,
      } satisfies ProgramData
    })
  )
  return entries
    .filter((e): e is ProgramData => e !== null)
    .sort((a, b) => a.order - b.order)
}

export async function getHero(): Promise<HeroData | null> {
  const data = await reader.singletons.hero.read()
  if (!data) return null
  return {
    eyebrow: data.eyebrow,
    headlineLine1: data.headlineLine1,
    headlineLine2Word1: data.headlineLine2Word1,
    headlineLine2Word2: data.headlineLine2Word2,
    subheadline: data.subheadline,
    ctaPrimary: data.ctaPrimary,
    ctaSecondary: data.ctaSecondary,
    heroImage: normaliseImage(data.heroImage, 'Apollo Fitness Studio — Training floor'),
    vimeoUrl: data.vimeoUrl,
  }
}

export async function getSchedule(): Promise<ScheduleData | null> {
  const data = await reader.singletons.schedule.read()
  if (!data) return null
  return {
    days: (data.days ?? []).map((d) => ({
      day: d.day,
      shortDay: d.shortDay,
      subtitle: d.subtitle ?? '',
      classes: (d.classes ?? []).map((c) => ({
        time: c.time,
        type: c.type,
        note: c.note ?? '',
      })),
    })),
  }
}

export async function getPricing(): Promise<PricingData | null> {
  const data = await reader.singletons.pricing.read()
  if (!data) return null
  return {
    sectionSubtitle: data.sectionSubtitle,
    tiers: (data.tiers ?? []).map((t) => ({
      name: t.name,
      price: t.price ?? 0,
      period: t.period,
      description: t.description,
      features: t.features ?? [],
      accent: t.accent as 'teal' | 'orange' | 'white',
      popular: t.popular ?? false,
      teamUpUrl: t.teamUpUrl,
    })),
  }
}

export async function getSiteInfo(): Promise<SiteInfoData | null> {
  const data = await reader.singletons.siteInfo.read()
  if (!data) return null
  return {
    studioName: data.studioName,
    tagline: data.tagline,
    description: data.description,
    url: data.url,
    address: {
      line1: data.address.line1,
      line2: data.address.line2,
      line3: data.address.line3,
    },
    phone: data.phone,
    email: data.email,
    whatsappNumber: data.whatsappNumber,
    instagramUrl: data.instagramUrl,
    instagramHandle: data.instagramHandle,
    googleMapsUrl: data.googleMapsUrl,
    logo: normaliseImage(data.logo, 'Apollo Fitness Studio logo'),
    teamUpBaseUrl: data.teamUpBaseUrl,
  }
}

export async function getGallery(): Promise<GalleryItemData[]> {
  const slugs = await reader.collections.gallery.list()
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const data = await reader.collections.gallery.read(slug)
      if (!data) return null
      return {
        caption: data.caption,
        image: normaliseImage(data.image, data.caption),
        order: data.order ?? 0,
      } satisfies GalleryItemData
    })
  )
  return entries
    .filter((e): e is GalleryItemData => e !== null)
    .sort((a, b) => a.order - b.order)
}
