"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function Video() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Apollo's actual Vimeo video ID
  const vimeoVideoId = "1101338417";
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoVideoId}?badge=0&byline=0&portrait=0&title=0&autoplay=1&loop=0&muted=0&controls=1`;

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section id="video" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See Apollo Fitness Studio in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get a glimpse of our training environment, community spirit, and what makes Apollo different
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Video Player or Thumbnail */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            {!isPlaying ? (
              // Video Thumbnail/Placeholder
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 flex items-center justify-center cursor-pointer group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
                </div>
                
                {/* Play Button */}
                <motion.button
                  className="relative z-10 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
                  onClick={handlePlayVideo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-10 h-10 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.button>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">Apollo Fitness Studio Tour</h3>
                    <p className="text-gray-200">Discover our training philosophy and community</p>
                  </div>
                </div>

                {/* Apollo Logo/Branding */}
                <div className="absolute top-6 left-6 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg 
                      className="w-4 h-4 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-3c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm-9 0h6v6H9V9z"/>
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm">Apollo Fitness</span>
                </div>
              </div>
            ) : (
              // Vimeo Embed
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

          {/* Video Stats/Info */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 mx-auto mb-3 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-teal-600 dark:text-teal-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Our Facility</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Inside Padel Maidenhead</p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-orange-600 dark:text-orange-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Community</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Supportive & motivating</p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-green-600 dark:text-green-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Expert Coaching</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Personalized attention</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}