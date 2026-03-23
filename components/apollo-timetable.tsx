"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function Timetable() {
  return (
    <section id="timetable" className="py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 20, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Class Timetable
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            All sessions are limited to 8 participants for maximum attention.
          </p>
        </motion.div>

        {/* Timetable Image */}
        <motion.div
          className="relative"
          initial={{ y: 30, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/timetable.png"
              alt="Apollo Fitness Studio Class Timetable - Weekly Schedule"
              width={800}
              height={600}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </motion.div>

        {/* Booking CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ y: 20, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Sessions fill up quickly. Book in advance to secure your spot.
          </p>
          <button
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Now
          </button>
          <p className="mt-4 text-gray-400 dark:text-gray-500 text-xs">
            Timetable subject to change. Check with us for holiday variations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
