import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { musicPlayer } from './AudioPlayer';

interface GiftBoxProps {
  onOpen: () => void;
  triggerConfettiBlast: (x?: number, y?: number) => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ onOpen, triggerConfettiBlast }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  // Auto typewriter block (replicating the "Hi Ishu. |" input box in Screenshot 6)
  useEffect(() => {
    const fullText = "Hi Ishu. Please tap the gift above to begin!";
    let index = 0;
    const interval = setInterval(() => {
      setTypedMessage((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleOpenGift = (e: React.MouseEvent) => {
    if (isOpening || hasOpened) return;
    setIsOpening(true);

    const clientX = e.clientX;
    const clientY = e.clientY;

    // Trigger joyful celebration chime & confetti blast
    musicPlayer.playCelebrateChime();
    triggerConfettiBlast(clientX, clientY);

    // Keep lid blowing up and open after transitions
    setTimeout(() => {
      setHasOpened(true);
      onOpen();
    }, 1100);
  };

  return (
    <div id="giftbox-wrapper" className="flex flex-col items-center justify-center p-4">
      {!hasOpened && (
        <motion.div
          id="gift-container"
          className="relative flex flex-col items-center cursor-pointer select-none max-w-md w-full"
          onClick={handleOpenGift}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Gentle background glow behind flat gift box */}
          <div className="absolute top-[230px] w-52 h-10 bg-pink-400/25 blur-3xl rounded-full -z-10 animate-pulse" />
          
          {/* Aesthetic header details (Matches Screenshot 5 layout precisely) */}
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-pink-500 font-bold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>a tiny surprise for</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            {/* Massive modern grape-purple heading */}
            <h1 className="text-4xl sm:text-5xl font-black text-pink-100 mt-4 tracking-tight">
              Happy Birthday, Ishu
            </h1>
            
            {/* Elegant descriptive subtitle */}
            <p className="text-zinc-400 text-sm font-medium mt-3 tracking-wide max-w-sm">
              Something handcrafted, just for you. Tap the gift to begin.
            </p>
          </div>

          {/* Clean 2D Playful Miniature Gift Box Container (Exactly like design on Screenshot 5/6) */}
          <motion.div
            id="the-actual-giftbox"
            className="relative w-[180px] h-[190px] mt-2 mb-10"
            whileHover={
              !isOpening
                ? {
                    scale: 1.05,
                    rotate: [-1.2, 1.2, -1.2, 1.2, 0],
                    transition: { duration: 0.35, repeat: Infinity }
                  }
                : {}
            }
          >
            {/* 1. Yellow Love Heart Button on Top */}
            <motion.div
              className="absolute top-[-26px] left-[78px] z-40"
              animate={
                isOpening
                  ? { y: -240, scale: 0.2, opacity: 0 }
                  : { y: [0, -3, 0] }
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-sm" />
            </motion.div>

            {/* 2. Flat Pastel Purple Lid */}
            <motion.div
              className="absolute top-0 left-[-5px] w-[190px] h-[44px] bg-purple-300 rounded-t-2xl z-30 shadow-md border-b-2 border-purple-400/30 flex items-center justify-center overflow-hidden"
              animate={isOpening ? { y: -190, rotate: -20, opacity: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Center Vertical Gold Ribbon Ribbon */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[30px] h-full bg-amber-400"></div>
            </motion.div>

            {/* 3. Flat Cheerful Rose-Pink Body */}
            <div className="absolute top-[40px] w-[180px] h-[140px] bg-rose-400 rounded-b-2xl border border-rose-400/20 shadow-md z-20 overflow-hidden">
              {/* Center Vertical Gold Ribbon */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[30px] h-full bg-amber-400"></div>
            </div>

            {/* 4. Magic Internal Flare (on click) */}
            <motion.div
              className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-300 rounded-full filter blur-xl z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={isOpening ? { scale: [1, 2.5], opacity: [0, 0.9, 0] } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Interactive Tap Banner / Typist dialog (Matches Screenshot 5 & 6 buttons) */}
          <AnimatePresence mode="wait">
            {!isOpening ? (
              <motion.div
                key="tag-button"
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Clickable prompt badge */}
                <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-950/60 border border-pink-500/30 text-pink-400 font-black uppercase tracking-[0.2em] rounded-full shadow-lg hover:shadow-xl hover:border-pink-400 hover:bg-zinc-950/90 transition duration-300 hover:scale-105 active:scale-95">
                  <span className="animate-bounce">👉</span> tap the gift <span className="text-sm">🎁</span>
                </span>
 
                {/* Simulated typewriter chatbot banner matching Screenshot 6 */}
                <div className="px-5 py-2.5 bg-zinc-950/70 border border-zinc-800/80 rounded-2xl shadow-sm text-xs font-mono text-zinc-300 max-w-xs font-bold tracking-wide backdrop-blur-sm">
                  <span>{typedMessage}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-0.5 inline-block w-1.5 h-3.5 bg-pink-400 align-middle"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
