"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-12 w-40 mb-4">
                <Image
                  src="/images/apollo-logo.jpg"
                  alt="Apollo Fitness Studio Logo"
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </div>
            </motion.div>
            
            <motion.p
              className="text-gray-300 mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Your strength, our focus. Apollo Fitness Studio offers expert-led strength & conditioning sessions, 
              WODs, and yoga classes in Maidenhead. No mirrors. No egos. Just progress.
            </motion.p>

            {/* Social Media */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a
                href="https://www.instagram.com/apollofitnessstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987C18.634 23.974 24 18.607 24 11.987 24 5.367 18.634.001 12.017.001zm5.082 7.878l.004.142c.006 5.398-4.363 9.771-9.758 9.771-1.94 0-3.743-.569-5.256-1.547.268.031.541.047.815.047 1.601 0 3.074-.547 4.241-1.464-1.497-.028-2.758-1.018-3.192-2.377.211.04.424.062.644.062.312 0 .614-.042.901-.119-1.564-.314-2.743-1.696-2.743-3.354v-.043c.46.256.986.409 1.544.427-.919-.615-1.524-1.664-1.524-2.855 0-.628.167-1.218.461-1.724 1.687 2.068 4.207 3.427 7.047 3.567-.058-.251-.089-.512-.089-.781 0-1.892 1.536-3.428 3.428-3.428.986 0 1.877.417 2.503 1.085.78-.153 1.515-.438 2.177-.831-.256.8-.799 1.47-1.506 1.894.693-.083 1.354-.266 1.97-.538-.459.688-1.04 1.289-1.709 1.773z"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-300 hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 text-sm">
                  Apollo Fitness Studio<br />
                  Braywick Road<br />
                  Maidenhead SL6 1BN, UK
                </p>
              </div>
              <div>
                <a 
                  href="mailto:apollofitnessstudio@gmail.com"
                  className="text-teal-400 hover:text-teal-300 transition-colors text-sm"
                >
                  apollofitnessstudio@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm mb-4 sm:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Copyright © {currentYear} Apollo Fitness Studio Maidenhead - All Rights Reserved.
            </motion.p>
            
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => handleNavClick("#privacy-policy")}
                className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-gray-600">•</span>
              <p className="text-gray-400 text-sm">
                Built with <span className="text-teal-400">❤️</span> for fitness
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}