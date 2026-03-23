'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

type ClassType = 'WOD' | 'S&C' | 'Pilates' | 'Yoga'

interface ScheduleClass {
  time: string
  type: ClassType
  note?: string
}

interface DaySchedule {
  day: string
  subtitle?: string
  classes: ScheduleClass[]
}

const schedule: DaySchedule[] = [
  {
    day: 'Monday',
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
    subtitle: 'HYROX DAY',
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
    classes: [
      { time: '7:15', type: 'WOD' },
      { time: '8:15', type: 'WOD' },
      { time: '9:30', type: 'S&C' },
      { time: '5:30 PM', type: 'WOD' },
    ]
  },
  {
    day: 'Saturday',
    classes: [
      { time: '9:30', type: 'WOD', note: 'Team Workout!' },
    ]
  },
]

const classTypeStyles: Record<ClassType, { bg: string; text: string; dot: string }> = {
  'WOD': { bg: 'bg-apollo-orange/10', text: 'text-apollo-orange', dot: 'bg-apollo-orange' },
  'S&C': { bg: 'bg-apollo-teal/10', text: 'text-apollo-teal', dot: 'bg-apollo-teal' },
  'Pilates': { bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-400' },
  'Yoga': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', dot: 'bg-indigo-400' },
}

function ClassPill({ cls }: { cls: ScheduleClass }) {
  const style = classTypeStyles[cls.type]
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${style.bg} border border-white/5`}>
      <div className={`w-2 h-2 ${style.dot} shrink-0`} />
      <span className="text-sm text-apollo-muted font-mono w-16 shrink-0">{cls.time}</span>
      <span className={`text-sm font-display font-bold uppercase tracking-wide ${style.text}`}>
        {cls.type}
      </span>
      {cls.note && (
        <span className="text-xs text-apollo-muted ml-auto hidden sm:inline">
          {cls.note}
        </span>
      )}
    </div>
  )
}

export function Schedule() {
  const sectionRef = useReveal()
  const [openDay, setOpenDay] = useState<number>(0)

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-28 md:py-36 bg-apollo-card overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute -top-32 -right-10 w-[28rem] h-[28rem] bg-gradient-radial from-apollo-orange/4 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="schedule-content reveal">
            <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-teal mb-4 block">
              Class Schedule
            </span>
            <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight mb-6">
              Find Your<br />Session
            </h2>
            <p className="text-apollo-muted text-lg leading-relaxed mb-8">
              WODs, Strength & Conditioning, and Hyrox Thursdays — structured across the week so you can build consistency around your life. Every session is coached. Every session counts.
            </p>

            {/* First Week Free Offer */}
            <div className="free-week-box bg-apollo-black border border-apollo-orange/20 p-8 mb-8 reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="font-stat text-4xl text-apollo-orange leading-none mb-2">
                First Week Free
              </div>
              <p className="text-apollo-muted text-sm">
                No commitment. No card details. Just turn up, train, and see if Apollo is your kind of gym.
              </p>
            </div>

            <Link
              href="mailto:apollofitnessstudio@gmail.com?subject=Free%20Trial%20Week"
              className="inline-flex items-center justify-center px-10 py-4 bg-apollo-orange text-apollo-text font-display font-bold text-sm tracking-wide uppercase border-none cursor-pointer transition-all duration-300 hover:bg-apollo-orange-hover hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-apollo-orange/30"
            >
              Claim Your Free Week
            </Link>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-8">
              {(Object.entries(classTypeStyles) as [ClassType, typeof classTypeStyles[ClassType]][]).map(([type, style]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 ${style.dot}`} />
                  <span className="text-xs text-apollo-muted uppercase tracking-wide">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timetable */}
          <div className="schedule-table reveal" style={{ transitionDelay: '0.1s' }}>
            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-2">
              {schedule.map((day, idx) => (
                <div key={day.day} className="border border-white/10 bg-apollo-black">
                  <button
                    onClick={() => setOpenDay(openDay === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="font-display font-bold text-lg uppercase">{day.day}</h3>
                      {day.subtitle && (
                        <span className="text-xs font-display uppercase tracking-wider text-apollo-orange bg-apollo-orange/10 px-2 py-0.5">
                          {day.subtitle}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-apollo-muted">{day.classes.length} classes</span>
                      <svg
                        className={`w-4 h-4 text-apollo-muted transition-transform duration-300 ${openDay === idx ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>
                  <div className={`schedule-accordion-content ${openDay === idx ? 'open' : ''}`}>
                    <div className="schedule-accordion-inner">
                      <div className="px-3 pb-3 space-y-1">
                        {day.classes.map((cls, i) => (
                          <ClassPill key={i} cls={cls} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:block border border-white/10 bg-apollo-black overflow-hidden">
              {schedule.map((day) => (
                <div key={day.day} className="border-b border-white/5 last:border-b-0">
                  <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02]">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wide min-w-24">{day.day}</h3>
                    {day.subtitle && (
                      <span className="text-xs font-display uppercase tracking-wider text-apollo-orange bg-apollo-orange/10 px-2 py-0.5">
                        {day.subtitle}
                      </span>
                    )}
                  </div>
                  <div className="px-3 pb-3 pt-1 grid grid-cols-2 gap-1">
                    {day.classes.map((cls, i) => (
                      <ClassPill key={i} cls={cls} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
