"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      id="hero" 
      className="hero relative h-screen w-full bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 overflow-hidden flex items-center justify-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(87,181,160,0.2)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(87,181,160,0.1),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-center sm:px-12 lg:px-24">
        {/* Logo/Brand */}
        <motion.div
          className="mb-8 flex items-center justify-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            {/* Fitness Icon/Logo placeholder */}
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
              <svg 
                className="h-8 w-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M9 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-3c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm-9 0h6v6H9V9z"/>
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-white">APOLLO</h2>
              <p className="text-teal-400 text-sm tracking-wider">FITNESS STUDIO</p>
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight text-white font-bold mb-8">
          <motion.span
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            Your Strength,
          </motion.span>
          <motion.span
            className="block text-teal-400"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            Our Focus.
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          className="mt-8 mx-auto max-w-2xl text-[clamp(1.125rem,1.5vw,1.5rem)] leading-relaxed text-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.8 }}
        >
          Expert-led strength & conditioning sessions in Maidenhead. 
          No mirrors. No egos. Just progress.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 1.0 }}
        >
          <button className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Join Us Today
          </button>
          <button className="px-8 py-4 border border-gray-300 hover:bg-gray-100 text-white hover:text-gray-900 rounded-lg font-semibold text-lg transition-all duration-300">
            Watch Our Story
          </button>
        </motion.div>

        {/* Key Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 1.2 }}
        >
          <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Small Group Training</h3>
            <p className="text-gray-300 text-sm">Max 8 people per session</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Expert Coaching</h3>
            <p className="text-gray-300 text-sm">Personalized attention</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Functional Fitness</h3>
            <p className="text-gray-300 text-sm">Real-world strength</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 bg-gray-300 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}