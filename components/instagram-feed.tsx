'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useInView,
} from 'motion/react'

/* ── Media items — supports both images and video ── */

type MediaItem = {
  type: 'video' | 'image'
  src: string
  alt?: string
}

// Real IG reels + gym photos — mixed video and image content
const ROW_1: MediaItem[] = [
  { type: 'video', src: '/videos/ig/reel-01.mp4', alt: 'Apollo safe space to get stronger' },
  { type: 'image', src: '/images/outdoor-training.jpg', alt: 'Outdoor group training' },
  { type: 'video', src: '/videos/ig/reel-03.mp4', alt: 'Free trial week at Apollo' },
  { type: 'image', src: '/images/coaching-squat.jpg', alt: 'Coaching squat form' },
  { type: 'video', src: '/videos/ig/reel-04.mp4', alt: 'S&C team workout' },
  { type: 'image', src: '/images/cable-crossover.jpg', alt: 'Cable crossover training' },
  { type: 'image', src: '/images/apollo-rack.jpg', alt: 'Apollo rack setup' },
  { type: 'video', src: '/videos/ig/reel-05.mp4', alt: 'Burpee or best dance move challenge' },
]

const ROW_2: MediaItem[] = [
  { type: 'image', src: '/images/hero-rower.jpg', alt: 'Rower workout' },
  { type: 'video', src: '/videos/ig/reel-02.mp4', alt: 'Free week at Apollo' },
  { type: 'image', src: '/images/pull.jpeg', alt: 'Pull exercise' },
  { type: 'video', src: '/videos/ig/reel-01.mp4', alt: 'Apollo safe space to get stronger' },
  { type: 'image', src: '/images/pt.jpeg', alt: 'Personal training' },
  { type: 'video', src: '/videos/ig/reel-04.mp4', alt: 'S&C team workout' },
  { type: 'image', src: '/images/outdoor-training.jpg', alt: 'Outdoor group training' },
  { type: 'image', src: '/images/coaching-squat.jpg', alt: 'Coaching squat form' },
]

/* ── Infinite scrolling row ── */

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    function update() {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [ref])
  return width
}

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] shrink-0 overflow-hidden group/card">
      {item.type === 'video' ? (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover saturate-[0.6] brightness-75 group-hover/card:saturate-100 group-hover/card:brightness-100 transition-all duration-500"
        />
      ) : (
        <Image
          src={item.src}
          alt={item.alt || 'Apollo Fitness'}
          fill
          sizes="220px"
          className="object-cover saturate-[0.6] brightness-75 group-hover/card:saturate-100 group-hover/card:brightness-100 transition-all duration-500"
          loading="lazy"
        />
      )}
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-apollo-black/20 group-hover/card:bg-transparent transition-all duration-500" />
    </div>
  )
}

function MarqueeRow({
  items,
  baseVelocity,
}: {
  items: MediaItem[]
  baseVelocity: number
}) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 3],
    { clamp: false },
  )

  const copyRef = useRef<HTMLDivElement>(null)
  const copyWidth = useElementWidth(copyRef)

  function wrap(min: number, max: number, v: number) {
    const range = max - min
    return ((((v - min) % range) + range) % range) + min
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return '0px'
    return `${wrap(-copyWidth, 0, v)}px`
  })

  const directionFactor = useRef(1)
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  // Render 4 copies to ensure seamless loop
  const copies = [0, 1, 2, 3]

  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex gap-2" style={{ x }}>
        {copies.map((copyIdx) => (
          <div
            key={copyIdx}
            ref={copyIdx === 0 ? copyRef : undefined}
            className="flex gap-2 shrink-0"
          >
            {items.map((item, i) => (
              <MediaCard key={`${copyIdx}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Main component ── */

export function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 overflow-hidden border-t border-white/5">
      {/* Label */}
      <motion.div
        className="container mx-auto max-w-6xl px-6 mb-6"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="https://www.instagram.com/apollofitnessstudio"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-apollo-muted hover:text-white transition-colors duration-300"
        >
          {/* Instagram icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          <span className="font-display font-bold text-xs tracking-widest uppercase">
            Follow @apollofitnessstudio
          </span>
          <span className="text-apollo-subtle group-hover:text-apollo-teal transition-colors text-xs">→</span>
        </Link>
      </motion.div>

      {/* Scrolling rows — click anywhere opens IG */}
      <Link
        href="https://www.instagram.com/apollofitnessstudio"
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        <div className="space-y-2">
          <MarqueeRow items={ROW_1} baseVelocity={-40} />
          <MarqueeRow items={ROW_2} baseVelocity={40} />
        </div>
      </Link>
    </section>
  )
}
