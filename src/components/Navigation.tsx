'use client';

import { motion } from 'framer-motion';
import { Slide } from '@/data/slides';
import { fadeInDown, hoverScale, float } from '@/utils/animations';

interface NavigationProps {
  slides: Slide[];
  currentSlide: number;
  onJumpToSlide: (index: number) => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navigation({
  slides,
  currentSlide,
  onJumpToSlide,
  showNotes,
  onToggleNotes,
  darkMode,
  onToggleDarkMode,
}: NavigationProps) {
  const categories = Array.from(new Set(slides.map(s => s.category)));

  return (
    <motion.nav
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <motion.div
        variants={float}
        animate="animate"
        className="glass-gradient dark:glass-gradient-dark float-shadow-lg rounded-full px-8 py-4"
      >
        <div className="flex justify-between items-center gap-4">
          {/* Section Navigation */}
          <motion.div
            className="flex gap-3 flex-wrap"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {categories.map((cat, idx) => {
              const firstSlideOfCategory = slides.findIndex(s => s.category === cat);
              const isActiveCategory = slides[currentSlide]?.category === cat;

              return (
                <motion.button
                  key={cat}
                  variants={hoverScale}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => onJumpToSlide(firstSlideOfCategory)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActiveCategory
                      ? 'bg-gradient-to-r from-inova-blue to-inova-teal text-white glow-teal shadow-lg'
                      : 'glass dark:glass-dark hover:glass-light dark:hover:glass-strong text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Utility Buttons */}
          <motion.div
            className="flex gap-3"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.4
                }
              }
            }}
          >
            <motion.button
              variants={hoverScale}
              whileHover="hover"
              whileTap="tap"
              onClick={onToggleNotes}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                showNotes
                  ? 'bg-gradient-to-r from-inova-blue to-inova-teal text-white glow shadow-lg'
                  : 'glass dark:glass-dark hover:glass-light dark:hover:glass-strong text-gray-700 dark:text-gray-200'
              }`}
            >
              📝 Notes
            </motion.button>

            <motion.button
              variants={hoverScale}
              whileHover="hover"
              whileTap="tap"
              onClick={onToggleDarkMode}
              className="w-10 h-10 rounded-full glass dark:glass-dark hover:glass-light dark:hover:glass-strong flex items-center justify-center text-lg transition-all duration-300"
            >
              <motion.span
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {darkMode ? '☀️' : '🌙'}
              </motion.span>
            </motion.button>

            <motion.button
              variants={hoverScale}
              whileHover="hover"
              whileTap="tap"
              onClick={() => window.print()}
              className="w-10 h-10 rounded-full glass dark:glass-dark hover:glass-light dark:hover:glass-strong flex items-center justify-center text-lg transition-all duration-300"
            >
              🖨️
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
