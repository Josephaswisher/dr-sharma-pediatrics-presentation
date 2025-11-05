/**
 * Butterfly Geometric Patterns
 * Beautiful SVG patterns for medical education presentation backgrounds
 * Inova Hospital themed with butterfly geometric motifs
 */

import React from 'react';

export const ButterflyPatterns = () => {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* Pattern 1: Symmetrical Butterfly Wings - For Title Slides */}
        <pattern
          id="butterfly-wings-title"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          {/* Left wing */}
          <path
            d="M 50 100 Q 30 80, 30 50 Q 30 20, 50 10 Q 70 20, 70 50 Q 70 80, 50 100 Z"
            fill="#0066CC"
            opacity="0.08"
          />
          {/* Right wing (mirrored) */}
          <path
            d="M 150 100 Q 130 80, 130 50 Q 130 20, 150 10 Q 170 20, 170 50 Q 170 80, 150 100 Z"
            fill="#8B4789"
            opacity="0.08"
          />
          {/* Center body */}
          <ellipse cx="100" cy="60" rx="3" ry="30" fill="#00A0B0" opacity="0.1" />
          {/* Geometric accent dots */}
          <circle cx="45" cy="45" r="2" fill="#FF6B35" opacity="0.15" />
          <circle cx="155" cy="45" r="2" fill="#FF6B35" opacity="0.15" />
        </pattern>

        {/* Pattern 2: Abstract Geometric Butterflies - For Content Slides */}
        <pattern
          id="butterfly-geometric-content"
          x="0"
          y="0"
          width="150"
          height="150"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond wing left */}
          <polygon
            points="40,75 25,50 40,25 55,50"
            fill="#00A0B0"
            opacity="0.06"
          />
          {/* Diamond wing right */}
          <polygon
            points="110,75 95,50 110,25 125,50"
            fill="#0066CC"
            opacity="0.06"
          />
          {/* Connecting line */}
          <line x1="55" y1="50" x2="95" y2="50" stroke="#8B4789" strokeWidth="1" opacity="0.1" />
          {/* Small accent triangles */}
          <polygon points="40,90 35,80 45,80" fill="#FF6B35" opacity="0.08" />
          <polygon points="110,90 105,80 115,80" fill="#FF6B35" opacity="0.08" />
        </pattern>

        {/* Pattern 3: Delicate Wing Traces - For Quiz Slides */}
        <pattern
          id="butterfly-delicate-quiz"
          x="0"
          y="0"
          width="180"
          height="180"
          patternUnits="userSpaceOnUse"
        >
          {/* Curved wing paths */}
          <path
            d="M 90 90 Q 60 70, 50 40 T 45 10"
            stroke="#0066CC"
            strokeWidth="1.5"
            fill="none"
            opacity="0.1"
          />
          <path
            d="M 90 90 Q 120 70, 130 40 T 135 10"
            stroke="#8B4789"
            strokeWidth="1.5"
            fill="none"
            opacity="0.1"
          />
          {/* Lower wings */}
          <path
            d="M 90 90 Q 65 110, 55 130"
            stroke="#00A0B0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.08"
          />
          <path
            d="M 90 90 Q 115 110, 125 130"
            stroke="#FF6B35"
            strokeWidth="1.5"
            fill="none"
            opacity="0.08"
          />
          {/* Antennae */}
          <line x1="88" y1="90" x2="85" y2="75" stroke="#8B4789" strokeWidth="0.5" opacity="0.12" />
          <line x1="92" y1="90" x2="95" y2="75" stroke="#8B4789" strokeWidth="0.5" opacity="0.12" />
          <circle cx="85" cy="73" r="1.5" fill="#0066CC" opacity="0.15" />
          <circle cx="95" cy="73" r="1.5" fill="#0066CC" opacity="0.15" />
        </pattern>

        {/* Pattern 4: Tessellated Butterfly Grid - For Clinical Content */}
        <pattern
          id="butterfly-tessellation"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* Tessellated wing shapes */}
          <path
            d="M 30 60 L 10 30 L 30 0 L 50 30 Z"
            fill="#0066CC"
            opacity="0.05"
          />
          <path
            d="M 90 60 L 70 30 L 90 0 L 110 30 Z"
            fill="#00A0B0"
            opacity="0.05"
          />
          {/* Connecting hexagons */}
          <polygon
            points="60,20 65,30 60,40 55,30"
            fill="#8B4789"
            opacity="0.06"
          />
        </pattern>

        {/* Pattern 5: Modern Gradient Butterflies - For Summary Slides */}
        <pattern
          id="butterfly-gradient-summary"
          x="0"
          y="0"
          width="160"
          height="160"
          patternUnits="userSpaceOnUse"
        >
          <defs>
            <linearGradient id="wing-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00A0B0" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="wing-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B4789" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Gradient butterfly */}
          <ellipse
            cx="50"
            cy="80"
            rx="25"
            ry="40"
            fill="url(#wing-gradient-1)"
            transform="rotate(-20 50 80)"
          />
          <ellipse
            cx="110"
            cy="80"
            rx="25"
            ry="40"
            fill="url(#wing-gradient-2)"
            transform="rotate(20 110 80)"
          />
          {/* Body */}
          <rect x="78" y="60" width="4" height="40" rx="2" fill="#00A0B0" opacity="0.15" />
        </pattern>

        {/* Pattern 6: Minimalist Wing Dots - For Dark Mode */}
        <pattern
          id="butterfly-dots-dark"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Wing shape suggested by dots */}
          <circle cx="30" cy="40" r="3" fill="#0066CC" opacity="0.15" />
          <circle cx="35" cy="50" r="2.5" fill="#0066CC" opacity="0.12" />
          <circle cx="25" cy="50" r="2.5" fill="#00A0B0" opacity="0.12" />
          <circle cx="30" cy="60" r="2" fill="#8B4789" opacity="0.1" />

          <circle cx="70" cy="40" r="3" fill="#8B4789" opacity="0.15" />
          <circle cx="65" cy="50" r="2.5" fill="#8B4789" opacity="0.12" />
          <circle cx="75" cy="50" r="2.5" fill="#FF6B35" opacity="0.12" />
          <circle cx="70" cy="60" r="2" fill="#0066CC" opacity="0.1" />

          {/* Center line */}
          <line x1="50" y1="35" x2="50" y2="65" stroke="#00A0B0" strokeWidth="0.5" opacity="0.08" />
        </pattern>

        {/* Pattern 7: Abstract Butterfly Kaleidoscope - For Interactive Slides */}
        <pattern
          id="butterfly-kaleidoscope"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          {/* Radial butterfly segments */}
          <g transform="translate(100, 100)">
            <path
              d="M 0 0 L 30 -50 L 40 -40 L 20 0 Z"
              fill="#0066CC"
              opacity="0.08"
            />
            <path
              d="M 0 0 L 50 -30 L 40 -40 L 0 -20 Z"
              fill="#00A0B0"
              opacity="0.08"
            />
            <path
              d="M 0 0 L 30 50 L 40 40 L 20 0 Z"
              fill="#8B4789"
              opacity="0.08"
            />
            <path
              d="M 0 0 L 50 30 L 40 40 L 0 20 Z"
              fill="#FF6B35"
              opacity="0.08"
            />
            <path
              d="M 0 0 L -30 -50 L -40 -40 L -20 0 Z"
              fill="#00A0B0"
              opacity="0.08"
            />
            <path
              d="M 0 0 L -50 -30 L -40 -40 L 0 -20 Z"
              fill="#8B4789"
              opacity="0.08"
            />
            <path
              d="M 0 0 L -30 50 L -40 40 L -20 0 Z"
              fill="#0066CC"
              opacity="0.08"
            />
            <path
              d="M 0 0 L -50 30 L -40 40 L 0 20 Z"
              fill="#FF6B35"
              opacity="0.08"
            />
            {/* Center circle */}
            <circle cx="0" cy="0" r="5" fill="#8B4789" opacity="0.15" />
          </g>
        </pattern>
      </defs>
    </svg>
  );
};

// Helper component to apply pattern backgrounds
interface ButterflyBackgroundProps {
  pattern: 'title' | 'content' | 'quiz' | 'clinical' | 'summary' | 'dark' | 'kaleidoscope';
  className?: string;
  children?: React.ReactNode;
}

export const ButterflyBackground: React.FC<ButterflyBackgroundProps> = ({
  pattern,
  className = '',
  children
}) => {
  const patternMap = {
    title: 'butterfly-wings-title',
    content: 'butterfly-geometric-content',
    quiz: 'butterfly-delicate-quiz',
    clinical: 'butterfly-tessellation',
    summary: 'butterfly-gradient-summary',
    dark: 'butterfly-dots-dark',
    kaleidoscope: 'butterfly-kaleidoscope',
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='url(%23${patternMap[pattern]})'/%3E%3C/svg%3E")`,
      }}
    >
      {children}
    </div>
  );
};
