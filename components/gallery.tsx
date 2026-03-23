"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Real Apollo Fitness Studio images
  const galleryImages = [
    {
      id: 1,
      src: "/images/ed-pic.png",
      title: "Expert Coaching",
      description: "Personalized training with Ed",
      alt: "Ed providing personal training session at Apollo Fitness Studio"
    },
    {
      id: 2,
      src: "/images/alex-pic.png",
      title: "Strength Training",
      description: "Alex demonstrating proper form",
      alt: "Alex performing strength training exercises"
    },
    {
      id: 3,
      src: "/images/pic3.jpeg",
      title: "Gym Action",
      description: "High-energy training session",
      alt: "Action shot of training session at Apollo Fitness Studio"
    },
    {
      id: 4,
      src: "/images/pt.jpeg",
      title: "Personal Training",
      description: "One-on-one coaching session",
      alt: "Personal training session in progress"
    },
    {
      id: 5,
      src: "/images/pull.jpeg",
      title: "Functional Rig",
      description: "Pull-up and functional training",
      alt: "Athlete using the functional training rig for pull-ups"
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
            See Our Community in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take a look inside Apollo Fitness Studio and witness the transformation happening every day
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="break-inside-avoid group relative overflow-hidden cursor-pointer rounded-xl bg-gray-100 dark:bg-gray-700"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 1, 0.5, 1], 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-gray-200 text-sm">{image.description}</p>
                  </div>
                </div>

                {/* View Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg 
                    className="w-5 h-5 text-white" 
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-teal-50 dark:bg-teal-900/20 rounded-full border border-teal-200 dark:border-teal-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">8</span>
              </div>
              <span className="text-teal-700 dark:text-teal-300 font-medium text-sm">
                Max participants per session
              </span>
            </div>
            <div className="w-px h-6 bg-teal-200 dark:bg-teal-700"></div>
            <span className="text-teal-600 dark:text-teal-400 text-sm font-medium">
              Small group training for maximum attention
            </span>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={800}
              height={600}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}