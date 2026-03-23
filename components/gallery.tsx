"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder images - these would be replaced with actual Apollo gym photos
  const galleryImages = [
    {
      id: 1,
      title: "Strength Training",
      description: "Expert coaching in action",
      placeholder: "strength-training"
    },
    {
      id: 2,
      title: "Group Session",
      description: "Community focused workouts",
      placeholder: "group-session"
    },
    {
      id: 3,
      title: "Functional Rig",
      description: "Fully equipped training area",
      placeholder: "functional-rig"
    },
    {
      id: 4,
      title: "Personal Training",
      description: "One-on-one guidance",
      placeholder: "personal-training"
    },
    {
      id: 5,
      title: "HIIT Session",
      description: "High-intensity training",
      placeholder: "hiit-session"
    },
    {
      id: 6,
      title: "Schedule Board",
      description: "Class timetable",
      placeholder: "schedule"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-gray-800">
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
            Sweat it Out: Our Fitness Journey in Pictures
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take a look inside Apollo Fitness Studio and see our community in action
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 1, 0.5, 1], 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image.placeholder)}
            >
              {/* Placeholder Image Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 mb-4 bg-teal-500 rounded-full flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {image.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg 
                    className="w-12 h-12 mx-auto mb-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                    />
                  </svg>
                  <p className="text-sm font-medium">View Photo</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note about real images */}
        <motion.div
          className="mt-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 rounded-full border border-teal-200 dark:border-teal-800">
            <svg 
              className="w-5 h-5 text-teal-600 dark:text-teal-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className="text-sm text-teal-700 dark:text-teal-300 font-medium">
              Gallery will be updated with real Apollo Fitness Studio photos
            </span>
          </div>
        </motion.div>
      </div>

      {/* Modal for enlarged view (optional) */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="max-w-4xl max-h-full bg-white dark:bg-gray-800 rounded-xl p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center p-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {galleryImages.find(img => img.placeholder === selectedImage)?.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                High-quality photo will be displayed here
              </p>
              <button
                className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}