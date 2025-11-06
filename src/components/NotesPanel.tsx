'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { slideInRight, hoverScale } from '@/utils/animations';

interface NotesPanelProps {
  notes: string;
  estimatedMinutes: number;
  onClose: () => void;
  isOpen: boolean;
}

export default function NotesPanel({ notes, estimatedMinutes, onClose, isOpen }: NotesPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 no-print"
            onClick={onClose}
          />

          {/* Glassmorphic sliding panel */}
          <motion.div
            variants={slideInRight}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] glass-strong border-l border-white/20 rounded-l-3xl float-shadow-lg z-50 no-print"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Close button - floating with rotation */}
            <motion.button
              variants={hoverScale}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-2xl font-light transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)',
              }}
              aria-label="Close notes panel"
            >
              ×
            </motion.button>

            {/* Content container with smooth scroll */}
            <div className="h-full overflow-y-auto smooth-scroll p-8 pt-20">
              {/* Header */}
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white"
              >
                <span className="text-3xl">📝</span>
                <span>Speaker Notes</span>
              </motion.h3>

              {/* Gradient divider */}
              <div
                className="h-px mb-6"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)',
                }}
              />

              {/* Time badge with pulse animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                <span>⏱️</span>
                <span className="text-gray-700 dark:text-gray-200">
                  Estimated time: <strong>{estimatedMinutes} minutes</strong>
                </span>
              </motion.div>

              {/* Notes content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mb-8"
              >
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {notes}
                </p>
              </motion.div>

              {/* Gradient divider */}
              <div
                className="h-px mb-6"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)',
                }}
              />

              {/* Teaching tip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="p-4 rounded-2xl"
                style={{
                  background: 'rgba(251, 191, 36, 0.1)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                }}
              >
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  <span className="text-xl mr-2">💡</span>
                  <strong className="font-semibold">Teaching Tip:</strong> Pause frequently for questions. Encourage students to share their clinical experiences.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
