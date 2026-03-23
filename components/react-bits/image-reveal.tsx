'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  parallax?: boolean
  parallaxStrength?: number
  sizes?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

export function ImageReveal({
  src,
  alt,
  className = '',
  containerClassName = '',
  direction = 'up',
  parallax = false,
  parallaxStrength = 50,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  fill = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength])

  const clipMap = {
    up: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0 0 0 0)' },
    down: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0 0)' },
    left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0 0 0)' },
    right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0)' },
  } as const

  const clip = clipMap[direction]

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${containerClassName}`}
      initial={{ clipPath: clip.hidden }}
      animate={isInView ? { clipPath: clip.visible } : { clipPath: clip.hidden }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={`relative w-full h-full ${className}`}
        style={parallax ? { y: parallaxY } : {}}
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : { scale: 1.2 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            priority={priority}
          />
        ) : null}
      </motion.div>
    </motion.div>
  )
}
