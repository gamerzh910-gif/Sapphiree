import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { musicPlayer } from './AudioPlayer';

interface BalloonItem {
  id: number;
  x: number; // percentage from left
  size: number; // pixel size 50 - 90
  colorIndex: number;
  speed: number; // duration in seconds
  sway: number; // pixels of horizontal sway
}

export const FloatingBalloons: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  // Vivid pastel colors: Pink, Purple, Blue gradients
  const gradients = [
    'from-pink-400 to-rose-500 shadow-pink-500/20',
    'from-violet-400 to-indigo-600 shadow-indigo-500/20',
    'from-sky-400 to-blue-500 shadow-blue-500/20',
    'from-fuchsia-400 to-purple-600 shadow-fuchsia-500/20',
  ];

  useEffect(() => {
    // Generate initial set of balloons
    const initialBalloons: BalloonItem[] = Array.from({ length: 15 }).map((_, idx) => createBalloon(idx));
    setBalloons(initialBalloons);

    // Keep adding balloons over time so they float up endlessly
    const interval = setInterval(() => {
      setBalloons((prev) => {
        // limit active balloons to prevent overwhelming CPU/memory
        if (prev.length >= 30) return prev;
        return [...prev, createBalloon(Date.now())];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const createBalloon = (id: number): BalloonItem => {
    return {
      id,
      x: 10 + Math.random() * 80, // stay safe from edges (10% to 90%)
      size: 50 + Math.random() * 40, // 50px to 90px
      colorIndex: Math.floor(Math.random() * gradients.length),
      speed: 6 + Math.random() * 6, // 6s to 12s to float all the way up (highly energetic)
      sway: 35 + Math.random() * 45, // 35px to 80px sway width
    };
  };

  const handlePop = (id: number) => {
    // Play POP sound
    musicPlayer.playPop();

    // Remove from active list and spawn a replacement immediately after delay
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div id="balloons-layer" className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            id={`balloon-${balloon.id}`}
            className="absolute bottom-0 pointer-events-auto cursor-pointer flex flex-col items-center"
            style={{ left: `${balloon.x}%` }}
            initial={{ y: 150, opacity: 0, scale: 0.8 }}
            animate={{
              y: -window.innerHeight - 300,
              opacity: [0, 1, 1, 0.9, 0],
              x: [0, balloon.sway, -balloon.sway, balloon.sway / 2, 0],
              scale: 1,
            }}
            transition={{
              duration: balloon.speed,
              ease: 'linear',
              x: {
                duration: balloon.speed,
                ease: 'easeInOut',
                repeat: Infinity,
              }
            }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
            onClick={() => handlePop(balloon.id)}
            whileHover={{ scale: 1.1, rotate: [-2, 2, -2], transition: { duration: 0.2 } }}
          >
            {/* Balloon Body */}
            <div
              className={`relative bg-gradient-to-tr ${gradients[balloon.colorIndex]} rounded-t-full rounded-b-[60%] shadow-lg`}
              style={{ width: `${balloon.size}px`, height: `${balloon.size * 1.25}px` }}
            >
              {/* Pulsing Back Glow layer */}
              <motion.div
                aria-hidden="true"
                className="absolute rounded-full filter blur-xl opacity-75 -z-10 mix-blend-screen pointer-events-none"
                style={{
                  inset: '-20%',
                  background: balloon.colorIndex === 0
                    ? 'radial-gradient(circle, rgba(244,63,94,0.85) 0%, rgba(244,63,94,0) 75%)'
                    : balloon.colorIndex === 1
                    ? 'radial-gradient(circle, rgba(79,70,229,0.85) 0%, rgba(79,70,229,0) 75%)'
                    : balloon.colorIndex === 2
                    ? 'radial-gradient(circle, rgba(59,130,246,0.85) 0%, rgba(59,130,246,0) 75%)'
                    : 'radial-gradient(circle, rgba(168,85,247,0.85) 0%, rgba(168,85,247,0) 75%)',
                }}
                animate={{
                  scale: [0.95, 1.4, 0.95],
                  opacity: [0.45, 0.85, 0.45],
                }}
                transition={{
                  duration: 1.4 + (balloon.id % 5) * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Highlight flare for realism */}
              <div className="absolute top-3 left-4 w-3 h-5 bg-white/30 rounded-full rotate-[15deg]"></div>

              {/* Knot */}
              <div
                className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-current rotate-45"
                style={{ color: balloon.colorIndex === 0 ? '#f43f5e' : balloon.colorIndex === 1 ? '#4f46e5' : balloon.colorIndex === 2 ? '#3b82f6' : '#a855f7' }}
              ></div>
            </div>

            {/* String */}
            <svg
              className="w-10 h-24 overflow-visible -mt-1 opacity-60"
              style={{
                color: balloon.colorIndex === 0 ? '#fda4af' : balloon.colorIndex === 1 ? '#a5b4fc' : balloon.colorIndex === 2 ? '#93c5fd' : '#f5d0fe'
              }}
              viewBox="0 0 40 100"
            >
              <path
                d="M 20 0 Q 30 25, 20 50 T 20 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
