"use client";

import { motion } from "motion/react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "WOD's",
    subtitle: "Workout of the Day",
    description:
      "Workout of the Day (WOD) is a structured daily workout designed to challenge your strength, endurance, and overall fitness. Each day features a new set of exercises, typically combining functional movements like lifting, cardio, and bodyweight training. WODs keep your routine varied, help track progress, and are often scalable for all fitness levels — so everyone can take part and improve at their own pace. Join us on a Thursday for a Hyrox specific WOD!",
    image: "/images/pull.jpeg",
    imageAlt: "Athletes training with the functional rig at Apollo Fitness Studio",
    features: [
      "Daily varied workouts",
      "Functional movements",
      "Scalable for all levels",
      "Thursday Hyrox WODs",
    ],
  },
  {
    id: 2,
    title: "Strength & Conditioning",
    subtitle: "Small Group Personal Training",
    description:
      "Our Strength and Conditioning classes offer small group personal training with a maximum of 8 people per session, ensuring personalised coaching and attention. These classes focus on building functional strength, improving endurance, and enhancing overall fitness through expertly programmed workouts. You'll get the motivation of a group setting with the guidance of a personal trainer — perfect for all fitness levels.",
    image: "/images/pt.jpeg",
    imageAlt: "Personal training session at Apollo Fitness Studio",
    features: [
      "Max 8 people per session",
      "Personalized coaching",
      "Functional strength focus",
      "Expert programming",
    ],
  },
  {
    id: 3,
    title: "Yoga",
    subtitle: "Mindfulness & Movement",
    description:
      "Our Yoga classes offer a blend of relaxation, mindfulness, and physical movement. Whether you're a beginner or an experienced yogi, our classes are designed to improve flexibility, balance, and mental clarity. Through a combination of breathwork, gentle stretches, and strengthening poses, you'll leave each session feeling refreshed, centered, and more connected to your body.",
    image: "/images/pic3.jpeg",
    imageAlt: "Training session at Apollo Fitness Studio",
    features: [
      "All experience levels",
      "Flexibility & balance",
      "Breathwork techniques",
      "Stress reduction",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Our Training Programs
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Expertly designed programs to help you hit your goals
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`flex flex-col ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-10 lg:gap-14`}
              initial={{ y: 40, opacity: 1 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-5">
                <div>
                  <p className="text-teal-500 font-semibold text-sm uppercase tracking-wider mb-1">
                    {service.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>

                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 text-teal-500 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ y: 20, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Start?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join our community and experience the Apollo difference
          </p>
          <button
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Your First Session
          </button>
        </motion.div>
      </div>
    </section>
  );
}
