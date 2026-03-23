'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const programs = [
  {
    id: '01',
    title: 'WODs',
    image: '/images/outdoor-training.jpg',
    alt: 'High-energy WOD session at Apollo Fitness — outdoor group training',
    description: 'Daily workouts engineered to challenge your strength, endurance, and grit. Scalable for every level. Hyrox-specific sessions every Thursday.',
    accent: 'from-apollo-teal/20',
  },
  {
    id: '02',
    title: 'Strength & Conditioning',
    image: '/images/cable-crossover.jpg',
    alt: 'Cable crossover strength training at Apollo Fitness',
    description: 'Small group personal training that builds functional strength and real-world performance.',
    accent: 'from-apollo-orange/20',
  },
  {
    id: '03',
    title: 'Personal Training',
    image: '/images/coaching-squat.jpg',
    alt: 'One-on-one personal training at Apollo Fitness',
    description: "One-on-one sessions tailored entirely to your goals. Whether you're rehabbing, competing, or starting fresh.",
    accent: 'from-apollo-teal/20',
  },
]

function ProgramCard({
  program,
  index,
}: {
  program: (typeof programs)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-apollo-card border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer"
        onClick={() =>
          (() => { const t = document.getElementById('trial'); if (t) { const y = t.getBoundingClientRect().top + window.scrollY - 70; window.scrollTo({ top: y, behavior: 'smooth' }); } })()
        }
      >
        {/* Image — tall portrait crop, object-top to keep heads visible */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={program.image}
            alt={program.alt}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Bottom gradient — fades image into content area */}
          <div className="absolute inset-0 bg-gradient-to-t from-apollo-card via-transparent to-transparent" />

          {/* Top accent gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${program.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Number watermark */}
          <span className="absolute top-4 right-5 font-stat text-5xl text-white/[0.06] leading-none select-none">
            {program.id}
          </span>
        </div>

        {/* Text content — below image, no overlay fighting */}
        <div className="relative px-5 pb-6 -mt-12 z-10">
          <h3 className="font-display font-bold text-xl md:text-2xl uppercase mb-2 tracking-tight">
            {program.title}
          </h3>
          <p className="text-apollo-muted text-sm leading-relaxed mb-4">
            {program.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-apollo-orange font-display font-medium text-xs tracking-[0.15em] uppercase">
            <span className="transition-all duration-300 group-hover:tracking-[0.25em]">
              Get Started
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} id="programs" className="py-20 md:py-28 bg-apollo-card">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-apollo-teal text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Programs
          </p>
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-4">
            Three Ways to Train
          </h2>
          <p className="text-apollo-muted text-base md:text-lg max-w-lg">
            All of them coached. 1:8 coach-to-client ratio. No hiding at the back.
          </p>
        </motion.div>

        {/* Card grid — 3 equal columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
