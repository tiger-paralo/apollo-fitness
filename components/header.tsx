'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
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

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navItems = [
    { label: 'Why Apollo', section: 'why' },
    { label: 'Programs', section: 'programs' },
    { label: 'Coaches', section: 'coaches' },
    { label: 'Schedule', section: 'schedule' },
    { label: 'Pricing', section: 'pricing' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-apollo-black/95 backdrop-blur-xl border-b border-white/5 py-2'
          : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#" className="flex items-center">
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
              href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 bg-apollo-orange text-apollo-text font-display font-bold text-xs tracking-wide uppercase overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-apollo-orange/30"
            >
              <span className="relative z-10">Book Free Trial</span>
              <div className="absolute inset-0 bg-apollo-orange-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-60"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 flex flex-col gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="font-medium text-sm tracking-wider uppercase text-apollo-muted hover:text-apollo-text text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
