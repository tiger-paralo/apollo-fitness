'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

const programs = [
  {
    id: '01',
    title: 'WODs',
    image: '/images/pic3.jpeg',
    alt: 'High-energy WOD session at Apollo Fitness',
    description: 'Daily workouts engineered to challenge your strength, endurance, and grit. Scalable for every level. Hyrox-specific sessions every Thursday.',
    mailto: 'mailto:apollofitnessstudio@gmail.com?subject=WOD%20Classes'
  },
  {
    id: '02', 
    title: 'Strength & Conditioning',
    image: '/images/pull.jpeg',
    alt: 'Strength and conditioning on the rig at Apollo Fitness',
    description: 'Small group personal training that builds functional strength and real-world performance. The motivation of a group, the guidance of a PT.',
    mailto: 'mailto:apollofitnessstudio@gmail.com?subject=S%26C%20Classes'
  },
  {
    id: '03',
    title: 'Personal Training',
    image: '/images/pt.jpeg', 
    alt: 'One-on-one personal training at Apollo Fitness',
    description: 'One-on-one sessions tailored entirely to your goals. Whether you\'re rehabbing, competing, or starting fresh — this is your hour.',
    mailto: 'mailto:apollofitnessstudio@gmail.com?subject=Personal%20Training'
  }
]

export function Programs() {
  const sectionRef = useReveal()

  return (
    <section ref={sectionRef} id="programs" className="py-28 md:py-36 bg-apollo-card">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight">
            Programs Built<br />For Results
          </h2>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div 
              key={program.id}
              className="group relative overflow-hidden border border-white/10 bg-apollo-black transition-all duration-400 hover:border-white/20 hover:-translate-y-1 reveal"
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-apollo-black via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="font-stat text-sm tracking-wider text-apollo-teal mb-2">
                  {program.id}
                </div>
                <h3 className="font-display font-bold text-2xl uppercase mb-3">
                  {program.title}
                </h3>
                <p className="text-apollo-muted text-sm leading-relaxed mb-5">
                  {program.description}
                </p>
                <Link
                  href={program.mailto}
                  className="inline-flex items-center gap-2 font-display font-medium text-xs tracking-wider uppercase text-apollo-orange transition-all duration-300 group-hover:gap-3"
                >
                  Learn More
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}