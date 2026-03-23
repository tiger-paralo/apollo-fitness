'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'

export function Facility() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div ref={ref} className="relative h-[280px] md:h-[360px] overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/facility.webp"
          alt="Apollo Fitness Studio — Concept2 rowers and training floor"
          fill
          className="object-cover object-center scale-110"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay with teal tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-apollo-black/80 via-apollo-black/50 to-apollo-black/80" />
      <div className="absolute inset-0 bg-apollo-teal/[0.06]" />

      {/* Subtle grain / atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-display font-bold text-xs md:text-sm tracking-[0.3em] uppercase text-apollo-teal/80 mb-3">
            The Training Floor
          </p>
          <p className="text-apollo-muted/70 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Purpose-built. No mirrors, no ego. Just the equipment, the coaching, and the work.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
