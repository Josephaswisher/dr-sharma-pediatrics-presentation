'use client';

import { useState, useEffect } from 'react';
import { slides } from '@/data/slides';
import SlideRenderer from '@/components/SlideRenderer';
import Navigation from '@/components/Navigation';
import ProgressTracker from '@/components/ProgressTracker';
import NotesPanel from '@/components/NotesPanel';
import ButterflyBackground from '@/components/ButterflyBackground';
import { useSupabase } from '@/utils/supabase';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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
      } else if (e.key === 'n') {
        setShowNotes(!showNotes);
      } else if (e.key === 'd') {
        setDarkMode(!darkMode);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, showNotes, darkMode]);

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
      </div>
    </div>
  );
}
