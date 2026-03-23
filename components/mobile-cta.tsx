'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero')
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight
        setIsVisible(window.scrollY > heroBottom - 200)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
      <Link
        href="#trial" onClick={(e) => { e.preventDefault(); document.getElementById('trial')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="flex items-center justify-center w-full py-4 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase border-none cursor-pointer transition-all duration-300 hover:bg-apollo-orange-hover shadow-lg shadow-apollo-orange/40"
      >
        Book Free Trial →
      </Link>
    </div>
  )
}
