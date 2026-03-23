'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'motion/react'

interface CountUpProps {
  value: number
  className?: string
  duration?: number
  suffix?: string
  suffixClassName?: string
}

export function CountUp({
  value,
  className = '',
  duration = 2,
  suffix = '',
  suffixClassName = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })

  const display = useTransform(spring, (current) => Math.round(current))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => {
      setDisplayValue(v)
    })
    return unsubscribe
  }, [display])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {value === 0 ? (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5, delay: 0.3 }}
          style={{ display: 'inline-block' }}
        >
          0
        </motion.span>
      ) : (
        displayValue
      )}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </motion.span>
  )
}
