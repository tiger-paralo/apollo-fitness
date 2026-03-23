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
        {/* Header — right-aligned for variety */}
        <div className="programs-heading mb-16 md:text-right reveal">
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-3">
            Programs Built<br />For Results
          </h2>
          <p className="text-apollo-muted text-lg md:ml-auto md:max-w-md">
            Three ways to train. All of them coached. All of them capped at 8.
          </p>
        </div>

        {/* Programs — alternating full-width cards */}
        <div className="space-y-6">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`program-card group grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-apollo-black overflow-hidden transition-all duration-400 hover:border-white/20 reveal ${
                index % 2 !== 0 ? 'md:[direction:rtl]' : ''
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/10] md:aspect-auto md:min-h-[340px] overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  className="program-card-img object-cover transition-transform duration-600 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-apollo-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-apollo-black/30" />
              </div>

              {/* Content */}
              <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                <div className="font-stat text-5xl text-apollo-teal/30 leading-none mb-3">
                  {program.id}
                </div>
                <h3 className="font-display font-bold text-3xl md:text-4xl uppercase mb-4">
                  {program.title}
                </h3>
                <p className="text-apollo-muted text-base leading-relaxed mb-6 max-w-md">
                  {program.description}
                </p>
                <Link
                  href={program.mailto}
                  className="inline-flex items-center gap-2 font-display font-medium text-sm tracking-wider uppercase text-apollo-orange transition-all duration-300 group-hover:gap-3 w-fit"
                >
                  Get Started
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
