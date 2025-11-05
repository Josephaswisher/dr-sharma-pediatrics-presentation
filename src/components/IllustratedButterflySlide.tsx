'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButterflyWingContent {
  title: string;
  content: string;
  icon?: string;
}

interface IllustratedButterflySlideProps {
  leftWing: ButterflyWingContent;
  rightWing: ButterflyWingContent;
  centerTitle: string;
  theme?: 'sunset' | 'spring' | 'ocean' | 'autumn';
  darkMode?: boolean;
}

export default function IllustratedButterflySlide({
  leftWing,
  rightWing,
  centerTitle,
  theme = 'autumn',
  darkMode = false
}: IllustratedButterflySlideProps) {

  // Theme color schemes inspired by your beautiful butterfly image
  const themes = {
    sunset: {
      bg: 'from-orange-400 via-orange-300 to-yellow-200',
      sky: 'from-orange-500/30 via-orange-400/20 to-yellow-300/10',
      ground: 'from-orange-900 via-red-900 to-orange-800',
      wingLeft: 'from-cyan-300 to-cyan-400',
      wingRight: 'from-cyan-300 to-cyan-400',
      wingBorder: 'border-orange-800',
      accent: 'text-orange-600'
    },
    autumn: {
      bg: 'from-amber-400 via-orange-300 to-red-400',
      sky: 'from-amber-500/30 via-orange-400/20 to-red-300/10',
      ground: 'from-amber-900 via-orange-900 to-red-800',
      wingLeft: 'from-teal-200 to-teal-300',
      wingRight: 'from-teal-200 to-teal-300',
      wingBorder: 'border-amber-800',
      accent: 'text-amber-700'
    },
    spring: {
      bg: 'from-green-300 via-emerald-200 to-teal-300',
      sky: 'from-green-400/30 via-emerald-300/20 to-teal-200/10',
      ground: 'from-green-900 via-emerald-900 to-teal-800',
      wingLeft: 'from-pink-200 to-pink-300',
      wingRight: 'from-pink-200 to-pink-300',
      wingBorder: 'border-green-800',
      accent: 'text-green-700'
    },
    ocean: {
      bg: 'from-blue-400 via-cyan-300 to-teal-300',
      sky: 'from-blue-500/30 via-cyan-400/20 to-teal-300/10',
      ground: 'from-blue-900 via-cyan-900 to-teal-800',
      wingLeft: 'from-yellow-200 to-amber-300',
      wingRight: 'from-yellow-200 to-amber-300',
      wingBorder: 'border-blue-800',
      accent: 'text-blue-700'
    }
  };

  const colors = themes[theme];

  return (
    <div className={cn(
      "relative w-full h-screen overflow-hidden",
      "bg-gradient-to-b",
      colors.bg
    )}>
      {/* Animated Sky Gradient */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          colors.sky
        )}
      />

      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{
              top: -20,
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 360
            }}
            animate={{
              top: '110%',
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 720
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {theme === 'autumn' || theme === 'sunset' ? '🍂' : theme === 'spring' ? '🌸' : '🌊'}
          </motion.div>
        ))}
      </div>

      {/* Main Butterfly Structure */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="relative w-full max-w-6xl px-8">

          {/* Center Title Above Butterfly */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className={cn(
              "text-6xl font-bold mb-4",
              colors.accent,
              "drop-shadow-lg"
            )}>
              {centerTitle}
            </h1>
          </motion.div>

          {/* Butterfly Wings Container */}
          <div className="relative">

            {/* Left Wing */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[45%]"
            >
              <svg viewBox="0 0 300 400" className="w-full drop-shadow-2xl">
                {/* Wing shape */}
                <ellipse
                  cx="180"
                  cy="200"
                  rx="140"
                  ry="180"
                  className={cn(
                    "fill-current",
                    `bg-gradient-to-br ${colors.wingLeft}`
                  )}
                  fill="url(#leftWingGradient)"
                  stroke={theme === 'autumn' ? '#78350f' : '#0c4a6e'}
                  strokeWidth="6"
                />
                {/* Wing pattern spots */}
                <circle cx="120" cy="140" r="25" fill="rgba(255,107,53,0.6)" />
                <circle cx="140" cy="200" r="30" fill="rgba(255,107,53,0.7)" />
                <circle cx="160" cy="270" r="20" fill="rgba(255,107,53,0.5)" />
                <circle cx="200" cy="180" r="15" fill="rgba(34,197,94,0.4)" />

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="leftWingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={theme === 'autumn' ? '#99f6e4' : '#fef3c7'} />
                    <stop offset="100%" stopColor={theme === 'autumn' ? '#5eead4' : '#fde047'} />
                  </linearGradient>
                </defs>

                {/* Content Panel on Wing */}
                <foreignObject x="60" y="120" width="200" height="180">
                  <div className="bg-white/90 rounded-2xl p-6 shadow-xl border-4 border-amber-900">
                    <h3 className="font-bold text-2xl mb-3 text-amber-900">
                      {leftWing.icon && <span className="mr-2">{leftWing.icon}</span>}
                      {leftWing.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-800">
                      {leftWing.content}
                    </p>
                  </div>
                </foreignObject>
              </svg>
            </motion.div>

            {/* Right Wing */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.7, type: "spring" }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%]"
            >
              <svg viewBox="0 0 300 400" className="w-full drop-shadow-2xl">
                {/* Wing shape (mirrored) */}
                <ellipse
                  cx="120"
                  cy="200"
                  rx="140"
                  ry="180"
                  fill="url(#rightWingGradient)"
                  stroke={theme === 'autumn' ? '#78350f' : '#0c4a6e'}
                  strokeWidth="6"
                />
                {/* Wing pattern spots */}
                <circle cx="180" cy="140" r="25" fill="rgba(255,107,53,0.6)" />
                <circle cx="160" cy="200" r="30" fill="rgba(255,107,53,0.7)" />
                <circle cx="140" cy="270" r="20" fill="rgba(255,107,53,0.5)" />
                <circle cx="100" cy="180" r="15" fill="rgba(34,197,94,0.4)" />

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="rightWingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={theme === 'autumn' ? '#99f6e4' : '#fef3c7'} />
                    <stop offset="100%" stopColor={theme === 'autumn' ? '#5eead4' : '#fde047'} />
                  </linearGradient>
                </defs>

                {/* Content Panel on Wing */}
                <foreignObject x="40" y="120" width="200" height="180">
                  <div className="bg-white/90 rounded-2xl p-6 shadow-xl border-4 border-amber-900">
                    <h3 className="font-bold text-2xl mb-3 text-amber-900">
                      {rightWing.icon && <span className="mr-2">{rightWing.icon}</span>}
                      {rightWing.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-800">
                      {rightWing.content}
                    </p>
                  </div>
                </foreignObject>
              </svg>
            </motion.div>

            {/* Butterfly Body (Center) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.5 }}
              className="relative z-20 mx-auto w-32 flex flex-col items-center"
            >
              {/* Antennae */}
              <div className="flex gap-12 mb-2">
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-1 h-16 bg-amber-900 rounded-full origin-bottom"
                />
                <motion.div
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-1 h-16 bg-amber-900 rounded-full origin-bottom"
                />
              </div>

              {/* Head */}
              <div className="w-12 h-12 bg-amber-800 rounded-full border-4 border-amber-900 mb-2 shadow-lg" />

              {/* Body segments */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className={cn(
                    "w-16 rounded-full border-4 border-amber-900 shadow-lg mb-1",
                    i === 0 ? "h-14 bg-amber-700" :
                    i === 1 ? "h-12 bg-amber-700" :
                    i === 2 ? "h-10 bg-amber-800" :
                    i === 3 ? "h-8 bg-amber-800" :
                    "h-6 bg-amber-900 rounded-b-full"
                  )}
                />
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Ground/Grass */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b",
          colors.ground
        )}
      >
        {/* Grass blades */}
        <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-around items-end">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 1.1, 1] }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="w-1 bg-green-900 rounded-t-full origin-bottom"
              style={{ height: `${20 + Math.random() * 20}px` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cute Character in Corner (Optional) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-40 right-20 text-8xl"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🧒
        </motion.div>
      </motion.div>
    </div>
  );
}
