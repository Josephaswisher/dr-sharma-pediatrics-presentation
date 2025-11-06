'use client';

import { useState, useEffect } from 'react';
import { slides } from '@/data/slides';
import SlideRenderer from '@/components/SlideRenderer';
import Navigation from '@/components/Navigation';
import ProgressTracker from '@/components/ProgressTracker';
import NotesPanel from '@/components/NotesPanel';
import ButterflyBackground from '@/components/ButterflyBackground';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import { useSupabase } from '@/utils/supabase';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const { trackSlideView } = useSupabase();

  useEffect(() => {
    // Track slide view in Supabase
    trackSlideView(slides[currentSlide].id);

    // Keyboard navigation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(!showNotes);
      } else if (e.key === 'd' || e.key === 'D') {
        setDarkMode(!darkMode);
      } else if (e.key === '?') {
        setShowKeyboardHelp(!showKeyboardHelp);
      } else if (e.key === 'Escape') {
        setShowNotes(false);
        setShowKeyboardHelp(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, showNotes, darkMode, showKeyboardHelp]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <ButterflyBackground />

      <div className="relative z-10">
        {/* Top Navigation Bar */}
        <Navigation
          slides={slides}
          currentSlide={currentSlide}
          onJumpToSlide={jumpToSlide}
          showNotes={showNotes}
          onToggleNotes={() => setShowNotes(!showNotes)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        {/* Main Slide Content */}
        <div className="container mx-auto px-4 py-8">
          <SlideRenderer
            slide={slides[currentSlide]}
            darkMode={darkMode}
          />
        </div>

        {/* Progress Tracker */}
        <ProgressTracker
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onPrevious={prevSlide}
          onNext={nextSlide}
        />

        {/* Speaker Notes Panel */}
        {showNotes && (
          <NotesPanel
            notes={slides[currentSlide].speakerNotes}
            estimatedMinutes={slides[currentSlide].estimatedMinutes}
            onClose={() => setShowNotes(false)}
          />
        )}

        {/* Keyboard Shortcuts Help */}
        <KeyboardShortcuts
          isOpen={showKeyboardHelp}
          onClose={() => setShowKeyboardHelp(false)}
          darkMode={darkMode}
        />

        {/* Help Button - Fixed Bottom Right */}
        <button
          onClick={() => setShowKeyboardHelp(true)}
          className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 ${
            darkMode
              ? 'bg-gradient-to-r from-inova-blue to-inova-teal text-white hover:scale-110'
              : 'bg-gradient-to-r from-inova-blue to-inova-teal text-white hover:scale-110'
          }`}
          title="Keyboard Shortcuts (Press ?)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
