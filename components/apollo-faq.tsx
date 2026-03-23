"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What should I wear to training sessions?",
      answer: "Comfortable athletic wear that allows for full range of movement. Athletic shoes with good grip are essential. We recommend bringing a water bottle and towel. No need for fancy gear - just come ready to work!"
    },
    {
      question: "Do I need to be fit already to join?",
      answer: "Absolutely not! Apollo welcomes all fitness levels. Our expert coaches will modify every exercise to match your current ability. Whether you're a complete beginner or seasoned athlete, we'll meet you where you are and help you progress."
    },
    {
      question: "What is a WOD?",
      answer: "WOD stands for 'Workout of the Day' - it's a structured, time-efficient workout that combines strength, conditioning, and functional movements. Each WOD is scalable to your level and designed to challenge you while building real-world fitness."
    },
    {
      question: "How do I book a session?",
      answer: "You can book sessions through our online booking system or by contacting us directly. We recommend booking in advance as our small group sessions (max 8 people) fill up quickly. First-time visitors get a complimentary intro session!"
    },
    {
      question: "Where exactly are you located?",
      answer: "We're located on Braywick Road in Maidenhead SL6 1BN. We have dedicated parking available and are easily accessible by public transport. Full address and directions can be found in our contact section."
    },
    {
      question: "What makes Apollo different from regular gyms?",
      answer: "We focus on small group training (max 8 per session) with expert coaching and personalized attention. No mirrors, no egos - just a supportive community focused on real progress through functional fitness and strength training."
    },
    {
      question: "Can I try a session before committing?",
      answer: "Yes! We offer a free introductory session for new members. This lets you experience our training style, meet our coaches, and see if Apollo is the right fit for you. No pressure, just a great workout!"
    },
    {
      question: "What ages do you cater for?",
      answer: "We welcome adults of all ages. Our diverse community includes everyone from young professionals to active seniors. Our coaches are experienced in adapting workouts for different age groups and fitness backgrounds."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers. Here's everything you need to know about training at Apollo.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 1, 0.5, 1], 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg 
                    className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ 
                  height: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.2, delay: openIndex === index ? 0.1 : 0 }
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're here to help! Get in touch and we'll answer any questions you have about Apollo Fitness Studio.
            </p>
            <motion.button
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}