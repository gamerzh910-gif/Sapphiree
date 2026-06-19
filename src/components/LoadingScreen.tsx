import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress increment to mimic the real loading screen
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 900); // Closes when complete
          return 100;
        }
        const remains = 100 - prev;
        const increment = Math.max(1, Math.floor(Math.random() * 8) + 2);
        return Math.min(100, prev + Math.min(increment, remains));
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      id="loading-screen"
      style={{
        background: '#07040f',
      }}
      className="fixed inset-0 flex flex-col items-center justify-center p-6 z-[999] font-sans selection:bg-pink-500/30 overflow-hidden"
    >
      {/* Decorative ambient background flares */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-pink-500/10 rounded-full filter blur-[100px] animate-pulse" />
      <div className="absolute bottom-[20%] right-[15%] w-72 h-72 bg-fuchsia-500/10 rounded-full filter blur-[100px] animate-pulse" />
 
      {/* Main loading layout */}
      <div className="flex flex-col items-center max-w-lg w-full text-center">
        {/* Magic Glittering Sparkle Icon at Top (Matches image 8 perfectly) */}
        <motion.div
          className="mb-8 relative"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Outer glow flare */}
          <div className="absolute inset-0 bg-pink-500/25 blur-xl rounded-full" />
          <div className="relative w-16 h-16 rounded-full bg-zinc-950/45 border border-white/10 flex items-center justify-center shadow-md">
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
        </motion.div>
 
        {/* Dynamic Title (bold, playful purple as in image 8) */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Preparing a special surprise
        </h2>
        
        {/* Recipient italic sub-title in cursive/beautiful font */}
        <p className="text-xl sm:text-2xl font-cursive font-bold text-pink-400 mt-2 tracking-wide">
          for Ishu... ✨
        </p>
 
        {/* Sleek rounded Loading Bar (exactly like image 8) */}
        <div className="w-64 sm:w-80 h-3 bg-zinc-950/60 rounded-full overflow-hidden mt-10 border border-white/10 shadow-sm relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.3)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>
 
        {/* Loading percentage marker */}
        <motion.span
          className="text-sm font-bold text-pink-400 tracking-widest mt-4 font-mono select-none"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
};
