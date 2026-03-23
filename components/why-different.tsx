'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { SpotlightCard } from '@/components/react-bits/spotlight'
import { CountUp } from '@/components/react-bits/count-up'

interface StatConfig {
  value: number
  suffix: string
  label: string
  description: string
  spotlightColor: string
}

const stats: StatConfig[] = [
  {
    value: 8,
    suffix: 'max',
    label: 'Per Class',
    description:
      "Every session feels like personal training. You'll never be lost in a crowd or overlooked by your coach.",
    spotlightColor: 'rgba(87, 181, 160, 0.1)',
  },
  {
    value: 2,
    suffix: ':8',
    label: 'Coach Ratio',
    description:
      'Expert eyes on your form, every rep. Alex and Alex programme and coach every session — no freelancers, no randoms.',
    spotlightColor: 'rgba(255, 107, 53, 0.1)',
  },
  {
    value: 0,
    suffix: 'ego',
    label: 'No Mirrors. No Egos.',
    description:
      "Come as you are. Progress at your pace. This isn't a gym for selfies — it's a gym for people who want to get better.",
    spotlightColor: 'rgba(87, 181, 160, 0.1)',
  },
]

export function WhyDifferent() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="why" className="py-14 md:py-20 border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-4">
            Why We&apos;re Different
          </h2>
          <p className="text-apollo-muted text-lg max-w-xl mx-auto">
            Small classes. Expert coaches. Zero attitude.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <SpotlightCard
                className="bg-apollo-black p-8 md:p-10 h-full transition-colors duration-400 hover:bg-apollo-card group cursor-default"
                spotlightColor={stat.spotlightColor}
              >
                <div className="font-stat text-stat text-apollo-text mb-2">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    suffixClassName="text-apollo-orange"
                  />
                </div>
                <h3 className="font-display font-medium text-lg uppercase tracking-wide mb-4 transition-colors duration-300 group-hover:text-apollo-teal">
                  {stat.label}
                </h3>
                <p className="text-apollo-muted text-sm leading-relaxed">
                  {stat.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
