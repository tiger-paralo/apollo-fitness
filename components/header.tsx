'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'motion/react'

const scrollToTrial = () => {
  const t = document.getElementById('trial')
  if (t) {
    const y = t.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open — use class toggle instead of direct style
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => { document.documentElement.classList.remove('overflow-hidden') }
  }, [mobileMenuOpen])

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 150)
  }, [])

  const navItems = [
    { label: 'Programs', section: 'programs' },
    { label: 'Coaches', section: 'coaches' },
    { label: 'Schedule', section: 'schedule' },
    { label: 'Pricing', section: 'pricing' },
    { label: 'Location', section: 'location' },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-apollo-black/95 backdrop-blur-xl border-b border-white/5 py-2'
            : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Fog gradient beneath nav */}
        <div
          className={`absolute inset-x-0 -bottom-24 h-24 pointer-events-none transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.4) 40%, transparent 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        />

        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#" className="flex items-center relative z-50">
              <Image
                src="/images/apollo-logo.png"
                alt="Apollo Fitness Studio"
                width={180}
                height={102}
                className="h-9 w-auto md:h-11"
                priority
              />
            </Link>

            {/* Navigation — Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="group relative font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-apollo-orange group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* CTA Button — Desktop */}
            <div className="hidden md:block">
              <Link
                href="#trial"
                onClick={(e) => { e.preventDefault(); scrollToTrial() }}
                className="group relative inline-flex items-center justify-center px-6 py-2.5 bg-apollo-orange text-apollo-text font-display font-bold text-xs tracking-wide uppercase overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-apollo-orange/30"
              >
                <span className="relative z-10">Book Free Trial</span>
                <div className="absolute inset-0 bg-apollo-orange-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu — pure CSS, no AnimatePresence */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 md:hidden bg-apollo-black flex flex-col transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        {/* Nav items — centered vertically */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
          {navItems.map((item, i) => (
            <button
              key={item.section}
              onClick={() => scrollToSection(item.section)}
              className="py-3 w-full text-center active:bg-white/5 transition-colors duration-150"
              style={{
                transitionDelay: mobileMenuOpen ? `${50 + i * 30}ms` : '0ms',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 200ms, transform 200ms, background-color 150ms',
              }}
            >
              <span className="font-display font-bold text-2xl tracking-wide uppercase text-white/80">
                {item.label}
              </span>
            </button>
          ))}

          {/* CTA in menu */}
          <div
            className="mt-8 w-full max-w-xs"
            style={{
              transitionDelay: mobileMenuOpen ? `${50 + navItems.length * 30}ms` : '0ms',
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 200ms, transform 200ms',
            }}
          >
            <button
              onClick={() => { setMobileMenuOpen(false); setTimeout(scrollToTrial, 150) }}
              className="block w-full text-center py-3.5 bg-apollo-orange text-white font-display font-bold text-sm tracking-wide uppercase active:scale-95 transition-transform duration-150"
            >
              Book Free Trial
            </button>
          </div>
        </nav>

        {/* Bottom contact line */}
        <div className="pb-10 pt-4 text-center">
          <a
            href="https://wa.me/447521216772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-display tracking-wider uppercase text-apollo-muted"
          >
            WhatsApp Us →
          </a>
        </div>
      </div>
    </>
  )
}
