'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

const programs = [
  {
    id: '01',
    title: 'WODs',
    image: '/images/outdoor-training.jpg',
    alt: 'High-energy WOD session at Apollo Fitness — outdoor group training',
    description: 'Daily workouts engineered to challenge your strength, endurance, and grit. Scalable for every level. Hyrox-specific sessions every Thursday.',
    mailto: '#trial',
    span: 'md:col-span-2 md:row-span-2',
    aspect: 'aspect-[4/3] md:aspect-auto md:h-full md:min-h-[500px]',
  },
  {
    id: '02',
    title: 'Strength & Conditioning',
    image: '/images/cable-crossover.jpg',
    alt: 'Cable crossover strength training at Apollo Fitness',
    description: 'Small group personal training that builds functional strength and real-world performance.',
    mailto: '#trial',
    span: 'md:col-span-1',
    aspect: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
  {
    id: '03',
    title: 'Personal Training',
    image: '/images/coaching-squat.jpg',
    alt: 'One-on-one personal training at Apollo Fitness',
    description: 'One-on-one sessions tailored entirely to your goals. Whether you\'re rehabbing, competing, or starting fresh.',
    mailto: '#trial',
    span: 'md:col-span-1',
    aspect: 'aspect-[4/3] md:aspect-auto md:h-full',
  },
]

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <motion.div
      ref={cardRef}
      className={`${program.span} group relative overflow-hidden cursor-pointer`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link href={program.mailto} onClick={(e) => { e.preventDefault(); document.getElementById('trial')?.scrollIntoView({ behavior: 'smooth' }) }} className="block relative h-full">
        {/* Image with parallax */}
        <div className={`relative ${program.aspect} overflow-hidden`}>
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <Image
              src={program.image}
              alt={program.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-apollo-black via-apollo-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10" />

          {/* Content overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
            {/* Number */}
            <motion.div
              className="font-stat text-6xl md:text-7xl text-white/[0.08] leading-none mb-2 absolute top-4 right-6 md:top-6 md:right-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              {program.id}
            </motion.div>

            {/* Glassmorphic text card */}
            <div className="bg-apollo-black/50 backdrop-blur-md border border-white/[0.06] rounded-lg p-4 md:p-5">
              <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-2 transition-transform duration-300 group-hover:translate-x-2">
                {program.title}
              </h3>
              <p className={`text-apollo-muted text-sm leading-relaxed mb-4 ${index === 0 ? 'max-w-md' : 'max-w-xs'}`}>
                {program.description}
              </p>

              {/* CTA arrow */}
              <div className="flex items-center gap-2 text-apollo-orange font-display font-medium text-sm tracking-wider uppercase">
                <span className="transition-all duration-300 group-hover:tracking-widest">Get Started</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Top edge glow on hover */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apollo-orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
        </div>
      </Link>
    </motion.div>
  )
}

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} id="programs" className="py-20 md:py-28 bg-apollo-card">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="mb-8 md:text-right"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-3">
            Programs Built<br />For Results
          </h2>
          <p className="text-apollo-muted text-lg md:ml-auto md:max-w-md">
            Three ways to train. All of them coached. All of them capped at 8.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        {/* Extra image strip below */}
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { src: '/images/hero-rower.jpg', alt: 'Rower workout at Apollo' },
            { src: '/images/pt.jpeg', alt: 'Personal training session' },
            { src: '/images/facility.webp', alt: 'Apollo Fitness facility' },
          ].map((img, i) => (
            <motion.div
              key={img.src}
              className="relative aspect-[3/2] overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-apollo-black/40 group-hover:bg-apollo-black/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

