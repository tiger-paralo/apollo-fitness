'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * Splash Screen — shows the Apollo icon with a subtle pulse/glow
 * while heavy assets (videos, images) load behind it.
 *
 * Strategy:
 * - Renders immediately (no JS bundle dependency for first paint)
 * - Waits for either: all critical assets loaded, or 4s max timeout
 * - Minimum display of 800ms so it doesn't flash
 * - Smooth reveal animation when dismissing
 */

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const isKeystatic = typeof window !== 'undefined' && window.location.pathname.startsWith('/keystatic')
  const hasSeenSplash = typeof window !== 'undefined' && sessionStorage.getItem('apollo_splash_seen') === '1'
  const [isLoading, setIsLoading] = useState(!hasSeenSplash && !isKeystatic)
  const [isVisible, setIsVisible] = useState(!hasSeenSplash && !isKeystatic)
  const startTime = useRef(Date.now())

  useEffect(() => {
    const MIN_DISPLAY = 800
    const MAX_WAIT = 4000

    const dismiss = () => {
      const elapsed = Date.now() - startTime.current
      const remaining = Math.max(0, MIN_DISPLAY - elapsed)
      setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('apollo_splash_seen', '1')
        // Allow exit animation to play before removing from DOM
        setTimeout(() => setIsVisible(false), 600)
      }, remaining)
    }

    // Strategy 1: Wait for fonts + initial layout
    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    // Strategy 2: Hard timeout — never wait more than MAX_WAIT
    const timeout = setTimeout(dismiss, MAX_WAIT)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('load', dismiss)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-apollo-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Radial glow behind logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-40 h-40 md:w-56 md:h-56 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,200,180,0.08) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Logo */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/apollo-icon.png"
                alt=""
                width={160}
                height={160}
                className="w-20 h-20 md:w-24 md:h-24"
              />

              {/* Minimal loading indicator — three dots */}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-apollo-teal/60"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content renders immediately behind the splash — starts loading assets */}
      <div
        style={{
          visibility: isVisible && isLoading ? 'hidden' : 'visible',
          opacity: isVisible && isLoading ? 0 : 1,
        }}
      >
        {children}
      </div>
    </>
  )
}
