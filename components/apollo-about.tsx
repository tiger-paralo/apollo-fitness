"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function About() {
  return (
    <section
      id="about" 
      className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ x: -50, opacity: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to Apollo Fitness Studio Maidenhead
            </h2>
            
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Looking for a gym that&apos;s personal, motivating, and results-driven?
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Apollo Fitness Studio, based inside{" "}
                <strong className="text-teal-600 dark:text-teal-400">Padel Maidenhead</strong>, 
                blends high-energy group training with expert coaching to help you get stronger, 
                move better, and feel more confident.
              </p>

              {/* Feature List — single animation for the group instead of per-item */}
              <ul className="space-y-4 mb-8">
                {[
                  "Expert-led strength & conditioning sessions",
                  "Fully equipped rig – no fluff, just function",
                  "No mirrors. No egos. Just progress.",
                  "Friendly, supportive community"
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mt-1">
                      <svg 
                        className="w-3 h-3 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={3} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                Come for the workout. Stay for the community.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Image/Visual */}
          <motion.div
            initial={{ x: 50, opacity: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/pull.jpeg"
                alt="Athlete using the functional training rig at Apollo Fitness Studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
