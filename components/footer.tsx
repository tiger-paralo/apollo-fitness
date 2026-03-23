'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

export function Footer() {
  const sectionRef = useReveal()

  return (
    <footer 
      ref={sectionRef}
      id="contact"
      className="border-t border-white/5 pt-16 pb-8"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 reveal">
            <h3 className="font-display font-bold text-2xl uppercase mb-3">
              Apollo Fitness Studio
            </h3>
            <p className="text-apollo-muted text-sm leading-relaxed max-w-sm">
              Functional fitness, expert coaching, and a community that gives a damn. Inside Padel Maidenhead, Braywick Road.
            </p>
          </div>

          {/* Location */}
          <div className="reveal" style={{ transitionDelay: '0.1s' }}>
            <h4 className="font-display font-medium text-xs tracking-widest uppercase text-apollo-muted mb-5">
              Find Us
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-apollo-muted">Inside Padel Maidenhead</li>
              <li className="text-sm text-apollo-muted">Braywick Road</li>
              <li className="text-sm text-apollo-muted">Maidenhead SL6 1BN</li>
            </ul>
          </div>

          {/* Contact - moved to second row */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <h4 className="font-display font-medium text-xs tracking-widest uppercase text-apollo-muted mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="mailto:apollofitnessstudio@gmail.com"
                  className="text-sm text-apollo-muted hover:text-apollo-text transition-colors duration-300"
                >
                  apollofitnessstudio@gmail.com
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.instagram.com/apollofitnessstudio" 
                  target="_blank" 
                  rel="noopener"
                  className="text-sm text-apollo-muted hover:text-apollo-text transition-colors duration-300"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-apollo-subtle">
            &copy; 2026 Apollo Fitness Studio. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-5">
            <Link 
              href="https://www.instagram.com/apollofitnessstudio" 
              target="_blank" 
              rel="noopener"
              aria-label="Apollo Fitness on Instagram"
              className="text-apollo-muted hover:text-apollo-orange transition-colors duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </Link>
            <Link 
              href="mailto:apollofitnessstudio@gmail.com"
              aria-label="Email Apollo Fitness"
              className="text-apollo-muted hover:text-apollo-orange transition-colors duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 4L12 13 2 4"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}