import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterMessageProps {
  onComplete?: () => void;
}

export const TypewriterMessage: React.FC<TypewriterMessageProps> = ({ onComplete }) => {
  const fullText = `Hi Ishu...

Instead of sending a normal birthday text,
I decided to make something with my own effort.

I hope this little surprise makes you smile. ❤️`;

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const char = fullText.charAt(index);
      let delay = 35;
      if (char === '.' || char === '\n') {
        delay = char === '.' ? 280 : 180;
      } else if (char === ',') {
        delay = 140;
      }

      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + char);
        setIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      const finalTimer = setTimeout(onComplete, 1600);
      return () => clearTimeout(finalTimer);
    }
  }, [index, fullText, onComplete]);

  return (
    <motion.div
      id="typewriter-console"
      className="max-w-xl w-full mx-auto bg-zinc-950/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden text-pink-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Decorative window headers (Clean dark console layout) */}
      <div className="flex gap-1.5 justify-start mb-6 border-b border-zinc-900 pb-4">
        <div className="w-3 h-3 rounded-full bg-pink-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="text-[10px] text-zinc-500 font-mono ml-3 uppercase tracking-wider font-bold">
          dear_ishu.md
        </span>
      </div>

      {/* Rendering typed letter block */}
      <div className="text-zinc-100 font-sans text-base sm:text-lg leading-relaxed whitespace-pre-wrap tracking-wide font-semibold italic">
        {displayedText}
        {/* Cursor caret indicator */}
        <motion.span
          className="inline-block w-2.5 h-4.5 bg-pink-400 ml-1 rounded-sm align-middle shadow-[0_0_8px_rgba(244,63,94,0.5)]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};
