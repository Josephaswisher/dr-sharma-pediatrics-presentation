'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function KeyboardShortcuts({ isOpen, onClose, darkMode }: KeyboardShortcutsProps) {
  const shortcuts = [
    { key: '→ / Space', description: 'Next slide' },
    { key: '←', description: 'Previous slide' },
    { key: 'N', description: 'Toggle speaker notes' },
    { key: 'D', description: 'Toggle dark mode' },
    { key: '?', description: 'Show/hide this help' },
    { key: 'Esc', description: 'Close panels' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-full max-w-md rounded-2xl shadow-2xl z-50",
              "border-2",
              darkMode
                ? "bg-gray-900 border-inova-blue/50"
                : "bg-white border-inova-blue/30"
            )}
          >
            {/* Header */}
            <div className={cn(
              "px-6 py-4 border-b",
              darkMode ? "border-gray-700" : "border-gray-200"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⌨️</span>
                  <h2 className={cn(
                    "text-2xl font-bold",
                    "bg-gradient-to-r from-inova-blue to-inova-teal bg-clip-text text-transparent"
                  )}>
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    darkMode
                      ? "hover:bg-gray-800 text-gray-400"
                      : "hover:bg-gray-100 text-gray-600"
                  )}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-3">
              {shortcuts.map((shortcut, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-all",
                    darkMode
                      ? "bg-gray-800/50 hover:bg-gray-800"
                      : "bg-gray-50 hover:bg-gray-100"
                  )}
                >
                  <span className={cn(
                    "text-sm",
                    darkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    {shortcut.description}
                  </span>
                  <kbd className={cn(
                    "px-3 py-1 rounded font-mono text-sm font-semibold shadow-sm",
                    "border-2",
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-800"
                  )}>
                    {shortcut.key}
                  </kbd>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className={cn(
              "px-6 py-4 border-t",
              darkMode ? "border-gray-700" : "border-gray-200"
            )}>
              <p className={cn(
                "text-xs text-center",
                darkMode ? "text-gray-500" : "text-gray-400"
              )}>
                Press <kbd className="px-1 py-0.5 rounded bg-gray-700 text-white text-xs">?</kbd> anytime to toggle this help
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
