'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const coaches = [
  {
    name: 'Alex',
    tagline: 'The Programmer',
    role: 'Co-Founder & Head Coach',
    image: '/images/alex-poon.jpg',
    alt: 'Coach Alex — The Programmer at Apollo Fitness Studio',
    accent: 'text-apollo-teal',
    bio: 'The engine behind Apollo\'s programming. Alex designs every WOD and S&C session with one goal: making you stronger than yesterday. Functional fitness obsessed, Hyrox competitor, and firm believer that the best results come from consistent effort — not shortcuts.'
  },
  {
    name: 'Alex',
    tagline: 'The Engine',
    role: 'Co-Founder & Coach',
    image: '/images/alex-pic.png',
    alt: 'Coach Alex — The Engine at Apollo Fitness Studio',
    accent: 'text-apollo-orange',
    bio: 'Alex brings the energy and the precision. With a sharp eye for form and a coaching style that pushes you just far enough, Alex makes sure nobody phones it in — and nobody gets left behind. Your biggest cheerleader and your strictest critic, in the best way.'
  }
]

export function Coaches() {
  const sectionRef = useReveal()

  return (
    <section ref={sectionRef} id="coaches" className="py-28 md:py-36">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-4 block">
            Your Coaches
          </span>
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight">
            The People Behind<br />Your Progress
          </h2>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {coaches.map((coach, index) => (
            <div 
              key={coach.tagline}
              className="group grid grid-cols-1 sm:grid-cols-2 border border-white/10 overflow-hidden bg-apollo-card transition-colors duration-400 hover:border-white/20 reveal"
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-80 overflow-hidden">
                <Image
                  src={coach.image}
                  alt={coach.alt}
                  fill
                  className="object-cover object-top transition-transform duration-600 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-center">
                <span className={`font-display font-bold text-xs tracking-widest uppercase ${coach.accent} mb-3`}>
                  {coach.tagline}
                </span>
                <h3 className="font-display font-bold text-3xl uppercase mb-2">
                  Coach {coach.name}
                </h3>
                <div className="font-display text-sm tracking-wide uppercase text-apollo-muted mb-5">
                  {coach.role}
                </div>
                <p className="text-apollo-muted text-sm leading-relaxed">
                  {coach.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
