import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, RotateCw, Heart } from 'lucide-react';
import { musicPlayer } from './AudioPlayer';

export const BirthdayCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    // Joyful flipping sound
    musicPlayer.playFlip();
    setIsFlipped(!isFlipped);
  };

  return (
    <div id="card-holder" className="flex flex-col items-center justify-center p-4 select-none">
      
      {/* Small Section Header Details exactly matching Screenshot 2 */}
      <span className="text-pink-400 font-cursive text-xl font-bold tracking-wide">
        a little card
      </span>
      
      {/* Tidy display header */}
      <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-1 mb-8 tracking-tight text-center">
        A note to flip open
      </h3>

      {/* 3D Perspective Container */}
      <div 
        id="greeting-holder-perspective"
        className="w-[300px] sm:w-[350px] h-[320px] cursor-pointer"
        style={{ perspective: '1200px' }}
        onClick={handleFlip}
      >
        {/* Double-Sided Card Body */}
        <motion.div
          id="perspective-flipper"
          className="relative w-full h-full duration-700 rounded-3xl shadow-2xl border border-pink-500/10 bg-zinc-950"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.03, y: -4 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          {/* ==================================== */}
          {/* FRONT SIDE (Pastel Sunset - Pic 2)  */}
          {/* ==================================== */}
          <div
            id="card-front-face"
            className="absolute inset-0 w-full h-full rounded-3xl flex flex-col items-center justify-between p-6 text-center border border-pink-500/20"
            style={{ 
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #1b091f 0%, #2f042c 50%, #15062a 100%)', // Luxury midnight nebula orchid
            }}
          >
            {/* Top decorative spacing */}
            <div className="w-1" />

            {/* Cake outline & Title */}
            <div className="flex flex-col items-center my-auto">
              {/* Elegant Outline Line-Art Cake */}
              <div className="relative mb-4 p-4 rounded-full bg-zinc-950/60 backdrop-blur-sm border border-pink-500/20 shadow-lg">
                <Cake className="w-12 h-12 text-pink-400 stroke-[1.5]" />
                {/* Floating shine dust */}
                <motion.div
                  className="absolute -top-1 -right-1 text-amber-400 text-xs"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  ✦
                </motion.div>
              </div>

              {/* Heartfelt Pink/Rose Title */}
              <h4 className="text-2xl sm:text-3xl font-extrabold text-pink-300/90 tracking-tight font-cute leading-tight drop-shadow-[0_0_8px_rgba(244,63,94,0.35)]">
                Happy Birthday Ishu
              </h4>

              {/* Central single glowing candle emoticon */}
              <div className="mt-3 text-sm flex items-center justify-center bg-black/45 border border-white/10 px-3 py-1 rounded-full text-amber-300 shadow-inner">
                🎂🕯️
              </div>
            </div>

            {/* Flip prompt indicator precisely as shown in Photo 2 */}
            <div className="flex items-center gap-1.5 text-xs text-pink-400 font-semibold tracking-wide font-cute bg-black/40 border border-white/10 px-4 py-1.5 rounded-full shadow-sm hover:bg-black/60 transition duration-300">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-pink-400" />
              <span>tap to open</span>
            </div>
          </div>

          {/* ==================================== */}
          {/* BACK SIDE (Delicate Wishes - Pic 4) */}
          {/* ==================================== */}
          <div
            id="card-back-face"
            className="absolute inset-0 w-full h-full rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-purple-500/20"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #0b1120 0%, #170d28 50%, #061118 100%)', // Deep modern starry night slate
            }}
          >
            {/* The heartwarming message matching Photo 4 precisely */}
            <div className="my-auto max-w-[280px]">
              <p className="text-zinc-200 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-semibold text-center select-text">
                "on your special day  i waish u celebrate this day diffrent from another day and this is your first birthday with me but i want to make this day memorable..i know we are not together on your birthday but its does not matter i make this birthday memorable... so happy happy happy happy happy happy happy birthday"
              </p>
              
              {/* Signature label */}
              <p className="text-pink-400 font-cursive text-2xl font-bold mt-5 tracking-wider">
                — with love, always 💖
              </p>
            </div>

            {/* Back indicator */}
            <div className="text-[9px] font-mono font-medium tracking-widest text-zinc-500 uppercase opacity-75 mt-3 select-none">
              Click to flip back 🔄
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
