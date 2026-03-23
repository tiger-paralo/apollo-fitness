'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-400 ${
      isScrolled 
        ? 'bg-apollo-black/95 backdrop-blur-xl border-b border-white/5 py-3' 
        : ''
    }`}>
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          {/* Logo — wide wordmark, no extra text */}
          <Link href="#" className="flex items-center">
            <Image
              src="/images/apollo-logo.jpg"
              alt="Apollo Fitness Studio"
              width={180}
              height={102}
              className="h-10 w-auto md:h-12"
              priority
            />
          </Link>

          {/* Navigation — Desktop */}
          <nav className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection('why')}
              className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text transition-colors duration-300"
            >
              Why Apollo
            </button>
            <button
              onClick={() => scrollToSection('programs')}
              className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text transition-colors duration-300"
            >
              Programs
            </button>
            <button
              onClick={() => scrollToSection('coaches')}
              className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text transition-colors duration-300"
            >
              Coaches
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text transition-colors duration-300"
            >
              Schedule
            </button>
          </nav>

          {/* CTA Button — Desktop */}
          <div className="hidden md:block">
            <Link
              href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
              className="inline-flex items-center justify-center px-6 py-3 bg-apollo-orange text-apollo-text font-display font-bold text-xs tracking-wide uppercase border-none cursor-pointer transition-all duration-300 hover:bg-apollo-orange-hover hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-apollo-orange/30"
            >
              Book Free Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('why')} className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text text-left">Why Apollo</button>
            <button onClick={() => scrollToSection('programs')} className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text text-left">Programs</button>
            <button onClick={() => scrollToSection('coaches')} className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text text-left">Coaches</button>
            <button onClick={() => scrollToSection('schedule')} className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text text-left">Schedule</button>
          </nav>
        )}
      </div>
    </header>
  )
}
