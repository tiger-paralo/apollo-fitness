"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import type { SiteInfoData } from "@/lib/content";

const GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Improve Endurance",
  "General Fitness",
  "Sports Performance",
];
const TIMES = ["7.15am", "8.15am", "9.30am", "5.30pm", "6.45pm"];
const TOTAL_STEPS = 4;
const DEFAULT_WHATSAPP_NUMBER = "447521216772";

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  goals: string[];
  times: string[];
  source: string;
}

function buildWhatsAppUrl(formData: FormData, whatsappNumber: string): string {
  const lines = [
    "Hi Alex, I'd like to book my free trial at Apollo Fitness Studio.",
    "",
    `Name: ${formData.name.trim()}`,
    `Phone: ${formData.phone.trim()}`,
    `Email: ${formData.email.trim()}`,
    `Preferred start date: ${formData.date || "Flexible"}`,
    `Goals: ${formData.goals.length ? formData.goals.join(", ") : "Not specified"}`,
    `Best class times: ${formData.times.join(", ")}`,
    `Heard about Apollo: ${formData.source.trim() || "Not specified"}`,
  ];

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8 flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 transition-all duration-500 ${
            i < current
              ? "bg-apollo-teal"
              : i === current
                ? "bg-apollo-orange"
                : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export function TrialForm({ siteInfo }: { siteInfo: SiteInfoData | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);
  const whatsappNumber = siteInfo?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    goals: [],
    times: [],
    source: "",
  });

  const update = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArray = (field: "goals" | "times", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return (
          formData.name.trim().length > 0 && formData.phone.trim().length > 0
        );
      case 1:
        return formData.email.trim().length > 0;
      case 2:
        return true; // goals optional
      case 3:
        return formData.times.length > 0;
      default:
        return false;
    }
  };

  const next = () => {
    if (!canAdvance()) return;
    setDirection(1);
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = useCallback(async () => {
    window.location.href = buildWhatsAppUrl(formData, whatsappNumber);
    setSubmitted(true);
  }, [formData, whatsappNumber]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canAdvance()) {
      e.preventDefault();
      next();
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      ref={sectionRef}
      id="trial"
      className="bg-apollo-card relative border-t border-white/5 py-14 md:py-20"
    >
      <div className="container mx-auto max-w-lg px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <span className="font-display text-apollo-orange mb-1 block text-xs font-medium tracking-widest uppercase">
              Get Started
            </span>
            <h2 className="font-display text-heading-lg mb-2 leading-none font-bold tracking-tight uppercase">
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
              className="border-apollo-teal/30 bg-apollo-teal/5 border py-12 text-center"
            >
              <div className="mb-3 text-3xl">🎉</div>
              <h3 className="font-display mb-2 text-lg font-bold tracking-wide uppercase">
                WhatsApp Opened
              </h3>
              <p className="text-apollo-muted mx-auto max-w-sm text-sm">
                Send the pre-filled message to Alex and we&apos;ll get your free
                trial week booked.
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
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    {step === 0 && (
                      <>
                        <p className="font-display mb-4 text-sm font-bold tracking-wide text-white uppercase">
                          Let&apos;s start with you
                        </p>
                        <div>
                          <label className="font-display text-apollo-muted mb-1.5 block text-[10px] font-bold tracking-widest uppercase">
                            Full Name{" "}
                            <span className="text-apollo-orange">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Your name"
                            className="bg-apollo-black placeholder:text-apollo-subtle focus:border-apollo-teal/50 w-full border border-white/10 px-3 py-3 text-sm text-white transition-colors focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-display text-apollo-muted mb-1.5 block text-[10px] font-bold tracking-widest uppercase">
                            Phone <span className="text-apollo-orange">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="07XXX XXXXXX"
                            className="bg-apollo-black placeholder:text-apollo-subtle focus:border-apollo-teal/50 w-full border border-white/10 px-3 py-3 text-sm text-white transition-colors focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <p className="font-display mb-4 text-sm font-bold tracking-wide text-white uppercase">
                          How do we reach you?
                        </p>
                        <div>
                          <label className="font-display text-apollo-muted mb-1.5 block text-[10px] font-bold tracking-widest uppercase">
                            Email <span className="text-apollo-orange">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="you@email.com"
                            className="bg-apollo-black placeholder:text-apollo-subtle focus:border-apollo-teal/50 w-full border border-white/10 px-3 py-3 text-sm text-white transition-colors focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="font-display text-apollo-muted mb-1.5 block text-[10px] font-bold tracking-widest uppercase">
                            Preferred Start Date
                          </label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => update("date", e.target.value)}
                            className="bg-apollo-black placeholder:text-apollo-subtle focus:border-apollo-teal/50 w-full border border-white/10 px-3 py-3 text-sm text-white [color-scheme:dark] transition-colors focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <p className="font-display mb-1 text-sm font-bold tracking-wide text-white uppercase">
                          What are you training for?
                        </p>
                        <p className="text-apollo-muted mb-4 text-xs">
                          Pick as many as you like
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {GOALS.map((goal) => (
                            <button
                              key={goal}
                              type="button"
                              onClick={() => toggleArray("goals", goal)}
                              className={`font-display border px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                                formData.goals.includes(goal)
                                  ? "bg-apollo-teal/15 border-apollo-teal/40 text-apollo-teal"
                                  : "text-apollo-muted border-white/10 hover:border-white/20"
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
                        <p className="font-display mb-1 text-sm font-bold tracking-wide text-white uppercase">
                          When suits you?{" "}
                          <span className="text-apollo-orange">*</span>
                        </p>
                        <p className="text-apollo-muted mb-4 text-xs">
                          Select the class times that work
                        </p>
                        <div className="mb-6 flex flex-wrap gap-2">
                          {TIMES.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => toggleArray("times", time)}
                              className={`font-stat border px-4 py-2.5 text-sm tracking-wide transition-all duration-200 ${
                                formData.times.includes(time)
                                  ? "bg-apollo-orange/15 border-apollo-orange/40 text-apollo-orange"
                                  : "text-apollo-muted border-white/10 hover:border-white/20"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        <div>
                          <label className="font-display text-apollo-muted mb-1.5 block text-[10px] font-bold tracking-widest uppercase">
                            Where did you hear about us?
                          </label>
                          <input
                            type="text"
                            value={formData.source}
                            onChange={(e) => update("source", e.target.value)}
                            placeholder="Instagram, friend, Google..."
                            className="bg-apollo-black placeholder:text-apollo-subtle focus:border-apollo-teal/50 w-full border border-white/10 px-3 py-3 text-sm text-white transition-colors focus:outline-none"
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="font-display text-apollo-muted text-xs font-bold tracking-widest uppercase transition-colors hover:text-white"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance()}
                  className={`group font-display relative inline-flex items-center justify-center overflow-hidden px-8 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${
                    step === TOTAL_STEPS - 1
                      ? "bg-apollo-orange hover:shadow-apollo-orange/30 text-white hover:shadow-lg"
                      : "hover:border-apollo-teal/40 hover:bg-apollo-teal/5 border border-white/10 bg-white/5 text-white"
                  }`}
                >
                  <span className="relative z-10">
                    {step === TOTAL_STEPS - 1
                      ? "Book via WhatsApp →"
                      : "Continue →"}
                  </span>
                  {step === TOTAL_STEPS - 1 && (
                    <div className="bg-apollo-orange-hover absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  )}
                </button>
              </div>

              <p className="text-apollo-subtle mt-6 text-center text-[10px]">
                No commitment. No card details. Just turn up and train.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
