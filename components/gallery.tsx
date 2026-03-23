"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const galleryImages = [
  {
    src: "/images/ed-pic.png",
    alt: "Ed providing personal training at Apollo Fitness Studio",
  },
  {
    src: "/images/alex-pic.png",
    alt: "Alex performing strength training exercises",
  },
  {
    src: "/images/pull.jpeg",
    alt: "Athlete using the functional training rig",
  },
  {
    src: "/images/pt.jpeg",
    alt: "Personal training session in progress",
  },
  {
    src: "/images/pic3.jpeg",
    alt: "High-energy training session at Apollo",
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-16">
        <motion.div
          className="text-center mb-10"
          initial={{ y: 20, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Our Community in Action
          </h2>
        </motion.div>

        {/* Simple 3-column grid, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
              initial={{ y: 20, opacity: 1 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={800}
              height={600}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              sizes="90vw"
            />
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
