'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import type { SiteInfoData } from '@/lib/content'

const DIRECTIONS = [
  { step: '1', text: 'Head to Padel Maidenhead on Braywick Road (opposite Braywick Park)' },
  { step: '2', text: 'Enter through the main Padel Maidenhead entrance' },
  { step: '3', text: 'Apollo Fitness Studio is inside — you\'ll see us immediately' },
]

export function Location({ siteInfo }: { siteInfo: SiteInfoData | null }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const googleMapsUrl = siteInfo?.googleMapsUrl ?? 'https://www.google.com/maps/place/Apollo+Fitness+Studio/@51.5132968,-0.7167016,17z/data=!4m6!3m5!1s0x48767d123b6dee05:0x99dbc9d0a38dc59b!8m2!3d51.5132968!4d-0.7167016!16s%2Fg%2F11xln57c8g'
  const name = siteInfo?.studioName ?? 'Apollo Fitness Studio'
  const address = siteInfo?.address ?? { line1: 'Inside Padel Maidenhead', line2: 'Braywick Road', line3: 'Maidenhead SL6 1BN' }

  return (
    <section
      ref={ref}
      id="location"
      className="py-20 md:py-28 bg-apollo-black relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-apollo-teal text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Find Us
          </p>
          <h2 className="font-display font-bold text-heading-lg uppercase">
            {address.line1}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Interactive map card */}
          <motion.a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-apollo-card border border-white/5 hover:border-apollo-teal/20 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Dark map — using a styled embed that matches the aesthetic */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[400px] bg-[#1a1a2e] overflow-hidden">
              {/* Stylized map background with road grid */}
              <svg
                viewBox="0 0 800 600"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="40%">
                    <stop offset="0%" stopColor="rgba(87,181,160,0.08)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Dark base */}
                <rect width="800" height="600" fill="#0f0f1a" />

                {/* Subtle area fills — parks/green spaces near Braywick */}
                <rect x="500" y="50" width="280" height="200" rx="8" fill="rgba(87,181,160,0.04)" />
                <rect x="50" y="350" width="200" height="230" rx="8" fill="rgba(87,181,160,0.03)" />

                {/* Road network — stylized */}
                {/* Braywick Road (main, horizontal) */}
                <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(255,255,255,0.04)" strokeWidth="24" />

                {/* A308 (vertical) */}
                <line x1="200" y1="0" x2="200" y2="600" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />

                {/* Side roads */}
                <line x1="350" y1="180" x2="350" y2="420" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                <line x1="100" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                <line x1="100" y1="420" x2="600" y2="420" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                <line x1="550" y1="200" x2="550" y2="400" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />

                {/* Glow around pin location */}
                <circle cx="400" cy="280" r="120" fill="url(#mapGlow)" />
                <circle cx="400" cy="280" r="60" fill="rgba(87,181,160,0.06)" />

                {/* Pin — animated teal dot */}
                <circle cx="400" cy="280" r="8" fill="#57B5A0" opacity="0.9">
                  <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="280" r="4" fill="#57B5A0" />

                {/* Road labels */}
                <text x="600" y="290" fill="rgba(255,255,255,0.15)" fontSize="10" fontFamily="sans-serif" letterSpacing="2">BRAYWICK ROAD</text>
                <text x="210" y="150" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="sans-serif" letterSpacing="2" transform="rotate(90, 210, 150)">A308</text>
              </svg>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-apollo-teal/0 group-hover:bg-apollo-teal/5 transition-colors duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-apollo-black/80 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-apollo-teal">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span className="text-sm text-white font-medium">Open in Google Maps</span>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Right: Details + directions */}
          <div className="flex flex-col justify-center gap-8">
            {/* Address card */}
            <motion.div
              className="bg-apollo-card p-6 md:p-8 border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-apollo-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-apollo-teal">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg uppercase mb-1">{name}</h3>
                  <p className="text-apollo-muted text-sm leading-relaxed">
                    {address.line1}<br />
                    {address.line2}<br />
                    {address.line3}
                  </p>
                </div>
              </div>

              {/* Quick info pills */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-apollo-muted">
                  📍 Opposite Braywick Park
                </span>
              </div>
            </motion.div>

            {/* How to find us */}
            <motion.div
              className="bg-apollo-card p-6 md:p-8 border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-apollo-teal mb-5">
                How to Find Us
              </h4>
              <ol className="space-y-4">
                {DIRECTIONS.map((d) => (
                  <li key={d.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-apollo-teal/10 text-apollo-teal text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {d.step}
                    </span>
                    <span className="text-sm text-apollo-muted leading-relaxed">{d.text}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* CTA */}
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-apollo-teal/10 hover:bg-apollo-teal/20 text-apollo-teal border border-apollo-teal/20 px-6 py-3.5 font-display font-medium text-sm uppercase tracking-wider transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
