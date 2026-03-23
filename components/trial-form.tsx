'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'motion/react'

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScFSP6S6i4zYLbH6nH4Pjl_0gk1ZY9fYjr8pM_ZCiTzRivdIg/formResponse'

/*  Google Forms entry IDs (extracted from public form HTML):
    Full name       → 328762475   (inside question 1810715756)
    Phone number    → 2069129699  (inside question 2099696470)
    Start date      → 1430997778  (inside question 307704121)
    Fitness goals   → 59001812    (inside question 144983198, checkboxes)
    Preferred times → 816097712   (inside question 1956005954, checkboxes)
    Email           → 930354868   (inside question 1797709771)
    Hear about us   → 276119753   (inside question 949113439)
*/

const GOALS = ['Weight Loss', 'Muscle Gain', 'Improve Endurance', 'General Fitness', 'Sports Performance']
const TIMES = ['7.15am', '8.15am', '9.30am', '5.30pm', '6.45pm']

export function TrialForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)

    // Map to Google Forms entry IDs
    const body = new URLSearchParams()
    body.append('entry.328762475', data.get('name') as string)
    body.append('entry.2069129699', data.get('phone') as string)
    body.append('entry.930354868', data.get('email') as string)
    body.append('entry.1430997778', data.get('date') as string)
    body.append('entry.276119753', data.get('source') as string)

    // Checkboxes — multiple values
    const goals = data.getAll('goals')
    goals.forEach(g => body.append('entry.59001812', g as string))
    const times = data.getAll('times')
    times.forEach(t => body.append('entry.816097712', t as string))

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body,
      })
      setSubmitted(true)
    } catch {
      // no-cors will always succeed from client side; this is a safety net
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }, [])

  return (
    <section ref={sectionRef} id="trial" className="relative py-14 md:py-20 bg-apollo-card border-t border-white/5">
      <div className="container mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <span className="font-display font-medium text-xs tracking-widest uppercase text-apollo-orange mb-1 block">
              Get Started
            </span>
            <h2 className="font-display font-bold text-heading-lg uppercase tracking-tight leading-none mb-2">
              Book Your Free Trial
            </h2>
            <p className="text-apollo-muted text-sm max-w-md mx-auto">
              Your first week is on us. Fill this in and we&apos;ll be in touch to get you booked.
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
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                    Full Name <span className="text-apollo-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-apollo-black border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                    Phone <span className="text-apollo-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="07XXX XXXXXX"
                    className="w-full bg-apollo-black border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email + Start date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                    Email <span className="text-apollo-orange">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    className="w-full bg-apollo-black border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full bg-apollo-black border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Fitness Goals — checkboxes */}
              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-2">
                  Fitness Goals
                </label>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map(goal => (
                    <label key={goal} className="group cursor-pointer">
                      <input type="checkbox" name="goals" value={goal} className="peer sr-only" />
                      <span className="inline-block px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wide border border-white/10 text-apollo-muted transition-all duration-200 peer-checked:bg-apollo-teal/15 peer-checked:border-apollo-teal/40 peer-checked:text-apollo-teal group-hover:border-white/20">
                        {goal}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Times — checkboxes */}
              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-2">
                  Preferred Times <span className="text-apollo-orange">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map(time => (
                    <label key={time} className="group cursor-pointer">
                      <input type="checkbox" name="times" value={time} className="peer sr-only" />
                      <span className="inline-block px-3 py-1.5 text-xs font-stat tracking-wide border border-white/10 text-apollo-muted transition-all duration-200 peer-checked:bg-apollo-orange/15 peer-checked:border-apollo-orange/40 peer-checked:text-apollo-orange group-hover:border-white/20">
                        {time}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div>
                <label className="block text-[10px] font-display font-bold uppercase tracking-widest text-apollo-muted mb-1.5">
                  Where did you hear about us?
                </label>
                <input
                  type="text"
                  name="source"
                  placeholder="Instagram, friend, Google..."
                  className="w-full bg-apollo-black border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-apollo-subtle focus:border-apollo-teal/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-apollo-orange text-white font-display font-bold text-sm tracking-wide uppercase overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-apollo-orange/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {submitting ? 'Sending...' : 'Book My Free Trial →'}
                </span>
                <div className="absolute inset-0 bg-apollo-orange-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <p className="text-[10px] text-apollo-subtle">
                No commitment. No card details. Just turn up and train.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
