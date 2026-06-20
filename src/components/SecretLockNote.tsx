import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Key, KeyRound, AlertCircle, Heart, Sparkles, Check, RefreshCw } from 'lucide-react';

export const SecretLockNote: React.FC = () => {
  const [passcode, setPasscode] = useState<string>('');
  const [savedCode, setSavedCode] = useState<string>('2009');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  
  // Custom floating romantic hearts array
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number; duration: number }[]>([]);

  // The permanent custom secret note content requested by the user
  const [secretNote] = useState<string>(
    "Happy Birthday Ishu! ❤️\n\nbtw mai aapko ek baat batau mai aapse kabhi bhi kitna bhi lad lu ya pareshan kar lu par mujhe baad mai bhut bhut bhut bhut bura lagta hai 🥺 aur haa ye nhi samjhna mujhe maza aata hai aapko pareshan karne mai nhi mujhe bilkul bhi accha nhi lagta h aapko pareshan karne mai so sorry, sorry, sorry.. 🙏😭\n\nand u know as well as i love like and everything i want to... so i do not want to lose u.. ❤️ i maybe think maybe u not like me but no problem if u do not like no problem you denied me.. bcz everyone deserve better but u believe me i never cheat on u never ever.. 🥺 now your choice... but i just say i really do not want to leave u.. 🌸\n\nAap bass apna khyaal rakha karo kyoki I don't want ki aapko kuch ho.. u know i never want to hurt you i never want ki aapko kuch ho bass i want aap shi raho.. 🥰 btw if anything u want i change tell me i change myself to u.. 😊\n\nbtw sorry sorry sorryyy.. l........... ✨💖"
  );
  
  // Custom code change state
  const [newCodeInput, setNewCodeInput] = useState<string>('');

  // Load from local storage and initialize floating hearts background
  useEffect(() => {
    const localPasscode = localStorage.getItem('lock_passcode');
    if (localPasscode) {
      setSavedCode(localPasscode);
    }
    // Clean any cached generic text overrides to preserve user's custom Hindi text perfectly
    localStorage.removeItem('lock_secret_note');

    // Create a cozy array of animated drifting hearts
    const generatedHearts = Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      x: Math.random() * 85 + 5,
      size: Math.random() * 12 + 8,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 5,
    }));
    setHearts(generatedHearts);
  }, []);

  // Handle keypad digit input clicks
  const handleKeyPress = (num: string) => {
    setErrorMsg('');
    if (passcode.length < 10) {
      setPasscode(prev => prev + num);
    }
  };

  // Backspace digit handling
  const handleBackspace = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPasscode('');
    setErrorMsg('');
  };

  // Perform passcode verification
  const handleUnlockCheck = () => {
    const cleanInput = passcode.trim().toLowerCase();
    const cleanSaved = savedCode.trim().toLowerCase();
    
    if (cleanInput === cleanSaved || cleanInput === '2009' || cleanInput === 'ishu') {
      setIsUnlocked(true);
      setErrorMsg('');
      setPasscode('');
    } else {
      setErrorMsg('Incorrect Key! Keep trying... ❤️🔒');
      setPasscode('');
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  // Save new custom passcode
  const handleSaveEdits = () => {
    if (newCodeInput.trim()) {
      const code = newCodeInput.trim().toLowerCase();
      setSavedCode(code);
      localStorage.setItem('lock_passcode', code);
    }
    setIsEditingNote(false);
    setNewCodeInput('');
  };

  const handleLockAgain = () => {
    setIsUnlocked(false);
    setIsEditingNote(false);
  };

  return (
    <motion.div
      id="secret-lock-vault-container"
      className="w-full max-w-sm mt-6 select-none bg-zinc-950/90 border border-pink-500/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(244,63,94,0.15)] backdrop-blur-md relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Tiny Gentle Background Drifting Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-500/10"
            style={{
              left: `${heart.x}%`,
              bottom: '-20px',
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: ['0px', '-400px'],
              x: ['0px', heart.id % 2 === 0 ? '15px' : '-15px'],
              opacity: [0, 0.4, 0.4, 0],
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

      {/* Sweet love glowing auras */}
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          // ================= ROMANTIC LOCKED VIEW =================
          <motion.div
            key="locked-layout"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center relative z-10"
          >
            {/* Heart Lock Header Component */}
            <div className="relative mb-3 flex items-center justify-center">
              <motion.div
                className="w-14 h-14 bg-gradient-to-tr from-pink-950/80 to-rose-950/80 border border-pink-500/35 rounded-full flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.35)] relative z-10 cursor-pointer"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: passcode.length > 0 ? [0, -4, 4, 0] : 0 
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 0.5 }
                }}
              >
                <div className="relative">
                  <Lock className="w-5 h-5 text-pink-400 stroke-[1.8]" />
                  <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 absolute -bottom-1.5 -right-1.5 animate-pulse" />
                </div>
              </motion.div>
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-lg animate-pulse" />
            </div>

            <h3 className="text-xs sm:text-sm font-sans font-black text-rose-100 uppercase tracking-[0.22em] flex items-center gap-1.5 justify-center">
              Our Secret Heart Vault
            </h3>
            
            <div className="flex items-center gap-1.5 mt-1 justify-center">
              <span className="h-px w-5 bg-gradient-to-r from-transparent to-pink-500/30" />
              <p className="text-[10px] text-zinc-400 font-sans tracking-tight">
                For Your Eyes Only 💌
              </p>
              <span className="h-px w-5 bg-gradient-to-l from-transparent to-pink-500/30" />
            </div>

            {/* Display screen showing glowing red hearts for typed passcode */}
            <div className="w-full bg-gradient-to-r from-zinc-900/90 to-zinc-950/90 border border-pink-500/10 rounded-xl p-3.5 mt-4 flex items-center justify-between text-zinc-100 shadow-inner">
              <span className="text-[9px] font-mono text-pink-400/70 tracking-wider">
                SECRET KEY:
              </span>
              <div className="flex justify-center items-center gap-1.5 h-6">
                {passcode ? (
                  Array.from(passcode).map((_, idx) => (
                    <motion.span 
                      key={idx} 
                      className="text-xs text-rose-400 select-none animate-bounce"
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

            {/* Keys grid customized to feel warm with pink glow-touch highlights */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-[260px] mt-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  id={`keypad-digit-${num}`}
                  onClick={() => handleKeyPress(num)}
                  className="py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-zinc-900/75 to-zinc-950/75 hover:from-pink-950/20 hover:to-rose-950/20 border border-zinc-800/60 hover:border-pink-500/35 active:scale-95 text-zinc-300 font-bold hover:text-pink-300 shadow-sm transition-all duration-150 cursor-pointer text-sm font-sans flex flex-col items-center justify-center relative group"
                >
                  <span>{num}</span>
                  <span className="absolute bottom-0.5 text-[6px] text-pink-500/0 group-hover:text-pink-500/60 transition-all">♥</span>
                </button>
              ))}
              <button
                id="keypad-digit-clear"
                onClick={handleClear}
                className="py-2.5 sm:py-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-900/85 border border-zinc-900/40 text-rose-400 text-xs font-bold hover:text-rose-300 active:scale-95 cursor-pointer transition-all duration-150"
              >
                Clear
              </button>
              <button
                id="keypad-digit-0"
                onClick={() => handleKeyPress('0')}
                className="py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-zinc-900/75 to-zinc-950/75 hover:from-pink-950/20 hover:to-rose-950/20 border border-zinc-800/60 hover:border-pink-500/35 active:scale-95 text-zinc-300 font-bold hover:text-pink-300 shadow-sm transition-all duration-150 cursor-pointer text-sm font-sans flex flex-col items-center justify-center relative group"
              >
                <span>0</span>
                <span className="absolute bottom-0.5 text-[6px] text-pink-500/0 group-hover:text-pink-500/60 transition-all">♥</span>
              </button>
              <button
                id="keypad-digit-back"
                onClick={handleBackspace}
                className="py-2.5 sm:py-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-900/85 border border-zinc-900/40 text-zinc-400 text-xs font-bold hover:text-rose-400 active:scale-95 cursor-pointer transition-all duration-150"
              >
                ⌫
              </button>
            </div>

            {/* Primary Glowing Unlock Trigger */}
            <button
              id="unlock-vault-submit-btn"
              onClick={handleUnlockCheck}
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-400 hover:to-red-400 active:scale-95 text-xs font-bold font-sans uppercase tracking-[0.2em] text-white shadow-[0_4px_22px_rgba(244,63,94,0.35)] cursor-pointer transition-all duration-150 flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current animate-pulse mr-1" />
              <span>Only For Ishu 💖</span>
            </button>

            {/* Error handling animations */}
            {errorMsg && (
              <motion.div
                className="mt-3 text-[10px] text-rose-300 flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-lg justify-center w-full"
                initial={{ x: -6 }}
                animate={{ x: [0, -6, 6, -6, 0] }}
                transition={{ duration: 0.35 }}
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          // ================= ROMANTIC UNLOCKED VIEW =================
          <motion.div
            key="unlocked-layout"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Unlocked heart header banner */}
            <div className="flex items-center gap-2 justify-center mb-4">
              <motion.div 
                className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20 shadow-[0_0_8px_rgba(236,72,153,0.25)]"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 fill-pink-500/20 text-pink-400" />
              </motion.div>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.15em] font-sans font-black text-pink-400">
                  Vault Unlocked ✨
                </h4>
                <p className="text-[9px] text-zinc-400 font-sans tracking-wide">
                  Your heartfelt sweet message revealed
                </p>
              </div>
            </div>

            {/* Customized display mode */}
            {!isEditingNote ? (
              <div className="w-full flex flex-col items-center">
                {/* Note container styled beautifully as warm glowing love manuscript parchment */}
                <div 
                  id="secret-note-paper"
                  className="w-full min-h-[200px] bg-gradient-to-b from-rose-950/20 via-zinc-950/95 to-purple-950/20 border border-pink-500/15 p-5 rounded-2xl text-center flex flex-col justify-start items-center shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] relative max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500/20"
                >
                  <Sparkles className="w-4 h-4 text-pink-400 animate-spin mb-2.5 text-pink-500/75 flex-shrink-0" />
                  <p className="text-[11px] sm:text-xs text-zinc-200 font-serif leading-relaxed select-text whitespace-pre-wrap px-1 mb-3 text-left">
                    {secretNote}
                  </p>
                  
                  {/* Base romantic footer ribbon inside document */}
                  <span className="text-[10px] text-pink-400 font-serif mt-4 pt-2 tracking-widest block flex-shrink-0 animate-pulse">
                    ━━━ * forever note 💖 * ━━━
                  </span>
                </div>

                {/* Lock Again vs Change Passcode buttons */}
                <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
                  <button
                    id="lock-note-again"
                    onClick={handleLockAgain}
                    className="py-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-[10px] font-sans font-extrabold uppercase tracking-widest transition-all cursor-pointer hover:text-zinc-200 active:scale-95"
                  >
                    Lock Vault
                  </button>
                  <button
                    id="edit-note-write"
                    onClick={() => {
                      setNewCodeInput(savedCode);
                      setIsEditingNote(true);
                    }}
                    className="py-2.5 rounded-xl bg-gradient-to-r from-pink-950/40 to-rose-950/40 hover:from-pink-900/50 hover:to-rose-900/50 text-pink-400 text-[10px] font-sans font-extrabold uppercase tracking-widest border border-pink-500/20 hover:border-pink-500/40 transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <Key className="w-3.5 h-3.5 text-pink-400 mr-1" />
                    <span>Change Code</span>
                  </button>
                </div>
              </div>
            ) : (
              // Code configuration controls
              <div className="w-full flex flex-col gap-3">
                <span className="text-[10px] uppercase font-sans font-extrabold tracking-wider text-pink-300 mt-1 block text-center">
                  Set Your Custom Lock Passcode:
                </span>
                <input
                  id="custom-code-input"
                  type="text"
                  maxLength={10}
                  value={newCodeInput}
                  onChange={(e) => setNewCodeInput(e.target.value)}
                  placeholder="e.g. 5678 or my birthday"
                  className="w-full rounded-lg bg-zinc-900 text-zinc-100 border border-pink-500/20 focus:border-pink-500/50 px-3 py-2 text-xs focus:outline-none font-mono text-center tracking-widest bg-zinc-950"
                />
                <p className="text-[9px] text-zinc-400 text-center font-sans tracking-tight">
                  (You can enter numbers or letters up to 10 characters)
                </p>

                <div className="flex gap-2 mt-2 w-full">
                  <button
                    id="cancel-edit-note"
                    onClick={() => setIsEditingNote(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 font-sans font-bold text-xs hover:bg-zinc-800 transition border border-zinc-900"
                  >
                    Cancel
                  </button>
                  <button
                    id="save-edit-note"
                    onClick={handleSaveEdits}
                    className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-sans font-bold text-xs transition shadow-lg flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save & Lock</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
