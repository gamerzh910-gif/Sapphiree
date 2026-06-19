import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { musicPlayer } from './AudioPlayer';

interface HeartItem {
  id: number;
  x: number; // percentage from left
  size: number; // pixel size 15 - 30
  delay: number; // start delay
  speed: number; // duration in seconds
  sway: number; // swaying pixels
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    // Generate initial set of hearts
    const initialHearts = Array.from({ length: 18 }).map((_, idx) => createHeart(idx));
    setHearts(initialHearts);

    // Frequently add new hearts
    const interval = setInterval(() => {
      setHearts((prev) => {
        if (prev.length >= 40) return prev;
        return [...prev, createHeart(Date.now())];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const createHeart = (id: number): HeartItem => {
    return {
      id,
      x: 5 + Math.random() * 90, // scattered across screen
      size: 14 + Math.random() * 16, // 14px to 30px
      delay: Math.random() * 1.5,
      speed: 4 + Math.random() * 5, // 4s to 9s (highly energetic)
      sway: 15 + Math.random() * 25,
    };
  };

  const handlePop = (id: number) => {
    musicPlayer.playPop();
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div id="hearts-layer" className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            id={`heart-${heart.id}`}
            className="absolute bottom-[-50px] pointer-events-auto cursor-pointer flex flex-col items-center"
            style={{ left: `${heart.x}%` }}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: -window.innerHeight - 150,
              opacity: [0, 0.8, 1, 0.5, 0],
              x: [0, heart.sway, -heart.sway, 0],
              scale: 1,
            }}
            transition={{
              duration: heart.speed,
              delay: heart.delay,
              ease: 'linear',
              x: {
                duration: heart.speed / 2,
                ease: 'easeInOut',
                repeat: Infinity,
              }
            }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
            onClick={() => handlePop(heart.id)}
            whileHover={{ scale: 1.3, transition: { duration: 0.1 } }}
          >
            {/* Dynamic pulsing bloom glow behind heart */}
            <motion.div
              aria-hidden="true"
              className="absolute rounded-full filter blur-[12px] opacity-80 -z-10 pointer-events-none"
              style={{
                width: `${heart.size * 1.8}px`,
                height: `${heart.size * 1.8}px`,
                background: heart.id % 2 === 0
                  ? 'radial-gradient(circle, rgba(244,63,94,0.9) 0%, rgba(244,63,94,0) 75%)'
                  : 'radial-gradient(circle, rgba(236,72,153,0.9) 0%, rgba(236,72,153,0) 75%)',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [0.9, 1.5, 0.9],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 1.2 + (heart.id % 4) * 0.25,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Elegant SVG Heart with glowing filter drop shadow */}
            <svg
              className="drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]"
              style={{
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                fill: heart.id % 2 === 0 ? '#f43f5e' : '#ec4899', // rose-500 or pink-500
                color: heart.id % 3 === 0 ? '#fda4af' : '#f472b6'
              }}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
