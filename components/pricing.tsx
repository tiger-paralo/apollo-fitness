'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

interface Tier {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  accent: 'teal' | 'orange' | 'white'
  popular?: boolean
  teamUpUrl: string
}

const tiers: Tier[] = [
  {
    name: 'Unlimited',
    price: 250,
    period: '/month',
    description: 'All classes, all day, every day. For the fully committed.',
    features: [
      'Unlimited classes per month',
      'All class types — WOD, S&C, Pilates, Yoga',
      'Priority booking',
      'HYROX Thursday sessions included',
    ],
    accent: 'orange',
    popular: true,
    teamUpUrl: 'https://apollofitnessstudio.teamup.com',
  },
  {
    name: '3x Per Week',
    price: 200,
    period: '/month',
    description: 'Three sessions a week. The sweet spot for most people.',
    features: [
      '3 classes per week (12/month)',
      'All class types available',
      'Flexible scheduling',
      'HYROX Thursday sessions included',
    ],
    accent: 'teal',
    teamUpUrl: 'https://apollofitnessstudio.teamup.com',
  },
  {
    name: '2x Per Week',
    price: 160,
    period: '/month',
    description: 'Twice a week. A solid starting point that builds consistency.',
    features: [
      '2 classes per week (8/month)',
      'All class types available',
      'Flexible scheduling',
      'Great entry point',
    ],
    accent: 'white',
    teamUpUrl: 'https://apollofitnessstudio.teamup.com',
  },
]

const accentStyles = {
  teal: {
    border: 'border-apollo-teal/30',
    borderHover: 'hover:border-apollo-teal/60',
    badge: 'bg-apollo-teal/15 text-apollo-teal',
    price: 'text-apollo-teal',
    btn: 'bg-apollo-teal hover:bg-apollo-teal/90',
    dot: 'bg-apollo-teal',
  },
  orange: {
    border: 'border-apollo-orange/30',
    borderHover: 'hover:border-apollo-orange/60',
    badge: 'bg-apollo-orange/15 text-apollo-orange',
    price: 'text-apollo-orange',
    btn: 'bg-apollo-orange hover:bg-apollo-orange-hover',
    dot: 'bg-apollo-orange',
  },
  white: {
    border: 'border-white/10',
    borderHover: 'hover:border-white/30',
    badge: 'bg-white/10 text-white',
    price: 'text-white',
    btn: 'bg-white/10 hover:bg-white/20',
    dot: 'bg-white/60',
  },
}

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} id="pricing" className="relative py-14 md:py-20 border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-1 block">
            Membership
          </span>
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight leading-none mb-3">
            Simple Pricing
          </h2>
          <p className="text-apollo-muted text-sm max-w-md mx-auto">
            No contracts. No joining fees. Cancel anytime. Every membership includes a free trial week.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => {
            const styles = accentStyles[tier.accent]
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative bg-apollo-card border ${styles.border} ${styles.borderHover} p-6 transition-all duration-300 group ${
                  tier.popular ? 'md:-mt-2 md:mb-0 md:pb-8' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className={`${styles.badge} text-[10px] font-display font-bold uppercase tracking-widest px-3 py-1`}>
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-apollo-muted text-xs leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className={`font-stat text-4xl leading-none ${styles.price}`}>
                    £{tier.price}
                  </span>
                  <span className="text-apollo-muted text-xs font-display uppercase">
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-xs text-apollo-muted">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${styles.dot}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.teamUpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-2.5 font-display font-bold text-xs tracking-wide uppercase text-white transition-all duration-300 ${styles.btn}`}
                >
                  Get Started →
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-apollo-subtle text-xs">
            Personal training available separately.{' '}
            <Link
              href="mailto:apollofitnessstudio@gmail.com?subject=Personal%20Training%20Enquiry"
              className="text-apollo-teal hover:text-apollo-teal/80 transition-colors"
            >
              Get in touch →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
