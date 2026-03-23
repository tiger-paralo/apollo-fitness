'use client'

import Link from 'next/link'
import { useState, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

type ClassType = 'WOD' | 'S&C' | 'Pilates' | 'Yoga'

interface ScheduleClass {
  time: string
  type: ClassType
  note?: string
}

interface DaySchedule {
  day: string
  shortDay: string
  subtitle?: string
  classes: ScheduleClass[]
}

const schedule: DaySchedule[] = [
  {
    day: 'Monday',
    shortDay: 'MON',
    classes: [
      { time: '7:15', type: 'WOD' },
      { time: '8:15', type: 'WOD' },
      { time: '9:30', type: 'S&C' },
      { time: '11:00', type: 'Pilates' },
      { time: '5:30 PM', type: 'S&C' },
      { time: '6:45 PM', type: 'WOD' },
    ]
  },
  {
    day: 'Tuesday',
    shortDay: 'TUE',
    classes: [
      { time: '7:15', type: 'WOD' },
      { time: '8:15', type: 'WOD' },
      { time: '9:30', type: 'S&C' },
      { time: '5:30 PM', type: 'S&C' },
      { time: '6:35 PM', type: 'WOD' },
      { time: '7:30 PM', type: 'Pilates' },
    ]
  },
  {
    day: 'Wednesday',
    shortDay: 'WED',
    classes: [
      { time: '7:15', type: 'WOD' },
      { time: '8:15', type: 'WOD' },
      { time: '9:30', type: 'S&C' },
      { time: '5:30 PM', type: 'S&C' },
      { time: '6:45 PM', type: 'WOD' },
    ]
  },
  {
    day: 'Thursday',
    shortDay: 'THU',
    subtitle: 'HYROX',
    classes: [
      { time: '7:15', type: 'WOD' },
      { time: '8:15', type: 'WOD' },
      { time: '9:30', type: 'S&C' },
      { time: '5:30 PM', type: 'S&C' },
      { time: '6:35 PM', type: 'WOD' },
      { time: '7:30 PM', type: 'Yoga' },
    ]
  },
  {
    day: 'Friday',
    shortDay: 'FRI',
    classes: [
      { time: '7:15', type: 'WOD' },
      { time: '8:15', type: 'WOD' },
      { time: '9:30', type: 'S&C' },
      { time: '5:30 PM', type: 'WOD' },
    ]
  },
  {
    day: 'Saturday',
    shortDay: 'SAT',
    classes: [
      { time: '9:30', type: 'WOD', note: 'Team Workout!' },
    ]
  },
]

const classTypeConfig: Record<ClassType, { bg: string; text: string; dot: string }> = {
  'WOD': { bg: 'bg-apollo-orange/15', text: 'text-apollo-orange', dot: 'bg-apollo-orange' },
  'S&C': { bg: 'bg-apollo-teal/15', text: 'text-apollo-teal', dot: 'bg-apollo-teal' },
  'Pilates': { bg: 'bg-purple-500/15', text: 'text-purple-400', dot: 'bg-purple-400' },
  'Yoga': { bg: 'bg-indigo-500/15', text: 'text-indigo-400', dot: 'bg-indigo-400' },
}

function getTodayIndex(): number {
  const day = new Date().getDay()
  if (day === 0) return -1
  return day - 1
}

export function Schedule() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const todayIndex = getTodayIndex()

  const [selectedDay, setSelectedDay] = useState<number>(todayIndex >= 0 ? todayIndex : 0)

  const currentClasses = useMemo(() => {
    return schedule[selectedDay]?.classes ?? []
  }, [selectedDay])

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-12 md:py-16 bg-apollo-card overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header row — title + CTA inline */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-1 block">
                Class Schedule
              </span>
              <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight leading-none">
                Find Your Session
              </h2>
            </div>
            <Link
              href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 bg-apollo-orange text-apollo-text font-display font-bold text-xs tracking-wide uppercase overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-apollo-orange/30 shrink-0 self-start sm:self-auto"
            >
              <span className="relative z-10">First Week Free →</span>
              <div className="absolute inset-0 bg-apollo-orange-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Day tabs — compact horizontal bar */}
          <div className="flex gap-0 mb-4 overflow-x-auto scrollbar-hide border-b border-white/10">
            {schedule.map((day, idx) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(idx)}
                className={`relative flex items-center gap-1.5 px-4 py-2 font-display font-bold text-xs tracking-wider uppercase transition-all duration-200 shrink-0 border-b-2 ${
                  selectedDay === idx
                    ? 'text-apollo-text border-apollo-orange bg-white/5'
                    : 'text-apollo-muted hover:text-apollo-text border-transparent hover:bg-white/[0.03]'
                }`}
              >
                {day.shortDay}
                {day.subtitle && (
                  <span className="text-[9px] text-apollo-orange font-medium tracking-normal">
                    {day.subtitle}
                  </span>
                )}
                {idx === todayIndex && (
                  <div className="w-1.5 h-1.5 bg-apollo-teal rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Classes — compact pill grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <AnimatePresence mode="popLayout">
              {currentClasses.map((cls, i) => {
                const config = classTypeConfig[cls.type]
                return (
                  <motion.div
                    key={`${selectedDay}-${cls.time}-${cls.type}`}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.2, delay: i * 0.02 }}
                    className={`${config.bg} px-3 py-2 flex items-center gap-2 hover:scale-[1.03] transition-transform duration-150 cursor-default`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
                    <span className="font-stat text-base text-white leading-none">
                      {cls.time}
                    </span>
                    <span className={`text-[10px] font-display font-bold uppercase tracking-wider ${config.text}`}>
                      {cls.type}
                    </span>
                    {cls.note && (
                      <span className="text-[9px] text-apollo-muted ml-auto hidden sm:inline">
                        {cls.note}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {currentClasses.length === 0 && (
            <div className="text-center py-6 text-apollo-muted text-sm">
              No classes scheduled.
            </div>
          )}

          {/* Compact legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-white/5">
            {(['WOD', 'S&C', 'Pilates', 'Yoga'] as ClassType[]).map(type => {
              const config = classTypeConfig[type]
              return (
                <div key={type} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                  <span className="text-[10px] text-apollo-muted uppercase tracking-wide font-display">{type}</span>
                </div>
              )
            })}
            <span className="text-[10px] text-apollo-subtle ml-auto">
              AM unless noted PM
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
