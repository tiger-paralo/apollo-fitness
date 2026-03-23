'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScFSP6S6i4zYLbH6nH4Pjl_0gk1ZY9fYjr8pM_ZCiTzRivdIg/formResponse'

const GOALS = ['Weight Loss', 'Muscle Gain', 'Improve Endurance', 'General Fitness', 'Sports Performance']
const TIMES = ['7.15am', '8.15am', '9.30am', '5.30pm', '6.45pm']
const TOTAL_STEPS = 4

interface FormData {
  name: string
  phone: string
  email: string
  date: string
  goals: string[]
  times: string[]
  source: string
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 transition-all duration-500 ${
            i < current ? 'bg-apollo-teal' : i === current ? 'bg-apollo-orange' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
}

export function TrialForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    goals: [],
    times: [],
    source: '',
  })

  const update = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArray = (field: 'goals' | 'times', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }))
  }

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return formData.name.trim().length > 0 && formData.phone.trim().length > 0
      case 1: return formData.email.trim().length > 0
      case 2: return true // goals optional
      case 3: return formData.times.length > 0
      default: return false
    }
  }

  const next = () => {
    if (!canAdvance()) return
    setDirection(1)
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1)
    } else {
      handleSubmit()
    }
  }

  const back = () => {
    setDirection(-1)
    setStep(s => Math.max(0, s - 1))
  }

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    const body = new URLSearchParams()
    body.append('entry.328762475', formData.name)
    body.append('entry.2069129699', formData.phone)
    body.append('entry.930354868', formData.email)
    body.append('entry.1430997778', formData.date)
    body.append('entry.276119753', formData.source)
    formData.goals.forEach(g => body.append('entry.59001812', g))
    formData.times.forEach(t => body.append('entry.816097712', t))

    try {
      await fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body })
    } catch { /* no-cors always resolves */ }

    setSubmitting(false)
    setSubmitted(true)
  }, [formData])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canAdvance()) {
      e.preventDefault()
      next()
    }
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <section ref={sectionRef} id="trial" className="relative py-14 md:py-20 bg-apollo-card border-t border-white/5">
      <div className="container mx-auto max-w-lg px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-orange mb-1 block">
              Get Started
            </span>
            <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight leading-none mb-2">
              Book Your Free Trial
            </h2>
            <p className="text-apollo-muted text-sm">
              Takes 30 seconds. We&apos;ll get you booked in.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 border border-apollo-teal/30 bg-apollo-teal/5"
            >
              <div className="text-3xl mb-3">🎉</div>
              <h3 className="font-display font-bold text-lg uppercase tracking-wide mb-2">
                You&apos;re In
              </h3>
              <p className="text-apollo-muted text-sm max-w-sm mx-auto">
                We&apos;ll be in touch shortly to get your trial week booked. See you at Apollo.
              </p>
            </motion.div>
          ) : (
            <div onKeyDown={handleKeyDown}>
              <StepIndicator current={step} total={TOTAL_STEPS} />

              <div className="relative min-h-[200px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="space-y-4"
                  >
                    {step === 0 && (
                      <>
                        <p className="font-display font-bold text-sm uppercase tracking-wide text-white mb-4">
                          Let&apos;s start with you
                        </p>
                        <div>
                          <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                            Full Name <span className="text-apollo-orange">*</span>
                          </label>
                          <input
                            type="text"
                            autoFocus
                            value={formData.name}
                            onChange={e => update('name', e.target.value)}
                            placeholder="Your name"
                            className="w-full bg-apollo-black border border-white/10 px-3 py-3 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                            Phone <span className="text-apollo-orange">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => update('phone', e.target.value)}
                            placeholder="07XXX XXXXXX"
                            className="w-full bg-apollo-black border border-white/10 px-3 py-3 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                          />
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <p className="font-display font-bold text-sm uppercase tracking-wide text-white mb-4">
                          How do we reach you?
                        </p>
                        <div>
                          <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                            Email <span className="text-apollo-orange">*</span>
                          </label>
                          <input
                            type="email"
                            autoFocus
                            value={formData.email}
                            onChange={e => update('email', e.target.value)}
                            placeholder="you@email.com"
                            className="w-full bg-apollo-black border border-white/10 px-3 py-3 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                            Preferred Start Date
                          </label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={e => update('date', e.target.value)}
                            className="w-full bg-apollo-black border border-white/10 px-3 py-3 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors [color-scheme:dark]"
                          />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <p className="font-display font-bold text-sm uppercase tracking-wide text-white mb-1">
                          What are you training for?
                        </p>
                        <p className="text-apollo-muted text-xs mb-4">Pick as many as you like</p>
                        <div className="flex flex-wrap gap-2">
                          {GOALS.map(goal => (
                            <button
                              key={goal}
                              type="button"
                              onClick={() => toggleArray('goals', goal)}
                              className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wide border transition-all duration-200 ${
                                formData.goals.includes(goal)
                                  ? 'bg-apollo-teal/15 border-apollo-teal/40 text-apollo-teal'
                                  : 'border-white/10 text-apollo-muted hover:border-white/20'
                              }`}
                            >
                              {goal}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <p className="font-display font-bold text-sm uppercase tracking-wide text-white mb-1">
                          When suits you? <span className="text-apollo-orange">*</span>
                        </p>
                        <p className="text-apollo-muted text-xs mb-4">Select the class times that work</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {TIMES.map(time => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => toggleArray('times', time)}
                              className={`px-4 py-2.5 text-sm font-stat tracking-wide border transition-all duration-200 ${
                                formData.times.includes(time)
                                  ? 'bg-apollo-orange/15 border-apollo-orange/40 text-apollo-orange'
                                  : 'border-white/10 text-apollo-muted hover:border-white/20'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        <div>
                          <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                            Where did you hear about us?
                          </label>
                          <input
                            type="text"
                            value={formData.source}
                            onChange={e => update('source', e.target.value)}
                            placeholder="Instagram, friend, Google..."
                            className="w-full bg-apollo-black border border-white/10 px-3 py-3 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="text-xs font-display font-bold uppercase tracking-widest text-apollo-muted hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance() || submitting}
                  className={`group relative inline-flex items-center justify-center px-8 py-3 font-display font-bold text-sm tracking-wide uppercase overflow-hidden transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
                    step === TOTAL_STEPS - 1
                      ? 'bg-apollo-orange text-white hover:shadow-lg hover:shadow-apollo-orange/30'
                      : 'bg-white/5 text-white border border-white/10 hover:border-apollo-teal/40 hover:bg-apollo-teal/5'
                  }`}
                >
                  <span className="relative z-10">
                    {submitting
                      ? 'Sending...'
                      : step === TOTAL_STEPS - 1
                        ? 'Book My Free Trial →'
                        : 'Continue →'}
                  </span>
                  {step === TOTAL_STEPS - 1 && (
                    <div className="absolute inset-0 bg-apollo-orange-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}
                </button>
              </div>

              <p className="text-[10px] text-apollo-subtle text-center mt-6">
                No commitment. No card details. Just turn up and train.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
