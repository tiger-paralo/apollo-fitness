'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer
      ref={ref}
      id="contact"
      className="border-t border-white/5 pt-10 pb-6"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display font-bold text-2xl uppercase mb-3">
              Apollo Fitness Studio
            </h3>
            <p className="text-apollo-muted text-sm leading-relaxed max-w-sm">
              Functional fitness, expert coaching, and a community that gives a damn. Inside Padel Maidenhead, Braywick Road.
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display font-medium text-xs tracking-widest uppercase text-apollo-muted mb-4">
              Find Us
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-apollo-muted">Inside Padel Maidenhead</li>
              <li className="text-sm text-apollo-muted">Braywick Road</li>
              <li className="text-sm text-apollo-muted">Maidenhead SL6 1BN</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display font-medium text-xs tracking-widest uppercase text-apollo-muted mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2">
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
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
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

      {/* Bottom bar */}
      <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[11px] text-apollo-muted/50 max-w-6xl mx-auto px-6">
        <span>© {new Date().getFullYear()} Apollo Fitness Studio</span>
        <Link href="/privacy-policy" className="hover:text-apollo-muted transition-colors">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}
