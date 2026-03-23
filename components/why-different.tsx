'use client'

import { useReveal } from '@/hooks/useReveal'
import { useCountUp } from '@/hooks/useCountUp'

interface StatConfig {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: StatConfig[] = [
  {
    value: 8,
    suffix: 'max',
    label: 'Per Class',
    description:
      "Every session feels like personal training. You'll never be lost in a crowd or overlooked by your coach.",
  },
  {
    value: 2,
    suffix: ':8',
    label: 'Coach Ratio',
    description:
      'Expert eyes on your form, every rep. Alex and Alex programme and coach every session — no freelancers, no randoms.',
  },
  {
    value: 0,
    suffix: 'ego',
    label: 'No Mirrors. No Egos.',
    description:
      "Come as you are. Progress at your pace. This isn't a gym for selfies — it's a gym for people who want to get better.",
  },
]

function StatNumber({ stat }: { stat: StatConfig }) {
  const countRef = useCountUp(stat.value)

  if (stat.value === 0) {
    return (
      <span className="reveal-scale" style={{ display: 'inline-block' }}>
        {stat.value}
      </span>
    )
  }

  return (
    <span ref={countRef} style={{ display: 'inline-block' }}>
      {stat.value}
    </span>
  )
}

export function WhyDifferent() {
  const sectionRef = useReveal()

  return (
    <section ref={sectionRef} id="why" className="py-28 md:py-36 border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header — centered for variety */}
        <div className="why-heading mb-20 text-center reveal">
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-4">
            Why We&apos;re Different
          </h2>
          <p className="text-apollo-muted text-lg max-w-xl mx-auto">
            Small classes. Expert coaches. Zero attitude.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card bg-apollo-black p-12 md:p-16 transition-colors duration-400 hover:bg-apollo-card reveal"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="font-stat text-stat text-apollo-text mb-2">
                <StatNumber stat={stat} />
                <span className="text-apollo-orange">{stat.suffix}</span>
              </div>
              <h3 className="font-display font-medium text-lg uppercase tracking-wide mb-4">
                {stat.label}
              </h3>
              <p className="text-apollo-muted text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
