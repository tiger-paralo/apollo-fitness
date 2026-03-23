'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false)
    // Small delay so the overlay closes before scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }, [])

  const navItems = [
    { label: 'Why Apollo', section: 'why' },
    { label: 'Programs', section: 'programs' },
    { label: 'Coaches', section: 'coaches' },
    { label: 'Schedule', section: 'schedule' },
    { label: 'Pricing', section: 'pricing' },
    { label: 'Location', section: 'location' },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled || mobileMenuOpen
            ? 'bg-apollo-black/95 backdrop-blur-xl border-b border-white/5 py-2'
            : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Fog gradient beneath nav — extended blur zone */}
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
                href="#trial" onClick={(e) => { e.preventDefault(); (() => { const t = document.getElementById('trial'); if (t) { const y = t.getBoundingClientRect().top + window.scrollY - 70; window.scrollTo({ top: y, behavior: 'smooth' }); } })() }}
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

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-apollo-black flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Subtle background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-apollo-orange/[0.03] rounded-full blur-3xl" />
              <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-apollo-teal/[0.03] rounded-full blur-3xl" />
            </div>

            {/* Nav items — centered vertically */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="group py-3 w-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <span className="font-display font-bold text-2xl tracking-wide uppercase text-white/80 group-hover:text-apollo-orange transition-colors duration-300">
                    {item.label}
                  </span>
                </motion.button>
              ))}

              {/* CTA in menu */}
              <motion.div
                className="mt-8 w-full max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.06 + 0.05, duration: 0.4 }}
              >
                <Link
                  href="#trial"
                  onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); (() => { const t = document.getElementById('trial'); if (t) { const y = t.getBoundingClientRect().top + window.scrollY - 70; window.scrollTo({ top: y, behavior: 'smooth' }); } })() }}
                  className="block w-full text-center py-3.5 bg-apollo-orange text-white font-display font-bold text-sm tracking-wide uppercase transition-all duration-300 active:scale-95"
                >
                  Book Free Trial
                </Link>
              </motion.div>
            </nav>

            {/* Bottom contact line */}
            <motion.div
              className="pb-10 pt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="https://wa.me/447521216772"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-display tracking-wider uppercase text-apollo-muted hover:text-apollo-teal transition-colors"
              >
                WhatsApp Us →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
