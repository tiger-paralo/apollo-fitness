"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function Timetable() {
  return (
    <section id="timetable" className="py-24 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Class Timetable
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Check out our weekly schedule and find the perfect time for your workout. 
            All sessions are limited to 8 participants for maximum attention.
          </p>
        </motion.div>

        {/* Timetable Image */}
        <motion.div
          className="relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/timetable.png"
              alt="Apollo Fitness Studio Class Timetable - Weekly Schedule"
              width={800}
              height={600}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-500 rounded-full opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-400 rounded-full opacity-30"></div>
        </motion.div>

        {/* Key Information */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Flexible Sessions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Multiple times throughout the day to fit your schedule
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Small Groups
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Maximum 8 people per session for personalized attention
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              All Levels Welcome
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Every workout is scalable to your fitness level
            </p>
          </div>
        </motion.div>

        {/* Booking CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl border border-teal-200 dark:border-teal-700">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Ready to book your session?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Sessions fill up quickly. Book in advance to secure your spot.
              </p>
            </div>
            <motion.button
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Timetable subject to change. Please check with us for the most up-to-date schedule or any holiday variations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}