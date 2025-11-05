'use client';

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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 no-print z-40">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-inova-blue via-inova-teal to-inova-butterfly-wing transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            disabled={currentSlide === 0}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            Slide {currentSlide + 1} of {totalSlides}
          </span>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="px-6 py-2 bg-inova-blue text-white rounded-lg hover:bg-inova-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
