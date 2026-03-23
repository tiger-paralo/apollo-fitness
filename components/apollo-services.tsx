"use client";

import { motion } from "motion/react";

export function Services() {
  const services = [
    {
      id: 1,
      title: "WOD's",
      subtitle: "Workout of the Day",
      description: "Workout of the Day (WOD) is a structured daily workout designed to challenge your strength, endurance, and overall fitness. Each day features a new set of exercises, typically combining functional movements like lifting, cardio, and bodyweight training. WODs keep your routine varied, help track progress, and are often scalable for all fitness levels — so everyone can take part and improve at their own pace. Join us on a Thursday for a Hyrox specific WOD!",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "bg-orange-500",
      lightColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
      features: [
        "Daily varied workouts",
        "Functional movements",
        "Scalable for all levels",
        "Thursday Hyrox WODs"
      ]
    },
    {
      id: 2,
      title: "Strength and Conditioning",
      subtitle: "Small Group Personal Training",
      description: "Our Strength and Conditioning classes offer small group personal training with a maximum of 8 people per session, ensuring personalised coaching and attention. These classes focus on building functional strength, improving endurance, and enhancing overall fitness through expertly programmed workouts. You'll get the motivation of a group setting with the guidance of a personal trainer — perfect for all fitness levels.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: "bg-teal-500",
      lightColor: "bg-teal-50 dark:bg-teal-900/20",
      textColor: "text-teal-600 dark:text-teal-400",
      features: [
        "Max 8 people per session",
        "Personalized coaching",
        "Functional strength focus",
        "Expert programming"
      ]
    },
    {
      id: 3,
      title: "Yoga",
      subtitle: "Mindfulness & Movement",
      description: "Our Yoga classes offer a blend of relaxation, mindfulness, and physical movement. Whether you're a beginner or an experienced yogi, our classes are designed to improve flexibility, balance, and mental clarity. Through a combination of breathwork, gentle stretches, and strengthening poses, you'll leave each session feeling refreshed, centered, and more connected to your body. Join us to enhance your flexibility, reduce stress, and cultivate inner peace, all while improving your strength and mobility.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "bg-purple-500",
      lightColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      features: [
        "All experience levels",
        "Flexibility & balance",
        "Breathwork techniques",
        "Stress reduction"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Training Programs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our expertly designed programs, each tailored to help you achieve your fitness goals
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`relative ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } flex flex-col lg:flex-row items-center gap-12`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 1, 0.5, 1], 
                delay: index * 0.2 
              }}
              viewport={{ once: true }}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${service.color}`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {service.title}
                    </h3>
                    <p className={`font-medium ${service.textColor}`}>
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + featureIndex * 0.1 + 0.3 
                      }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-2 h-2 rounded-full ${service.color}`} />
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`inline-flex items-center space-x-2 px-6 py-3 ${service.lightColor} ${service.textColor} rounded-lg font-semibold transition-all duration-300 hover:shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Visual Side */}
              <div className="flex-1 relative">
                <div className={`aspect-[4/3] rounded-2xl ${service.lightColor} p-8 flex items-center justify-center relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,${service.color.replace('bg-', 'rgba(').replace('-500', ',0.2)')}50%,transparent_70%)]`} />
                  </div>

                  {/* Icon */}
                  <div className={`w-24 h-24 ${service.color} rounded-full flex items-center justify-center relative z-10`}>
                    <div className="text-white">
                      {React.cloneElement(service.icon, { className: "w-12 h-12" })}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute top-4 right-4 w-8 h-8 ${service.color} rounded-full opacity-20`} />
                  <div className={`absolute bottom-6 left-6 w-6 h-6 ${service.color} rounded-full opacity-30`} />
                  <div className={`absolute top-1/2 left-4 w-4 h-4 ${service.color} rounded-full opacity-25`} />
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-700 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {service.title === "WOD's" ? "Daily" : service.title === "Strength and Conditioning" ? "8 Max" : "All Levels"}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {service.title === "WOD's" ? "Workouts" : service.title === "Strength and Conditioning" ? "Per Class" : "Welcome"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Fitness Journey?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join our community and experience the Apollo difference
          </p>
          <motion.button
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your First Session
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Add React import for cloneElement
import React from 'react';