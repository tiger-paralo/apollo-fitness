'use client'

import { useReveal } from '@/hooks/useReveal'

export function WhyDifferent() {
  const sectionRef = useReveal()

  return (
    <section ref={sectionRef} id="why" className="py-28 md:py-36 border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-4 block">
            The Apollo Difference
          </span>
          <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight">
            Why We're Different
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {/* Stat 1 */}
          <div className="bg-apollo-black p-12 md:p-16 transition-colors duration-400 hover:bg-apollo-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="font-stat text-stat text-apollo-text mb-2">
              8<span className="text-apollo-orange">max</span>
            </div>
            <h3 className="font-display font-medium text-lg uppercase tracking-wide mb-4">
              Per Class
            </h3>
            <p className="text-apollo-muted text-sm leading-relaxed">
              Every session feels like personal training. You'll never be lost in a crowd or overlooked by your coach.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-apollo-black p-12 md:p-16 transition-colors duration-400 hover:bg-apollo-card reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="font-stat text-stat text-apollo-text mb-2">
              2<span className="text-apollo-orange">:</span>8
            </div>
            <h3 className="font-display font-medium text-lg uppercase tracking-wide mb-4">
              Coach Ratio
            </h3>
            <p className="text-apollo-muted text-sm leading-relaxed">
              Expert eyes on your form, every rep. Alex and Alex programme and coach every session — no freelancers, no randoms.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-apollo-black p-12 md:p-16 transition-colors duration-400 hover:bg-apollo-card reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="font-stat text-stat text-apollo-text mb-2">
              0<span className="text-apollo-orange">ego</span>
            </div>
            <h3 className="font-display font-medium text-lg uppercase tracking-wide mb-4">
              No Mirrors. No Egos.
            </h3>
            <p className="text-apollo-muted text-sm leading-relaxed">
              Come as you are. Progress at your pace. This isn't a gym for selfies — it's a gym for people who want to get better.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}