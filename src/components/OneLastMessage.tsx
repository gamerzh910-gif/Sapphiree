import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { musicPlayer } from './AudioPlayer';

interface OneLastMessageProps {
  onClose: () => void;
  triggerConfettiBlast: (x?: number, y?: number) => void;
}

export const OneLastMessage: React.FC<OneLastMessageProps> = ({ onClose, triggerConfettiBlast }) => {
  useEffect(() => {
    // Start synthesized Happy Birthday melody
    musicPlayer.playBirthdayMelody();

    // Spawn lovely introductory sparkles at the sides from the letter
    setTimeout(() => {
      triggerConfettiBlast(window.innerWidth * 0.25, window.innerHeight * 0.5);
      triggerConfettiBlast(window.innerWidth * 0.75, window.innerHeight * 0.5);
    }, 250);

    return () => {
      musicPlayer.stopChimes();
    };
  }, [triggerConfettiBlast]);

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[100] overflow-y-auto pointer-events-auto selection:bg-pink-500/30 font-sans"
    >
      {/* Decorative center halo glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-pink-500/10 blur-[100px]" />
 
      {/* Main card matching Screenshot 1 layout precisely */}
      <motion.div
        id="modal-card-panel"
        className="relative max-w-sm sm:max-w-md w-full bg-zinc-950/90 border border-zinc-800 p-8 sm:p-10 rounded-[32px] shadow-2xl text-center my-auto overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 160 }}
      >
        {/* Soft pink close button wrapper (Matches top right circle X in Screenshot 1) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-400 hover:text-pink-300 hover:bg-zinc-900 transition w-7 h-7 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800 shadow-sm cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
 
        {/* Center floating small red heart at top of page (Pic 1) */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-2xl filter drop-shadow-sm"
          >
            ❤️
          </motion.div>
        </div>
 
        {/* Subtitle / Name "Ishu," (Pic 1) */}
        <h4 className="text-xl font-bold text-zinc-300 tracking-wide font-sans mb-5">
          Ishu,
        </h4>
 
        {/* Central message (Matches layout lines in Photo 1 precisely) */}
        <div className="text-zinc-200 text-[14px] leading-relaxed tracking-wider space-y-4 max-w-sm mx-auto font-medium">
          <p>
            Thank you for taking the time to visit this page.
          </p>
          <p>
            This may not be the biggest gift,
            <br />
            but every animation, every line,
            <br />
            and every detail was added with the hope
            <br />
            of making your birthday a little more special.
          </p>
          <p>
            I hope today brings you happiness,
            <br />
            laughter, success, and beautiful memories.
          </p>
          <p>
            Stay happy, keep smiling,
            <br />
            and enjoy your special day.
          </p>
          <p className="font-extrabold text-pink-400 text-[15px] pt-2 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
            Happy Birthday once again! 🎂✨
          </p>
        </div>
 
        {/* Made Especially For Ishu Footer tag in gorgeous handwriting cursive (Pic 1) */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-center gap-2">
          <span className="text-lg">❤️</span>
          <span className="font-cursive text-2xl font-bold text-pink-400 select-all tracking-wide">
            Made Especially For Ishu
          </span>
          <span className="text-lg">❤️</span>
        </div>
      </motion.div>
    </div>
  );
};
