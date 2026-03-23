'use client'

import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveals = el.querySelectorAll('.reveal')
    if (reveals.length === 0) return

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
      { threshold: 0.01, rootMargin: '50px 0px 0px 0px' }
    )

    // Observe immediately — IntersectionObserver fires for initial state
    reveals.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [])

  return ref
}
