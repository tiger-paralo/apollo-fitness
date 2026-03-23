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
    accentBg: 'bg-apollo-teal/10',
    bio: 'The engine behind Apollo\'s programming. Alex designs every WOD and S&C session with one goal: making you stronger than yesterday. Functional fitness obsessed, Hyrox competitor, and firm believer that the best results come from consistent effort — not shortcuts.'
  },
  {
    name: 'Alex',
    tagline: 'The Engine',
    role: 'Co-Founder & Coach',
    image: '/images/alex-pic.png',
    alt: 'Coach Alex — The Engine at Apollo Fitness Studio',
    accent: 'text-apollo-orange',
    accentBg: 'bg-apollo-orange/10',
    bio: 'Alex brings the energy and the precision. With a sharp eye for form and a coaching style that pushes you just far enough, Alex makes sure nobody phones it in — and nobody gets left behind. Your biggest cheerleader and your strictest critic, in the best way.'
  }
]

export function Coaches() {
  const sectionRef = useReveal()

  return (
    <section ref={sectionRef} id="coaches" className="py-28 md:py-36">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header — centered */}
        <div className="coaches-heading mb-20 text-center reveal">
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-4">
            Meet Your Coaches
          </h2>
          <p className="text-apollo-muted text-lg max-w-lg mx-auto">
            Two Alexes. One mission. Every session, every rep — they&apos;re in it with you.
          </p>
        </div>

        {/* Coaches — full-width alternating layout */}
        <div className="space-y-16 md:space-y-24">
          {coaches.map((coach, index) => (
            <div
              key={coach.tagline}
              className={`coach-card grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center reveal ${
                index % 2 !== 0 ? 'md:[direction:rtl]' : ''
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Image — takes 3 cols */}
              <div className="md:col-span-3 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <Image
                  src={coach.image}
                  alt={coach.alt}
                  fill
                  className="coach-img object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-apollo-black via-transparent to-transparent opacity-60" />
                {/* Tagline overlay */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <span className={`inline-block px-4 py-2 ${coach.accentBg} ${coach.accent} font-display font-bold text-xs tracking-widest uppercase`}>
                    {coach.tagline}
                  </span>
                </div>
              </div>

              {/* Info — takes 2 cols */}
              <div className={`md:col-span-2 ${index % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                <h3 className="font-display font-bold text-4xl md:text-5xl uppercase mb-2">
                  Coach {coach.name}
                </h3>
                <div className="font-display text-sm tracking-wide uppercase text-apollo-muted mb-6">
                  {coach.role}
                </div>
                <div className="w-12 h-px bg-apollo-teal mb-6" />
                <p className="text-apollo-muted text-base leading-relaxed">
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
