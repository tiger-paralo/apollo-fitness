'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import StaggeredText from '@/components/react-bits/staggered-text'

function LazyVimeoVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        setShouldLoad(entries[0]?.isIntersecting ?? false)
      },
      { threshold: 0.1, rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {shouldLoad && (
        <iframe
          src="https://player.vimeo.com/video/1101338417?h=cc9df9cc81&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-auto min-w-full h-full object-cover pointer-events-none"
          style={{ aspectRatio: '9/16' }}
        />
      )}
    </div>
  )
}

export function Hero() {
  const scrollToPrograms = () => {
    const section = document.getElementById('programs')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="hero relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background — Mobile only (lazy-loaded, unmounts when offscreen) */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-apollo-black/40 via-apollo-black/60 to-apollo-black/95" />
        <LazyVimeoVideo />
      </div>

      {/* Ambient Gradient Background — Desktop only */}
      <div className="absolute inset-0 z-0 hidden md:block overflow-hidden bg-apollo-black">
        <div
          className="absolute -top-1/3 -left-1/4 w-2/3 h-2/3 rounded-full bg-apollo-teal/[0.07] blur-[100px]"
          style={{ animation: 'hero-glow 12s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 w-2/3 h-2/3 rounded-full bg-apollo-orange/[0.05] blur-[100px]"
          style={{ animation: 'hero-glow 12s ease-in-out infinite reverse' }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-apollo-black/80 via-apollo-black/50 to-apollo-black/70" />
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px'
        }}
      />

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-6 relative z-30">
        <div className="max-w-4xl pt-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-apollo-teal" />
            <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal">
              Maidenhead&apos;s Boutique Fitness Studio
            </span>
          </div>

          {/* Main Headline — StaggeredText */}
          <h1 className="font-display font-bold text-hero uppercase leading-[1.05] tracking-tight mb-6">
            <StaggeredText
              text="Build Your"
              as="span"
              className="block"
              segmentBy="words"
              delay={100}
              duration={0.7}
              direction="bottom"
              blur={true}
              staggerDirection="forward"
            />
            <span className="block">
              <StaggeredText
                text="Strongest"
                as="span"
                className="text-apollo-orange"
                segmentBy="words"
                delay={100}
                duration={0.7}
                direction="bottom"
                blur={true}
                staggerDirection="forward"
              />
              {' '}
              <StaggeredText
                text="Self"
                as="span"
                className=""
                segmentBy="words"
                delay={100}
                duration={0.7}
                direction="bottom"
                blur={true}
                staggerDirection="forward"
              />
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-apollo-muted max-w-2xl mb-10 leading-relaxed">
            Expert-coached functional fitness. Max 8 per class. No mirrors. No egos. Just progress.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
              className="inline-flex items-center justify-center px-10 py-4 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase border-none cursor-pointer transition-all duration-300 hover:bg-apollo-orange-hover hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-apollo-orange/30"
            >
              Start Your Free Week
            </Link>
            <button
              onClick={scrollToPrograms}
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent text-apollo-text font-display font-bold text-sm tracking-wide uppercase border border-white/20 cursor-pointer transition-all duration-300 hover:border-apollo-text hover:-translate-y-0.5"
            >
              View Programs
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-apollo-subtle animate-float">
        <span className="font-display text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-apollo-subtle to-transparent" />
      </div>
    </section>
  )
}
