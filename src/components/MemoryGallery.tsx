import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';

interface Memory {
  id: number;
  label: string; // The handwriting label below (e.g. 'a memory', 'a smile')
  title: string;
  caption: string;
  gradient: string; // Pastel gradient color matching Screenshot 3 photo squares
  url?: string;
  tilt: number; // Random-looking aesthetic rotation angle
}

export const MemoryGallery: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const memories: Memory[] = [
    {
      id: 1,
      label: 'a memory',
      title: 'Sweet Celebrations 🎂',
      caption: 'A little cupcake glowing with hope and happy wishes, just for you today.',
      gradient: 'from-pink-300 via-rose-300 to-red-200',
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80',
      tilt: -4,
    },
    {
      id: 2,
      label: 'a smile',
      title: 'Cozy Moments ☕',
      caption: 'Warm hot chocolate and fairy lights, symbolizing comfort, peace, and love.',
      gradient: 'from-purple-300 via-fuchsia-300 to-pink-200',
      url: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=500&q=80',
      tilt: 3,
    },
    {
      id: 3,
      label: 'a laugh',
      title: 'Endless Dreams 🎈',
      caption: 'Bright color-filled balloons carrying all your giant dreams high up into the clouds.',
      gradient: 'from-sky-300 via-blue-300 to-indigo-200',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=500&q=80',
      tilt: -2,
    },
    {
      id: 4,
      label: 'a story',
      title: 'Starry Wishes ✨',
      caption: 'A vast cosmic starry sky reflecting how limitless and glowing your future is.',
      gradient: 'from-amber-200 via-orange-200 to-rose-200',
      url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=500&q=80',
      tilt: 2,
    },
    {
      id: 5,
      label: 'a moment',
      title: 'Warm Connections 💖',
      caption: 'A glowing heart made of beautiful gold light, shining warm wishes upon your path.',
      gradient: 'from-emerald-200 via-teal-200 to-cyan-200',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80',
      tilt: -3,
    },
    {
      id: 6,
      label: 'a sparkle',
      title: 'Unforgettable Days 🌟',
      caption: 'Bright glowing star fields of laughter, magic, and sweet everlasting moments.',
      gradient: 'from-amber-300 via-yellow-200 to-emerald-100',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80',
      tilt: 4,
    },
    {
      id: 7,
      label: 'a favorite',
      title: 'Beautiful Snapshot 🌸',
      caption: 'A captured snapshot of special thoughts, laughter, and heartwarming smiles.',
      gradient: 'from-pink-300 via-fuchsia-300 to-rose-200',
      url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=500&q=80',
      tilt: -2,
    },
  ];

  return (
    <div id="gallery-container" className="max-w-4xl w-full mx-auto p-4 flex flex-col items-center select-none">
      
      {/* Scroll-reveal Header Group */}
      <motion.div
        className="text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Small cursive section header */}
        <span className="text-pink-400 font-cursive text-xl font-bold tracking-wide">
          moments
        </span>
        
        {/* Large Purple Section Header exactly matching image 3 */}
        <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-1 mb-8 tracking-tight text-center">
          A few snapshots of joy
        </h3>
      </motion.div>

      {/* Grid of Polaroid Cards (6 staggered items exactly matching Screenshot 3) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-3xl w-full">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            onClick={() => setSelectedMemory(memory)}
            className="group relative bg-zinc-900/90 p-3 rounded-2xl shadow-2xl flex flex-col items-center border border-pink-500/10 cursor-pointer origin-center hover:z-30 transition duration-300"
            style={{ rotate: `${memory.tilt}deg` }}
            whileHover={{
              scale: 1.08,
              rotate: memory.tilt * 0.4,
              y: -8,
              boxShadow: '0 20px 35px rgba(236,72,153,0.15)',
              borderColor: 'rgba(236,72,153,0.25)',
            }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: 'spring', stiffness: 240, damping: 20, delay: (memory.id % 3) * 0.08 }}
          >
            {/* White-framed square colorful photo container */}
            <div className={`relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-tr ${memory.gradient} shadow-inner flex items-center justify-center`}>
              {/* Image if available, overlayed beautifully */}
              {memory.url ? (
                <img
                  src={memory.url}
                  alt={memory.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                />
              ) : null}

              {/* Central high quality vector representation icon */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-2 z-10 opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-[10px] text-white font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1">
                  <Camera className="w-3 h-3 text-pink-400" />
                  <span>Tap to Read</span>
                </p>
              </div>

              {/* Standard vector image icon in photo field */}
              <div className="absolute top-3 right-3 bg-black/55 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-sm group-hover:rotate-12 transition">
                <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
              </div>
            </div>

            {/* Polaroid handwritten caption tag using Caves handwriting font (Screenshot 3 style) */}
            <div className="pt-4 pb-2 text-center">
              <span className="font-cursive text-2xl sm:text-3xl text-pink-100/90 font-bold tracking-wide group-hover:text-pink-400 transition">
                {memory.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Beautiful Modal Dialog for Reading Full Memory Story */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="bg-zinc-950 rounded-[32px] p-8 max-w-sm w-full border border-zinc-800/80 shadow-2xl text-center flex flex-col items-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', damping: 25, stiffness: 155 }}
            >
              {/* Styled Icon */}
              <div className="w-12 h-12 rounded-full bg-pink-950/50 border border-pink-900/40 flex items-center justify-center mb-4 text-pink-400">
                <Heart className="w-6 h-6 fill-pink-500/20" />
              </div>

              {/* Title */}
              <h4 className="text-2xl font-extrabold text-zinc-100 tracking-tight">
                {selectedMemory.title}
              </h4>
              
              {/* Cute font sublabel */}
              <span className="font-cursive text-xl font-bold text-pink-400 mt-1 italic uppercase tracking-wider block">
                {selectedMemory.label}
              </span>

              {/* Narrative body */}
              <p className="text-zinc-300 text-sm mt-4 leading-relaxed font-semibold">
                {selectedMemory.caption}
              </p>

              {/* Close Button badge */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-md shadow-pink-500/10 hover:shadow-lg transition cursor-pointer"
              >
                Close Story
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
