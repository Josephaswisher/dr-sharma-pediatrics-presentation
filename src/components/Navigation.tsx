'use client';

import { Slide } from '@/data/slides';

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
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Section Navigation */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat, idx) => {
            const firstSlideOfCategory = slides.findIndex(s => s.category === cat);
            return (
              <button
                key={cat}
                onClick={() => onJumpToSlide(firstSlideOfCategory)}
                className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-inova-blue hover:text-white transition-colors"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Utility Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onToggleNotes}
            className={`px-4 py-2 rounded-md border transition-colors ${
              showNotes
                ? 'bg-inova-blue text-white border-inova-blue'
                : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            📝 Notes
          </button>
          <button
            onClick={onToggleDarkMode}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? '☀️' : '🌙'} Theme
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            🖨️ Print
          </button>
        </div>
      </div>
    </div>
  );
}
