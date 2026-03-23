'use client'

import { useState, useEffect } from 'react'

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero')
      const trial = document.getElementById('trial')

      if (!hero) return

      const heroBottom = hero.offsetTop + hero.offsetHeight
      const pastHero = window.scrollY > heroBottom - 200

      let atTrial = false
      if (trial) {
        const trialRect = trial.getBoundingClientRect()
        atTrial = trialRect.top < window.innerHeight * 0.6
      }

      setIsVisible(pastHero && !atTrial)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pt-3"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <button
        type="button"
        onClick={() => {
          const trial = document.getElementById('trial')
          if (trial) {
            const y = trial.getBoundingClientRect().top + window.scrollY - 70
            window.scrollTo({ top: y, behavior: 'smooth' })
          }
        }}
        className="flex items-center justify-center w-full py-4 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase border-none cursor-pointer shadow-lg shadow-apollo-orange/40 active:scale-[0.98] transition-transform duration-150"
      >
        Book Free Trial →
      </button>
    </div>
  )
}
