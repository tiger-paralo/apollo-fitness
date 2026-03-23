"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function Video() {
  const [isPlaying, setIsPlaying] = useState(false);

  const vimeoVideoId = "1101338417";
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoVideoId}?badge=0&byline=0&portrait=0&title=0&autoplay=1&loop=0&muted=0&controls=1`;

  return (
    <section id="video" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
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
            See Apollo in Action
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Get a glimpse of our training environment and community spirit
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ y: 30, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            {!isPlaying ? (
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
                </div>

                {/* Play Button */}
                <motion.div
                  className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-medium">Apollo Fitness Studio Tour</p>
                </div>
              </div>
            ) : (
              <iframe
                src={vimeoEmbedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Apollo Fitness Studio Video"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
