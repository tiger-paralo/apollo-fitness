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

const classTypeConfig: Record<ClassType, { bg: string; text: string; dot: string; border: string }> = {
  'WOD': { bg: 'bg-apollo-orange/10', text: 'text-apollo-orange', dot: 'bg-apollo-orange', border: 'border-apollo-orange/20' },
  'S&C': { bg: 'bg-apollo-teal/10', text: 'text-apollo-teal', dot: 'bg-apollo-teal', border: 'border-apollo-teal/20' },
  'Pilates': { bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-400', border: 'border-purple-400/20' },
  'Yoga': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', dot: 'bg-indigo-400', border: 'border-indigo-400/20' },
}

const allTypes: ClassType[] = ['WOD', 'S&C', 'Pilates', 'Yoga']

function getTodayIndex(): number {
  const day = new Date().getDay()
  // Sunday = 0, our schedule starts Monday = 0
  if (day === 0) return -1 // Sunday — no classes
  return day - 1
}

export function Schedule() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const todayIndex = getTodayIndex()

  const [selectedDay, setSelectedDay] = useState<number>(todayIndex >= 0 ? todayIndex : 0)
  const [filterType, setFilterType] = useState<ClassType | null>(null)

  const filteredClasses = useMemo(() => {
    const day = schedule[selectedDay]
    if (!day) return []
    if (!filterType) return day.classes
    return day.classes.filter(c => c.type === filterType)
  }, [selectedDay, filterType])

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-20 md:py-28 bg-apollo-card overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left — Content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-4 block">
              Class Schedule
            </span>
            <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-5">
              Find Your<br />Session
            </h2>
            <p className="text-apollo-muted text-base leading-relaxed mb-8">
              WODs, Strength & Conditioning, and Hyrox Thursdays — structured across the week so you can build consistency around your life.
            </p>

            {/* First Week Free */}
            <motion.div
              className="bg-apollo-black border border-apollo-orange/20 p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="font-stat text-3xl text-apollo-orange leading-none mb-2">
                First Week Free
              </div>
              <p className="text-apollo-muted text-sm">
                No commitment. No card details. Just turn up and train.
              </p>
            </motion.div>

            <Link
              href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-apollo-orange/30"
            >
              <span className="relative z-10">Claim Your Free Week</span>
              <div className="absolute inset-0 bg-apollo-orange-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Right — Interactive Schedule */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Day Tabs */}
            <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide pb-1">
              {schedule.map((day, idx) => (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(idx)}
                  className={`relative flex flex-col items-center gap-0.5 px-3 py-2.5 font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 shrink-0 ${
                    selectedDay === idx
                      ? 'text-apollo-text bg-white/10'
                      : 'text-apollo-muted hover:text-apollo-text hover:bg-white/5'
                  }`}
                >
                  {day.shortDay}
                  {day.subtitle && (
                    <span className="text-[9px] text-apollo-orange font-medium tracking-normal">
                      {day.subtitle}
                    </span>
                  )}
                  {idx === todayIndex && (
                    <div className="absolute -top-0.5 right-1 w-1.5 h-1.5 bg-apollo-teal rounded-full" />
                  )}
                  {selectedDay === idx && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-apollo-orange"
                      layoutId="dayTab"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Type Filter Pills */}
            <div className="flex gap-1.5 mb-4 flex-wrap">
              <button
                onClick={() => setFilterType(null)}
                className={`px-3 py-1.5 text-xs font-display font-medium uppercase tracking-wider transition-all duration-200 ${
                  filterType === null
                    ? 'bg-white/10 text-white'
                    : 'bg-white/5 text-apollo-muted hover:text-white'
                }`}
              >
                All
              </button>
              {allTypes.map(type => {
                const config = classTypeConfig[type]
                const hasType = schedule[selectedDay]?.classes.some(c => c.type === type)
                if (!hasType) return null
                return (
                  <button
                    key={type}
                    onClick={() => setFilterType(filterType === type ? null : type)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-medium uppercase tracking-wider transition-all duration-200 ${
                      filterType === type
                        ? `${config.bg} ${config.text} ${config.border} border`
                        : 'bg-white/5 text-apollo-muted hover:text-white'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    {type}
                  </button>
                )
              })}
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              <AnimatePresence mode="popLayout">
                {filteredClasses.map((cls, i) => {
                  const config = classTypeConfig[cls.type]
                  return (
                    <motion.div
                      key={`${selectedDay}-${cls.time}-${cls.type}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25, delay: i * 0.03 }}
                      className={`${config.bg} border ${config.border} p-3 group hover:scale-[1.02] transition-transform duration-200 cursor-default`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                        <span className={`text-sm font-display font-bold uppercase ${config.text}`}>
                          {cls.type}
                        </span>
                      </div>
                      <div className="text-lg font-stat text-white leading-none">
                        {cls.time}
                      </div>
                      {cls.note && (
                        <div className="text-[10px] text-apollo-muted mt-1 font-display uppercase tracking-wider">
                          {cls.note}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {filteredClasses.length === 0 && (
              <div className="text-center py-8 text-apollo-muted text-sm">
                No {filterType} classes on {schedule[selectedDay]?.day}.
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-white/5">
              {allTypes.map(type => {
                const config = classTypeConfig[type]
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                    <span className="text-xs text-apollo-muted uppercase tracking-wide">{type}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
