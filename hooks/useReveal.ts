'use client'

import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveals = el.querySelectorAll('.reveal, .reveal-scale')
    if (reveals.length === 0) return

    // Respect reduced motion — keep everything visible
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Mark section as JS-ready so CSS can safely hide .reveal elements
    el.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((r) => observer.observe(r))

    return () => observer.disconnect()
  }, [])

  return ref
}
