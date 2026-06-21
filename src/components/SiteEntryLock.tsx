import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Heart, Sparkles } from 'lucide-react';

interface SiteEntryLockProps {
  onUnlockSuccess: () => void;
}

export const SiteEntryLock: React.FC<SiteEntryLockProps> = ({ onUnlockSuccess }) => {
  const [passcode, setPasscode] = useState<string>('');
  const [savedCode, setSavedCode] = useState<string>('0919');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Sync passcode with the secret vault lock passcode stored in localStorage
    const localPasscode = localStorage.getItem('lock_passcode');
    if (localPasscode && localPasscode !== '0919') {
      localStorage.setItem('lock_passcode', '0919');
      setSavedCode('0919');
    } else if (localPasscode) {
      setSavedCode(localPasscode);
    }

    // Generate romantic drifting background hearts
    const generatedHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      size: Math.random() * 16 + 8,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 6,
    }));
    setHearts(generatedHearts);
  }, []);

  const handleKeyPress = (num: string) => {
    setErrorMsg('');
    if (passcode.length < 10) {
      setPasscode(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPasscode('');
    setErrorMsg('');
  };

  const handleUnlockCheck = () => {
    const cleanInput = passcode.trim().toLowerCase();
    const cleanSaved = savedCode.trim().toLowerCase();

    // Verify passcode. Fallbacks for easy developer/user access: '0919' and 'ishu'
    if (cleanInput === cleanSaved || cleanInput === '0919' || cleanInput === 'ishu') {
      onUnlockSuccess();
    } else {
      setErrorMsg('Incorrect Key! Keep trying... ❤️🔒');
      setPasscode('');
      // Auto-clear message after 4s
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  // Listen to physical keyboard presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleUnlockCheck();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [passcode, savedCode]);

  return (
    <div
      id="site-entry-lock-screen"
      className="fixed inset-0 flex flex-col items-center justify-center p-4 z-[9999] bg-[#07040f]/95 overflow-hidden select-none"
    >
      {/* Drifting Background Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-500/10"
            style={{
              left: `${heart.x}%`,
              bottom: '-25px',
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: ['0px', '-110vh'],
              x: ['0px', heart.id % 2 === 0 ? '25px' : '-25px'],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut"
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Romantic colorful design gradient blurs */}
      <div className="absolute top-[10%] left-[20%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-pink-500/10 rounded-full filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-purple-500/10 rounded-full filter blur-[110px] pointer-events-none" />

      {/* The main card container */}
      <motion.div
        id="entry-gate-card"
        className="w-full max-w-sm bg-zinc-950/90 border border-pink-500/25 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(244,63,94,0.18)] backdrop-blur-md relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
      >
        {/* Pulsing Lock & Heart Header Container */}
        <div className="relative mb-4 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 bg-gradient-to-tr from-pink-950/80 to-rose-950/80 border border-pink-500/40 rounded-full flex items-center justify-center text-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] relative z-10 cursor-pointer"
            animate={{ 
              scale: [1, 1.06, 1],
            }}
            transition={{ 
              scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="relative">
              <Lock className="w-6 h-6 text-pink-400 stroke-[1.8]" />
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 absolute -bottom-1 -right-1 animate-pulse" />
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Brand identity titles */}
        <h2 className="text-xl sm:text-2xl font-black text-rose-100 uppercase tracking-[0.22em] flex items-center gap-1.5 justify-center">
          Surprise Is Locked
        </h2>
        
        <div className="flex items-center gap-2 mt-1.5 justify-center">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-pink-500/40" />
          <p className="text-[10px] text-pink-400 font-sans tracking-[0.12em] font-extrabold uppercase">
            Only For Ishu 💖
          </p>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-pink-500/40" />
        </div>

        <p className="text-[10.5px] text-zinc-400 font-sans leading-relaxed mt-3.5 max-w-[290px]">
          Enter the secret 4-digit passcode to reveal Ishu's beautiful virtual birthday box! ✨
        </p>

        {/* Password Display Field */}
        <div className="w-full bg-gradient-to-r from-zinc-900/90 to-zinc-950/90 border border-pink-500/10 rounded-xl p-3.5 mt-5 flex items-center justify-between text-zinc-100 shadow-inner">
          <span className="text-[9px] font-mono text-pink-400/70 tracking-wider">
            PASSCODE:
          </span>
          <div className="flex justify-center items-center gap-1.5 h-6">
            {passcode ? (
              Array.from(passcode).map((_, idx) => (
                <motion.span 
                  key={idx} 
                  className="text-xs text-rose-400 select-none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                >
                  ❤️
                </motion.span>
               ))
            ) : (
              <span className="text-[10px] font-mono text-zinc-650 animate-pulse tracking-widest font-bold">
                _ _ _ _
              </span>
            )}
          </div>
          <div className="w-6" /> {/* Balance spacer offset */}
        </div>

        {/* Keys grid */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] mt-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              id={`entry-keypad-digit-${num}`}
              onClick={() => handleKeyPress(num)}
              className="py-2.5 rounded-xl bg-gradient-to-b from-zinc-900/75 to-zinc-950/75 hover:from-pink-950/20 hover:to-rose-950/20 border border-zinc-800/60 hover:border-pink-500/35 active:scale-95 text-zinc-300 font-bold hover:text-pink-300 shadow-sm transition-all duration-150 cursor-pointer text-sm font-sans flex flex-col items-center justify-center relative group"
            >
              <span>{num}</span>
              <span className="absolute bottom-0.5 text-[6px] text-pink-500/0 group-hover:text-pink-500/60 transition-all">♥</span>
            </button>
          ))}
          <button
            onClick={handleClear}
            className="py-2.5 rounded-xl bg-zinc-950/40 hover:bg-zinc-900/85 border border-zinc-900/40 text-rose-400 text-xs font-bold hover:text-rose-300 active:scale-95 cursor-pointer transition-all duration-150"
          >
            Clear
          </button>
          <button
            id="entry-keypad-digit-0"
            onClick={() => handleKeyPress('0')}
            className="py-2.5 rounded-xl bg-gradient-to-b from-zinc-900/75 to-zinc-950/75 hover:from-pink-950/20 hover:to-rose-950/20 border border-zinc-800/60 hover:border-pink-500/35 active:scale-95 text-zinc-300 font-bold hover:text-pink-300 shadow-sm transition-all duration-150 cursor-pointer text-sm font-sans flex flex-col items-center justify-center relative group"
          >
            <span>0</span>
            <span className="absolute bottom-0.5 text-[6px] text-pink-500/0 group-hover:text-pink-500/60 transition-all">♥</span>
          </button>
          <button
            onClick={handleBackspace}
            className="py-2.5 rounded-xl bg-zinc-950/40 hover:bg-zinc-900/85 border border-zinc-900/40 text-zinc-400 text-xs font-bold hover:text-rose-400 active:scale-95 cursor-pointer transition-all duration-150"
          >
            ⌫
          </button>
        </div>

        {/* Primary Glow Unlock Button */}
        <button
          id="entry-unlock-submit-btn"
          onClick={handleUnlockCheck}
          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-400 hover:to-red-400 active:scale-95 text-xs font-bold font-sans uppercase tracking-[0.2em] text-white shadow-[0_4px_22px_rgba(244,63,94,0.35)] cursor-pointer transition-all duration-150 flex items-center justify-center gap-1.5"
        >
          <Heart className="w-3.5 h-3.5 fill-current animate-pulse mr-1" />
          <span>Unlock Entrance 💖</span>
        </button>

        {/* Error messaging section */}
        {errorMsg && (
          <motion.div
            className="mt-3 text-[10px] text-rose-300 flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-lg justify-center w-full"
            initial={{ x: -6 }}
            animate={{ x: [0, -6, 6, -6, 0] }}
            transition={{ duration: 0.35 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-450 flex-shrink-0 animate-spin" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
