'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

export function Schedule() {
  const sectionRef = useReveal()

  return (
    <section 
      ref={sectionRef} 
      id="schedule" 
      className="relative py-28 md:py-36 bg-apollo-card overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute -top-32 -right-10 w-112 h-112 bg-gradient-radial from-apollo-orange/4 to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="reveal">
            <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-4 block">
              Class Schedule
            </span>
            <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-6">
              Find Your<br />Session
            </h2>
            <p className="text-apollo-muted text-lg leading-relaxed mb-8">
              WODs, Strength & Conditioning, and Hyrox Thursdays — structured across the week so you can build consistency around your life. Every session is coached. Every session counts.
            </p>

            {/* First Week Free Offer */}
            <div className="bg-apollo-black border border-apollo-orange/20 p-8 mb-8">
              <div className="font-stat text-4xl text-apollo-orange leading-none mb-2">
                First Week Free
              </div>
              <p className="text-apollo-muted text-sm">
                No commitment. No card details. Just turn up, train, and see if Apollo is your kind of gym.
              </p>
            </div>

            <Link
              href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
              className="inline-flex items-center justify-center px-10 py-4 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase border-none cursor-pointer transition-all duration-300 hover:bg-apollo-orange-hover hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-apollo-orange/30"
            >
              Claim Your Free Week
            </Link>
          </div>

          {/* Timetable Image */}
          <div className="reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="border border-white/10 overflow-hidden">
              <Image
                src="/images/timetable.png"
                alt="Apollo Fitness Studio weekly class timetable"
                width={600}
                height={400}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}