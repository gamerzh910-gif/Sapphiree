import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { StarryBackground } from './components/StarryBackground';
import { FloatingBalloons } from './components/FloatingBalloons';
import { FloatingHearts } from './components/FloatingHearts';
import { ConfettiEffect, ConfettiEffectRef } from './components/ConfettiEffect';
import { LoadingScreen } from './components/LoadingScreen';
import { GiftBox } from './components/GiftBox';
import { TypewriterMessage } from './components/TypewriterMessage';
import { BirthdayCard } from './components/BirthdayCard';
import { MemoryGallery } from './components/MemoryGallery';
import { MemoryPolaroid } from './components/MemoryPolaroid';
import { SecretLockNote } from './components/SecretLockNote';
import { OneLastMessage } from './components/OneLastMessage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isTypewriterFinished, setIsTypewriterFinished] = useState(false);
  const [isLastMessageOpened, setIsLastMessageOpened] = useState(false);
  const [continuousFireworks, setContinuousFireworks] = useState(false);

  // Hook into the page scroll system
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Reference to manually trigger confetti bursts from the box click
  const confettiRef = useRef<ConfettiEffectRef | null>(null);

  const handleConfettiBlast = (x?: number, y?: number) => {
    if (confettiRef.current) {
      confettiRef.current.triggerBlast(x, y);
    }
  };

  const handleOpenGift = () => {
    setIsGiftOpened(true);
  };

  const handleTypewriterFinish = () => {
    setIsTypewriterFinished(true);
  };

  const handleOpenLastMessage = () => {
    setContinuousFireworks(true);
    setIsLastMessageOpened(true);
  };

  const handleCloseLastMessage = () => {
    setIsLastMessageOpened(false);
  };

  return (
    <div id="main-frame" className="relative min-h-screen w-full text-zinc-100 flex flex-col justify-between overflow-x-hidden font-sans selection:bg-pink-500/30">
      
      {/* Dynamic Scroll Progress Bar at the absolute top of the screen */}
      <motion.div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 via-indigo-500 to-emerald-400 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* 2️⃣ Starry Night Background & Moon */}
      <StarryBackground />

      {/* 3️⃣ Continuous Floating Balloons (pink, purple, blue) */}
      <FloatingBalloons />

      {/* 9️⃣ Continuous Floating Hearts (acting as lovely ambient flow) */}
      <FloatingHearts />

      {/* 4️⃣ and 1️⃣2️⃣ Multi-purpose physics Particle Canvas (Confetti blasts + Fireworks) */}
      <ConfettiEffect ref={confettiRef} continuousFireworks={continuousFireworks} />

      {/* 11️⃣ Absolute Progress Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Primary Layout Engine */}
      <main id="surprise-stage" className="relative w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[90vh] z-20">
        {!isLoading && (
          <div className="w-full flex flex-col items-center">
            
            {/* Phase 1: Unopened Gift Box */}
            {!isGiftOpened && (
              <GiftBox onOpen={handleOpenGift} triggerConfettiBlast={handleConfettiBlast} />
            )}

            {/* Phase 2: Typerwriter Letter Typing Reveal */}
            {isGiftOpened && !isTypewriterFinished && (
              <div className="w-full py-8 flex flex-col items-center">
                <TypewriterMessage onComplete={handleTypewriterFinish} />
                <motion.button
                  onClick={handleTypewriterFinish}
                  className="mt-6 text-xs font-sans font-bold uppercase tracking-wider text-pink-400 hover:text-pink-300 transition cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Skip message intro & explore surprise ➔
                </motion.button>
              </div>
            )}

            {/* Phase 3: Final Dashboard Layout (Card, Ticker, Gallery, Big CTA) */}
            {isGiftOpened && isTypewriterFinished && (
              <motion.div
                id="dashboard-grid-panel"
                className="w-full flex flex-col items-center gap-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Header title cards banner */}
                <div className="text-center max-w-xl mx-auto flex flex-col items-center">
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-6 text-zinc-100 font-sans leading-tight">
                    For Ishu's Special Day ✨
                  </h2>

                </div>

                {/* Grid Layout: Flip Card + Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center w-full max-w-4xl">
                  
                  {/* Left Column: Flip Card */}
                  <div className="flex flex-col gap-8 items-center w-full">
                    
                    {/* 7️⃣ Handcrafted flipping greeting card */}
                    <BirthdayCard />

                    {/* 📸 Memory Polaroid */}
                    <MemoryPolaroid />

                    {/* 🔒 Secret Vault Lock Note */}
                    <SecretLockNote />
                  </div>

                  {/* Right Column: Dynamic Photobook Gallery */}
                  <div className="flex flex-col gap-8 items-center w-full">
                    
                    {/* 8️⃣ Visual Gallery panel */}
                    <MemoryGallery />

                    {/* Handcrafted note block quote decoration */}
                    <div className="max-w-md w-full bg-zinc-950/60 border border-zinc-800/80 p-6 rounded-2xl text-center text-xs text-zinc-300 font-sans font-bold leading-relaxed select-none shadow-lg backdrop-blur-sm">
                      "i hope this is good but i am angry on you yesterday so i make this in suficient time maybe u like this..  sorry by the way ... sorry sorry" ❤️
                    </div>

                  </div>
                </div>

                {/* 11️⃣ Epic climax "One Last Message" CTA button */}
                <motion.div
                  className="mt-8 flex flex-col items-center gap-2 select-none"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.95, 1.04, 0.95] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <button
                    onClick={handleOpenLastMessage}
                    className="group py-4 px-10 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white text-xs font-black uppercase tracking-[0.25em] shadow-[0_10px_35px_rgba(236,72,153,0.25)] hover:shadow-[0_12px_45px_rgba(236,72,153,0.4)] cursor-pointer active:scale-95 transition-all outline-none border border-white/30 font-sans"
                  >
                    💖 One Last Message 💖
                  </button>
                  <p className="text-[10px] text-pink-400 font-sans font-bold uppercase tracking-[0.15em] mt-3.5 animate-pulse">
                    Tap to unlock final celebratory fireworks & melody
                  </p>
                </motion.div>

              </motion.div>
            )}

          </div>
        )}
      </main>

      {/* Climax overlay container */}
      <AnimatePresence>
        {isLastMessageOpened && (
          <OneLastMessage onClose={handleCloseLastMessage} triggerConfettiBlast={handleConfettiBlast} />
        )}
      </AnimatePresence>

      {/* Aesthetic humbler signature base footer with reveal-on-scroll animation */}
      <motion.footer
        id="signature-footer"
        className="relative z-20 w-full py-8 text-center text-zinc-400 border-t border-zinc-900 select-none bg-zinc-950/45 backdrop-blur-sm mt-12"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs font-sans tracking-wide leading-relaxed hover:text-pink-400 transition duration-300">
          Designed & Created Especially For <span className="text-pink-400 font-black">Ishu</span>
          <br />
          <span className="text-[10px] text-zinc-400 font-sans uppercase tracking-[0.15em] mt-2.5 block font-bold">
            With Time, Effort & Best Wishes ❤️
          </span>
        </p>
      </motion.footer>

    </div>
  );
}
