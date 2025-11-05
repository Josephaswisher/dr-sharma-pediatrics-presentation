'use client';

export default function ButterflyBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
      {/* Animated butterflies */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
            animationDelay: `${i * 0.5}s`,
            fontSize: `${40 + i * 10}px`,
          }}
        >
          🦋
        </div>
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
    </div>
  );
}
