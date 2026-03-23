"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/config";

const navigationItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick("#hero")}
            >
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                <svg 
                  className="h-4 w-4 md:h-5 md:w-5 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-3c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm-9 0h6v6H9V9z"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-lg font-bold ${
                  isScrolled 
                    ? "text-gray-900 dark:text-white" 
                    : "text-white"
                }`}>
                  APOLLO
                </h1>
                <p className={`text-xs tracking-wider ${
                  isScrolled 
                    ? "text-teal-600 dark:text-teal-400" 
                    : "text-teal-400"
                }`}>
                  FITNESS STUDIO
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-teal-500 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium text-sm transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick("#contact")}
              >
                {siteConfig.nav.cta.text}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  isScrolled
                    ? "text-gray-900 dark:text-white"
                    : "text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-teal-500 font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                className="w-full mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all duration-300"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick("#contact")}
              >
                {siteConfig.nav.cta.text}
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}