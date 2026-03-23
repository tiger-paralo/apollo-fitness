"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to Apollo Fitness Studio Maidenhead
            </h2>
            
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Looking for a gym that's personal, motivating, and results-driven?
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Apollo Fitness Studio, based inside{" "}
                <strong className="text-teal-600 dark:text-teal-400">Padel Maidenhead</strong>, 
                blends high-energy group training with expert coaching to help you get stronger, 
                move better, and feel more confident.
              </p>

              {/* Feature List */}
              <ul className="space-y-4 mb-8">
                {[
                  "Expert-led strength & conditioning sessions",
                  "Fully equipped rig – no fluff, just function",
                  "No mirrors. No egos. Just progress.",
                  "Friendly, supportive community"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 1, 0.5, 1],
                      delay: index * 0.1 + 0.2
                    }}
                    viewport={{ once: true }}
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
                  </motion.li>
                ))}
              </ul>

              <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                Come for the workout. Stay for the community.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Image/Visual */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Placeholder for gym image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800">
              {/* This would be replaced with actual gym photos */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-teal-500 rounded-full flex items-center justify-center">
                    <svg 
                      className="w-12 h-12 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                      />
                    </svg>
                  </div>
                  <p className="text-teal-700 dark:text-teal-300 font-medium">
                    Gym Photos Coming Soon
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl" />
              <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/30 rounded-full blur-lg" />
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" 
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max per class</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Functional</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}