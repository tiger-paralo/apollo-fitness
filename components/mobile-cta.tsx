'use client'

import { useState, useEffect, useCallback } from 'react'

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero')
      const trial = document.getElementById('trial')

      if (!hero) return

      const heroBottom = hero.offsetTop + hero.offsetHeight
      const pastHero = window.scrollY > heroBottom - 200

      // Hide when the trial section is in view (no point showing CTA when they're already there)
      let atTrial = false
      if (trial) {
        const trialRect = trial.getBoundingClientRect()
        atTrial = trialRect.top < window.innerHeight * 0.6
      }

      setIsVisible(pastHero && !atTrial)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTrial = useCallback(() => {
    const trial = document.getElementById('trial')
    if (!trial) return
    // Offset for fixed header (~60px) so "Book your free trial" heading isn't clipped
    const y = trial.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-400 pointer-events-none px-4 pt-3 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <button
        onClick={scrollToTrial}
        className="flex items-center justify-center w-full py-4 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase border-none cursor-pointer transition-all duration-300 hover:bg-apollo-orange-hover shadow-lg shadow-apollo-orange/40"
      >
        Book Free Trial →
      </button>
    </div>
  )
}
