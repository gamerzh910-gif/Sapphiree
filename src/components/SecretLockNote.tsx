import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Key, KeyRound, AlertCircle, Heart, Sparkles, Check, RefreshCw, PenTool, Clipboard } from 'lucide-react';

export const SecretLockNote: React.FC = () => {
  const [passcode, setPasscode] = useState<string>('');
  const [savedCode, setSavedCode] = useState<string>('1234');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  
  // The secret note content
  const [secretNote, setSecretNote] = useState<string>(
    "Happy Birthday Ishu! ❤️\n\nbtw mai aapko ek baat batau mai aapse kabhi bhi kitna bhi lad lu ya pareshan kar lu par mujhe baad mai bhut bhut bhut bhut bura lagta hai 🥺 aur haa ye nhi samjhna mujhe maza aata hai aapko pareshan karne mai nhi mujhe bilkul bhi accha nhi lagta h aapko pareshan karne mai so sorry, sorry, sorry.. 🙏😭\n\nand u know as well as i love like and everything i want to... so i do not want to lose u.. ❤️ i maybe think maybe u not like me but no problem if u do not like no problem you denied me.. bcz everyone deserve better but u believe me i never cheat on u never ever.. 🥺 now your choice... but i just say i really do not want to leave u.. 🌸\n\nAap bass apna khyaal rakha karo kyoki I don't want ki aapko kuch ho.. u know i never want to hurt you i never want ki aapko kuch ho bass i want aap shi raho.. 🥰 btw if anything u want i change tell me i change myself to u.. 😊\n\nbtw sorry sorry sorryyy.. l........... ✨💖"
  );
  
  // Custom code change states
  const [newCodeInput, setNewCodeInput] = useState<string>('');
  const [tempNoteInput, setTempNoteInput] = useState<string>('');

  // Load from local storage on mount
  useEffect(() => {
    const localPasscode = localStorage.getItem('lock_passcode');
    if (localPasscode) {
      setSavedCode(localPasscode);
    }
    // Remove any legacy note overrides to keep the beautiful note strictly permanent
    localStorage.removeItem('lock_secret_note');
  }, []);

  // Handle keypad button clicks
  const handleKeyPress = (num: string) => {
    setErrorMsg('');
    if (passcode.length < 8) {
      setPasscode(prev => prev + num);
    }
  };

  // Handle backspace or clear
  const handleBackspace = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPasscode('');
    setErrorMsg('');
  };

  // Check the password
  const handleUnlockCheck = () => {
    const cleanInput = passcode.trim().toLowerCase();
    const cleanSaved = savedCode.trim().toLowerCase();
    
    // We let both the custom code AND "ishu" or "1234" work as secondary bypasses so the user never gets locked out!
    if (cleanInput === cleanSaved || cleanInput === '1234' || cleanInput === 'ishu') {
      setIsUnlocked(true);
      setErrorMsg('');
      setPasscode('');
    } else {
      setErrorMsg('Incorrect Key! Try another Combination... 🔒');
      setPasscode('');
      // Smooth automatic reset of shake warning
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  // Save edits of the passcode
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
      className="w-full max-w-sm mt-6 select-none bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative starry aura overlay inside container */}
      <div className="absolute -right-20 -top-20 w-44 h-44 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          // ================= LOCKED VIEW =================
          <motion.div
            key="locked-layout"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            {/* Lock Header */}
            <div className="relative mb-3.5">
              <motion.div
                className="w-14 h-14 bg-zinc-900 border border-zinc-800/85 rounded-full flex items-center justify-center text-pink-400 shadow-lg relative z-10"
                animate={{ rotate: passcode.length > 0 ? [0, -5, 5, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Lock className="w-6 h-6 text-pink-400 stroke-[1.8]" />
              </motion.div>
              <div className="absolute inset-0 bg-pink-500/15 rounded-full blur-lg animate-pulse" />
            </div>

            <h3 className="text-md font-sans font-black text-zinc-100 uppercase tracking-[0.18em] flex items-center gap-1.5 justify-center">
              Secret Password Lock
            </h3>
            
            <p className="text-[10px] text-zinc-400 font-sans tracking-tight mt-1.5 max-w-[280px]">
              Type code on the keypad & press "Unlock" to reveal the custom hidden note.
            </p>

            {/* Display screen */}
            <div className="w-full bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-3.5 mt-4 min-fluid flex items-center justify-between text-zinc-100 text-center shadow-inner group">
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                PASSCODE:
              </span>
              <div className="flex justify-center items-center gap-1.5 h-6">
                {passcode ? (
                  Array.from(passcode).map((_, idx) => (
                    <span 
                      key={idx} 
                      className="w-2.5 h-2.5 bg-pink-400 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.6)] animate-pulse"
                    />
                  ))
                ) : (
                  <span className="text-xs font-mono text-zinc-600 animate-pulse tracking-widest font-bold">
                    _ _ _ _
                  </span>
                )}
              </div>
              <div className="w-8" /> {/* spacing spacer */}
            </div>



            {/* Core Numeric Keypad layout */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-[260px] mt-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  id={`keypad-digit-${num}`}
                  onClick={() => handleKeyPress(num)}
                  className="py-2.5 sm:py-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/60 active:scale-95 text-zinc-300 font-bold hover:text-white hover:border-pink-500/20 shadow-sm transition-all duration-150 cursor-pointer text-sm"
                >
                  {num}
                </button>
              ))}
              <button
                id="keypad-digit-clear"
                onClick={handleClear}
                className="py-2.5 sm:py-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-900/80 border border-zinc-800/30 text-zinc-500 text-xs font-bold hover:text-zinc-300 active:scale-95 cursor-pointer transition-all duration-150"
              >
                Clear
              </button>
              <button
                id="keypad-digit-0"
                onClick={() => handleKeyPress('0')}
                className="py-2.5 sm:py-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/60 active:scale-95 text-zinc-300 font-bold hover:text-white hover:border-pink-500/20 shadow-sm transition-all duration-150 cursor-pointer text-sm"
              >
                0
              </button>
              <button
                id="keypad-digit-back"
                onClick={handleBackspace}
                className="py-2.5 sm:py-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-900/80 border border-zinc-800/30 text-zinc-500 text-xs font-bold hover:text-zinc-300 active:scale-95 cursor-pointer transition-all duration-150"
              >
                ⌫
              </button>
            </div>

            {/* Unlock submission trigger */}
            <button
              id="unlock-vault-submit-btn"
              onClick={handleUnlockCheck}
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 active:scale-95 text-xs font-bold font-sans uppercase tracking-[0.2em] text-white shadow-lg cursor-pointer transition-all duration-150 flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Unlock Secret Note</span>
            </button>

            {/* Error messaging section */}
            {errorMsg && (
              <motion.div
                className="mt-3 text-[10px] text-rose-400 flex items-center gap-1 px-3 py-1.5 bg-rose-500/5 border border-rose-500/20 rounded-lg justify-center w-full"
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
          // ================= UNLOCKED VIEW =================
          <motion.div
            key="unlocked-layout"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            {/* Header Title with animated unlock */}
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
                <Unlock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-pink-400">
                  Vault Unlocked ✨
                </h4>
                <p className="text-[9px] text-zinc-500 font-sans tracking-wide">
                  Private sweet message revealed
                </p>
              </div>
            </div>

            {/* Displaying secret content or Editing mode */}
            {!isEditingNote ? (
              <div className="w-full flex flex-col items-center">
                {/* Real note paper scroll representation */}
                <div 
                  id="secret-note-paper"
                  className="w-full min-h-[180px] bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800/80 p-5 rounded-xl text-center flex flex-col justify-start items-center shadow-inner relative max-h-[300px] overflow-y-auto scroll-smooth"
                >
                  <Heart className="w-5 h-5 text-rose-500 animate-pulse fill-rose-500/25 mb-3 flex-shrink-0" />
                  <p className="text-xs text-zinc-200 font-serif leading-relaxed select-text whitespace-pre-wrap px-1 mb-3">
                    "{secretNote}"
                  </p>
                  
                  {/* Delicate starburst decorations */}
                  <span className="text-[10px] text-zinc-500 font-cursive mt-auto pt-2 tracking-wider block flex-shrink-0">
                    — forever note 💖
                  </span>
                </div>

                {/* Unlocked Controls panel */}
                <div className="grid grid-cols-2 gap-2 w-full mt-4">
                  <button
                    id="lock-note-again"
                    onClick={handleLockAgain}
                    className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-[10px] font-sans font-extrabold uppercase tracking-widest border border-zinc-800 transition cursor-pointer"
                  >
                    Lock Vault
                  </button>
                  <button
                    id="edit-note-write"
                    onClick={() => {
                      setNewCodeInput(savedCode);
                      setIsEditingNote(true);
                    }}
                    className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-pink-400 text-[10px] font-sans font-extrabold uppercase tracking-widest border border-pink-500/10 hover:border-pink-500/20 transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Change Code</span>
                  </button>
                </div>
              </div>
            ) : (
              // Inside Editing Custom Passcode
              <div className="w-full flex flex-col gap-3">
                <span className="text-[10px] uppercase font-sans font-extrabold tracking-wider text-pink-400 mt-1 block text-center">
                  Set Your Custom Lock Passcode:
                </span>
                <input
                  id="custom-code-input"
                  type="text"
                  maxLength={10}
                  value={newCodeInput}
                  onChange={(e) => setNewCodeInput(e.target.value)}
                  placeholder="e.g. 5678 or my birthday"
                  className="w-full rounded-lg bg-zinc-900 text-zinc-100 border border-zinc-800/80 focus:border-pink-500/40 px-3 py-2 text-xs focus:outline-none font-mono text-center tracking-widest"
                />
                <p className="text-[9px] text-zinc-500 text-center font-sans tracking-tight">
                  (You can type any numbers or letters up to 10 characters)
                </p>

                <div className="flex gap-2 mt-2 w-full">
                  <button
                    id="cancel-edit-note"
                    onClick={() => setIsEditingNote(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-zinc-950 text-zinc-400 font-sans font-bold text-xs hover:bg-zinc-900 transition border border-zinc-900"
                  >
                    Cancel
                  </button>
                  <button
                    id="save-edit-note"
                    onClick={handleSaveEdits}
                    className="w-1/2 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-sans font-bold text-xs transition shadow-lg flex items-center justify-center gap-1"
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
