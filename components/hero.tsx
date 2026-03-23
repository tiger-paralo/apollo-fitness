'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import StaggeredText from '@/components/react-bits/staggered-text'
import { MagneticButton } from '@/components/react-bits/magnetic-button'

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
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60])

  const scrollToPrograms = () => {
    const section = document.getElementById('programs')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section ref={sectionRef} id="hero" className="hero relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background — Mobile only (lazy-loaded, unmounts when offscreen) */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-apollo-black/40 via-apollo-black/60 to-apollo-black/95" />
        <LazyVimeoVideo />
      </div>

      {/* Image Background — Desktop only with parallax */}
      <div className="absolute inset-0 z-0 hidden md:block overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src="/images/facility.webp"
            alt="Apollo Fitness Studio — Training floor"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        </motion.div>
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-apollo-black via-apollo-black/80 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-apollo-black via-transparent to-apollo-black/40" />
        {/* Orange accent glow */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 z-10 bg-gradient-to-t from-apollo-orange/[0.06] to-transparent" />
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
      <motion.div
        className="container mx-auto max-w-6xl px-6 relative z-30"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl pt-24">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-8 h-px bg-apollo-teal" />
            <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal">
              Maidenhead&apos;s Boutique Fitness Studio
            </span>
          </motion.div>

          {/* Main Headline — StaggeredText */}
          <h1 className="font-display font-bold text-hero uppercase leading-[1.05] tracking-tight mb-6">
            <StaggeredText
              text="Build Your"
              as="span"
              className="block"
              segmentBy="words"
              delay={120}
              duration={0.8}
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
                delay={120}
                duration={0.8}
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
                delay={120}
                duration={0.8}
                direction="bottom"
                blur={true}
                staggerDirection="forward"
              />
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-apollo-muted max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            Expert-coached functional fitness. Max 8 per class. No mirrors. No egos. Just progress.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <MagneticButton strength={0.15}>
              <Link
                href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase border-none cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-apollo-orange/40"
              >
                <span className="relative z-10">Start Your Free Week</span>
                <div className="absolute inset-0 bg-apollo-orange-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <button
                onClick={scrollToPrograms}
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent text-apollo-text font-display font-bold text-sm tracking-wide uppercase border border-white/20 cursor-pointer overflow-hidden transition-all duration-300 hover:border-white/40"
              >
                <span className="relative z-10">View Programs</span>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-apollo-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="font-display text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-apollo-subtle to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
