'use client';

import { Slide } from '@/data/slides';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ButterflyPatterns } from './ButterflyPatterns';
import IllustratedButterflySlide from './IllustratedButterflySlide';

interface SlideRendererProps {
  slide: Slide;
  darkMode: boolean;
}

// Helper to determine butterfly pattern based on slide type
function getButterflyPattern(slide: Slide): string {
  if (slide.id === 1 || slide.id === 18) return 'title';
  if (slide.content.type === 'clinical-case') return 'quiz';
  if (slide.content.type === 'algorithm') return 'clinical';
  if (slide.content.type === 'two-column') return 'content';
  if (slide.content.type === 'key-points') return 'summary';
  return 'content';
}

export default function SlideRenderer({ slide, darkMode }: SlideRendererProps) {
  const butterflyPattern = getButterflyPattern(slide);

  return (
    <>
      {/* Include SVG butterfly patterns */}
      <ButterflyPatterns />

      <motion.div
        key={slide.id}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className={cn(
          "relative overflow-hidden rounded-3xl min-h-[600px] max-w-6xl mx-auto",
          "backdrop-blur-xl border shadow-2xl",
          darkMode
            ? "bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border-white/10"
            : "bg-gradient-to-br from-white/90 via-white/80 to-white/90 border-gray-200/50"
        )}
        style={{
          backgroundImage: darkMode
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='p' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'%3E%3Cpath d='M50 100Q30 80 30 50Q30 20 50 10Q70 20 70 50Q70 80 50 100Z' fill='%230066CC' opacity='0.03'/%3E%3Cpath d='M150 100Q130 80 130 50Q130 20 150 10Q170 20 170 50Q170 80 150 100Z' fill='%238B4789' opacity='0.03'/%3E%3Cellipse cx='100' cy='60' rx='3' ry='30' fill='%2300A0B0' opacity='0.04'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E"), linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 50%, rgba(17, 24, 39, 0.9) 100%)`
            : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='p' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'%3E%3Cpath d='M50 100Q30 80 30 50Q30 20 50 10Q70 20 70 50Q70 80 50 100Z' fill='%230066CC' opacity='0.05'/%3E%3Cpath d='M150 100Q130 80 130 50Q130 20 150 10Q170 20 170 50Q170 80 150 100Z' fill='%238B4789' opacity='0.05'/%3E%3Cellipse cx='100' cy='60' rx='3' ry='30' fill='%2300A0B0' opacity='0.06'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E"), linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)`,
          backgroundSize: 'auto, cover',
          backgroundPosition: 'center, center',
        }}
      >
        {/* Glassmorphism Gradient Orbs with Float Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-inova-blue/20 to-inova-teal/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-inova-butterfly-wing/20 to-inova-orange/20 rounded-full blur-3xl"
          />
        </div>

      {/* Animated Butterfly Corner with Float */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 0.15,
          scale: 1,
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          opacity: { delay: 0.3, duration: 0.8, ease: "backOut" },
          scale: { delay: 0.3, duration: 0.8, ease: "backOut" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-8 right-8 text-7xl"
      >
        🦋
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 p-12">
        {/* Slide Header with Gradient Underline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <h1 className={cn(
            "text-5xl font-bold mb-3",
            "bg-gradient-to-r from-inova-blue via-inova-teal to-inova-butterfly-wing",
            "bg-clip-text text-transparent"
          )}>
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className={cn(
              "text-2xl",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              {slide.subtitle}
            </p>
          )}
          {/* Animated Gradient Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-inova-blue via-inova-teal to-transparent rounded-full mt-4"
          />
        </motion.div>

        {/* Slide Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6 pb-20"
        >
          {renderContent(slide.content, darkMode)}
        </motion.div>
      </div>

      {/* Glassmorphic Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className={cn(
          "absolute bottom-0 left-0 right-0",
          "backdrop-blur-md border-t",
          darkMode ? "bg-gray-900/50 border-white/10" : "bg-white/50 border-gray-200/50"
        )}
      >
        <div className="px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦋</span>
            <span className={cn(
              "text-sm font-medium",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Inova Children's Hospital
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className={cn(
              "px-3 py-1 rounded-full",
              darkMode ? "bg-inova-blue/20 text-inova-blue" : "bg-inova-blue/10 text-inova-blue"
            )}>
              Slide {slide.id}/18
            </span>
            <span className={cn(
              "px-3 py-1 rounded-full",
              darkMode ? "bg-inova-teal/20 text-inova-teal" : "bg-inova-teal/10 text-inova-teal"
            )}>
              ~{slide.estimatedMinutes} min
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
}

function renderContent(content: any, darkMode: boolean) {
  switch (content.type) {
    case 'title':
      return (
        <div className="text-center py-20 space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="text-9xl"
          >
            🦋
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold bg-gradient-to-r from-inova-blue to-inova-teal bg-clip-text text-transparent"
          >
            {content.mainTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-semibold text-inova-orange"
          >
            {content.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <p className={cn("text-2xl font-medium", darkMode ? "text-gray-300" : "text-gray-700")}>
              {content.author}
            </p>
            <p className={cn("text-xl", darkMode ? "text-gray-400" : "text-gray-600")}>
              {content.institution}
            </p>
          </motion.div>
        </div>
      );

    case 'table':
      return (
        <div className="space-y-4">
          <div className={cn(
            "overflow-hidden rounded-2xl shadow-xl border",
            darkMode ? "border-white/10" : "border-gray-200"
          )}>
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-inova-blue to-inova-teal text-white">
                  {content.headers.map((header: string, idx: number) => (
                    <th key={idx} className="p-4 text-left font-semibold text-lg">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row: string[], rowIdx: number) => (
                  <motion.tr
                    key={rowIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIdx * 0.1 }}
                    className={cn(
                      "transition-colors",
                      darkMode
                        ? rowIdx % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"
                        : rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white",
                      "hover:bg-inova-blue/5"
                    )}
                  >
                    {row.map((cell: string, cellIdx: number) => (
                      <td key={cellIdx} className="p-4 border-b border-gray-200/20">
                        <span dangerouslySetInnerHTML={{
                          __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="text-inova-blue font-bold">$1</strong>')
                        }} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {content.notes && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-4 rounded-xl border-l-4 border-yellow-400",
                darkMode ? "bg-yellow-900/20" : "bg-yellow-50"
              )}
            >
              <p className="text-sm font-medium">{content.notes}</p>
            </motion.div>
          )}
        </div>
      );

    case 'algorithm':
      return (
        <div className="space-y-5">
          <h3 className="text-3xl font-bold text-inova-teal mb-6">{content.title}</h3>
          {content.steps.map((step: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={cn(
                "p-6 rounded-2xl border-l-4 border-inova-blue shadow-lg",
                "backdrop-blur-sm transition-all hover:scale-[1.02]",
                darkMode ? "bg-gray-800/50" : "bg-gray-50"
              )}
            >
              <p className="font-bold text-xl mb-3 text-inova-blue">{step.condition}</p>
              <p className="text-inova-orange font-semibold mb-3">→ {step.action}</p>
              {step.branches && (
                <div className="ml-6 mt-3 space-y-2">
                  {step.branches.map((branch: any, bIdx: number) => (
                    <div
                      key={bIdx}
                      className={cn(
                        "p-3 rounded-lg text-sm",
                        darkMode ? "bg-gray-700/50" : "bg-white"
                      )}
                    >
                      <span className="font-bold text-inova-teal">{branch.label}:</span> {branch.outcome}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          {content.pearl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: content.steps.length * 0.15 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-xl"
            >
              <p className="font-bold text-lg mb-2 flex items-center gap-2">
                <span>💎</span> Clinical Pearl
              </p>
              <p className="leading-relaxed">{content.pearl}</p>
            </motion.div>
          )}
        </div>
      );

    case 'clinical-case':
      return (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-6 rounded-2xl border-l-4 border-yellow-500 shadow-lg",
              darkMode ? "bg-yellow-900/20" : "bg-yellow-50"
            )}
          >
            <p className="text-lg leading-relaxed">{content.scenario}</p>
          </motion.div>
          {content.questions.map((q: any, idx: number) => (
            <QuizQuestion key={idx} question={q} darkMode={darkMode} />
          ))}
        </div>
      );

    case 'two-column':
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "p-6 rounded-2xl shadow-lg",
              content.left.highlight
                ? darkMode
                  ? "bg-gradient-to-br from-red-900/30 to-red-800/30 border-2 border-red-500/50"
                  : "bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200"
                : darkMode ? "bg-gray-800/50" : "bg-gray-50"
            )}
          >
            {content.left.title && (
              <h3 className="text-2xl font-bold text-inova-blue mb-4">{content.left.title}</h3>
            )}
            <ul className="space-y-3">
              {content.left.items.map((item: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-inova-blue mt-1">•</span>
                  <span dangerouslySetInnerHTML={{
                    __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-inova-blue">$1</strong>')
                  }} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "p-6 rounded-2xl shadow-lg",
              content.right.highlight
                ? darkMode
                  ? "bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-2 border-blue-500/50"
                  : "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200"
                : darkMode ? "bg-gray-800/50" : "bg-gray-50"
            )}
          >
            {content.right.title && (
              <h3 className="text-2xl font-bold text-inova-teal mb-4">{content.right.title}</h3>
            )}
            <ul className="space-y-3">
              {content.right.items.map((item: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-inova-teal mt-1">•</span>
                  <span dangerouslySetInnerHTML={{
                    __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-inova-teal">$1</strong>')
                  }} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      );

    case 'key-points':
      return (
        <div className="space-y-4">
          {content.points.map((point: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-6 rounded-2xl border-l-4 shadow-lg transition-all hover:scale-[1.02]",
                "backdrop-blur-sm",
                point.alert === 'red'
                  ? darkMode
                    ? "bg-red-900/20 border-red-500"
                    : "bg-red-50 border-red-500"
                  : point.alert === 'yellow'
                  ? darkMode
                    ? "bg-yellow-900/20 border-yellow-500"
                    : "bg-yellow-50 border-yellow-500"
                  : point.alert === 'green'
                  ? darkMode
                    ? "bg-green-900/20 border-green-500"
                    : "bg-green-50 border-green-500"
                  : darkMode
                    ? "bg-gray-800/50 border-inova-blue"
                    : "bg-gray-50 border-inova-blue"
              )}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{point.icon}</span>
                <div>
                  <h4 className="font-bold text-xl mb-2">{point.title}</h4>
                  <p className="leading-relaxed">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );

    case 'illustrated-butterfly':
      return (
        <IllustratedButterflySlide
          centerTitle={content.centerTitle}
          theme={content.theme}
          leftWing={content.leftWing}
          rightWing={content.rightWing}
          darkMode={darkMode}
        />
      );

    default:
      return <p>Unknown content type</p>;
  }
}

function QuizQuestion({ question, darkMode }: { question: any; darkMode: boolean }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="space-y-4">
      <p className="font-bold text-2xl">{question.question}</p>
      <div className="space-y-3">
        {question.options.map((opt: any) => (
          <motion.button
            key={opt.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedOption(opt.label);
              setShowExplanation(true);
            }}
            className={cn(
              "w-full text-left p-5 rounded-2xl border-2 transition-all shadow-lg",
              selectedOption === opt.label
                ? opt.correct
                  ? "border-green-500 bg-gradient-to-r from-green-500/20 to-green-400/20 scale-[1.02]"
                  : "border-red-500 bg-gradient-to-r from-red-500/20 to-red-400/20"
                : darkMode
                  ? "border-gray-700 bg-gray-800/50 hover:border-inova-blue hover:bg-inova-blue/10"
                  : "border-gray-300 bg-white hover:border-inova-blue hover:bg-inova-blue/5"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold",
                selectedOption === opt.label
                  ? opt.correct
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : darkMode ? "bg-gray-700" : "bg-gray-200"
              )}>
                {opt.label}
              </span>
              <span>{opt.text}</span>
              {selectedOption === opt.label && opt.correct && (
                <span className="ml-auto text-green-500 text-xl">✓</span>
              )}
              {selectedOption === opt.label && !opt.correct && (
                <span className="ml-auto text-red-500 text-xl">✗</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "p-5 rounded-2xl shadow-lg",
              darkMode ? "bg-gray-800" : "bg-gray-100"
            )}
          >
            <p className="font-semibold mb-2 text-inova-blue">💡 Explanation:</p>
            <p className="leading-relaxed">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
