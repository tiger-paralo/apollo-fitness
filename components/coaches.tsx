'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

const coaches = [
  {
    name: 'Alex',
    tagline: 'The Programmer',
    role: 'Co-Founder & Head Coach',
    image: '/images/alex-poon.jpg',
    alt: 'Coach Alex — The Programmer at Apollo Fitness Studio',
    accent: 'apollo-teal',
    bio: 'The engine behind Apollo\'s programming. Alex designs every WOD and S&C session with one goal: making you stronger than yesterday. Functional fitness obsessed, Hyrox competitor, and firm believer that the best results come from consistent effort — not shortcuts.'
  },
  {
    name: 'Alex',
    tagline: 'The Engine',
    role: 'Co-Founder & Coach',
    image: '/images/alex-pic.png',
    alt: 'Coach Alex — The Engine at Apollo Fitness Studio',
    accent: 'apollo-orange',
    bio: 'Alex brings the energy and the precision. With a sharp eye for form and a coaching style that pushes you just far enough, Alex makes sure nobody phones it in — and nobody gets left behind. Your biggest cheerleader and your strictest critic, in the best way.'
  }
]

function CoachCard({ coach, index }: { coach: typeof coaches[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20])
  const isReversed = index % 2 !== 0

  return (
    <motion.div
      ref={cardRef}
      className={`grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch ${isReversed ? '' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
    >
      {/* Image */}
      <div className={`${isReversed ? 'md:col-start-5 md:col-span-8 md:order-2' : 'md:col-span-8'} relative aspect-[4/5] md:aspect-[3/4] overflow-hidden`}>
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src={coach.image}
            alt={coach.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </motion.div>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-apollo-black via-transparent to-transparent opacity-70 md:bg-gradient-to-${isReversed ? 'r' : 'l'} md:from-transparent md:via-transparent md:to-apollo-black/90`} />
        <div className="absolute inset-0 bg-gradient-to-t from-apollo-black via-transparent to-transparent opacity-60 md:hidden" />

        {/* Mobile tagline */}
        <div className="absolute bottom-4 left-4 md:hidden">
          <span className={`inline-block px-3 py-1.5 bg-${coach.accent}/20 text-${coach.accent} font-display font-bold text-xs tracking-widest uppercase border border-${coach.accent}/30`}>
            {coach.tagline}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`${isReversed ? 'md:col-start-1 md:col-span-5 md:order-1 md:pr-12' : 'md:col-span-4 md:pl-0'} flex flex-col justify-center py-8 md:py-0 ${isReversed ? '' : 'md:-ml-16 relative z-10'}`}>
        <div className={`${isReversed ? '' : 'md:bg-apollo-black/90 md:backdrop-blur-sm md:p-10'}`}>
          {/* Desktop tagline */}
          <motion.span
            className={`hidden md:inline-block px-3 py-1.5 bg-${coach.accent}/10 text-${coach.accent} font-display font-bold text-xs tracking-widest uppercase mb-4 border border-${coach.accent}/20`}
            initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 20 : -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {coach.tagline}
          </motion.span>

          <motion.h3
            className="font-display font-bold text-4xl md:text-5xl uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Coach {coach.name}
          </motion.h3>

          <motion.div
            className="font-display text-sm tracking-wide uppercase text-apollo-muted mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {coach.role}
          </motion.div>

          <motion.div
            className={`w-12 h-px bg-${coach.accent} mb-5`}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ transformOrigin: 'left' }}
          />

          <motion.p
            className="text-apollo-muted text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {coach.bio}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export function Coaches() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} id="coaches" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-4">
            Meet Your Coaches
          </h2>
          <p className="text-apollo-muted text-lg max-w-lg mx-auto">
            Two Alexes. One mission. Every session, every rep — they&apos;re in it with you.
          </p>
        </motion.div>

        {/* Coaches */}
        <div className="space-y-12 md:space-y-20">
          {coaches.map((coach, index) => (
            <CoachCard key={coach.tagline} coach={coach} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
