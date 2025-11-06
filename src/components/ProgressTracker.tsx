'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { pulse, hoverScale } from '@/utils/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgressTrackerProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ProgressTracker({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
}: ProgressTrackerProps) {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 px-6 py-4 no-print z-40">
      <div className="max-w-5xl mx-auto glass-dark rounded-full px-8 py-4 shadow-xl">
        <div className="flex items-center gap-6">
          {/* Previous Button - Floating Circle */}
          <motion.button
            onClick={onPrevious}
            disabled={currentSlide === 0}
            variants={hoverScale}
            whileHover={currentSlide !== 0 ? "hover" : undefined}
            whileTap={currentSlide !== 0 ? "tap" : undefined}
            className="w-12 h-12 rounded-full glass flex items-center justify-center glow disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          {/* Progress Bar Container */}
          <div className="flex-1 flex items-center gap-4">
            {/* Glassmorphic Elevated Progress Bar */}
            <div className="relative flex-1 h-3 glass-dark rounded-full overflow-hidden shadow-md border border-white/10">
              {/* Animated Progress Fill with Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-inova-blue via-inova-teal to-inova-butterfly-wing rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>

              {/* Current Slide Indicator - Pulsing Dot */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg border-2 border-inova-teal"
                variants={pulse}
                animate="animate"
                style={{
                  left: `calc(${progress}% - 10px)`,
                  boxShadow: "0 0 15px rgba(20, 184, 166, 0.8)"
                }}
              />
            </div>

            {/* Slide Counter with AnimatePresence */}
            <div className="min-w-[100px] text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-sm font-semibold text-white/90"
                >
                  Slide <span className="text-inova-teal">{currentSlide + 1}</span>
                  <span className="text-white/50"> / </span>
                  <span className="text-white/70">{totalSlides}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Next Button - Floating Circle */}
          <motion.button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            variants={hoverScale}
            whileHover={currentSlide !== totalSlides - 1 ? "hover" : undefined}
            whileTap={currentSlide !== totalSlides - 1 ? "tap" : undefined}
            className="w-12 h-12 rounded-full glass flex items-center justify-center glow disabled:opacity-30 disabled:cursor-not-allowed border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
