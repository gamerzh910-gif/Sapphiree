import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Camera, Trash2, Upload } from 'lucide-react';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=650&q=80';

export const MemoryPolaroid: React.FC = () => {
  const [photo, setPhoto] = useState<string>(DEFAULT_IMAGE);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedPhoto = localStorage.getItem('birthday_polaroid_photo');
    if (savedPhoto) {
      setPhoto(savedPhoto);
      setIsCustom(true);
    }
  }, []);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhoto(base64String);
        setIsCustom(true);
        localStorage.setItem('birthday_polaroid_photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhoto(DEFAULT_IMAGE);
    setIsCustom(false);
    localStorage.removeItem('birthday_polaroid_photo');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      id="sweet-polaroid-container"
      className="relative flex flex-col items-center mt-6 select-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Handcrafted Washi Tape at the top */}
      <div 
        id="polaroid-washi-tape"
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-500/15 border-x border-dashed border-pink-500/30 shadow-[0_1px_5px_rgba(244,63,94,0.08)] backdrop-blur-[2px] rotate-[-2deg] z-10 font-sans"
      />

      {/* Polaroid card body */}
      <motion.div
        id="polaroid-card-frame"
        className="w-[280px] sm:w-[310px] bg-zinc-950/90 border border-zinc-800/60 p-4 pb-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden"
        whileHover={{ 
          scale: 1.04, 
          rotate: 1,
          boxShadow: '0 25px 60px rgba(236, 72, 153, 0.15)'
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Subtle decorative color aura background the polaroid photo */}
        <div className="absolute -inset-10 bg-radial from-pink-500/5 to-transparent pointer-events-none" />

        {/* Elegant top pin or details */}
        <div className="flex justify-between items-center mb-3.5 px-0.5">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-zinc-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
            cherished moment
          </span>
          <div className="flex items-center gap-2">
            {isCustom && (
              <button
                id="reset-photo-btn"
                onClick={handleReset}
                title="Reset default photo"
                className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10 hover:scale-125 transition-transform cursor-pointer" />
          </div>
        </div>

        {/* The beautiful image container */}
        <div 
          id="polaroid-photo-box" 
          onClick={handleContainerClick}
          className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/50 group cursor-pointer"
          title="Click to upload your own picture!"
        >
          <img
            src={photo}
            alt="Sunset Moment"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          
          {/* Default hover uploading overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-zinc-200">
            <Camera className="w-6 h-6 text-pink-400 animate-bounce" />
            <span className="text-[11px] font-sans font-bold tracking-wider">
              {isCustom ? 'Change Photo' : 'Upload Your Photo'}
            </span>
          </div>

          {!isCustom && (
            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-pink-500/90 text-white text-[8px] font-bold tracking-wider uppercase animate-pulse flex items-center gap-1">
              <Upload className="w-2.5 h-2.5" /> Put Your Pic Here!
            </div>
          )}

          {/* Bottom vignette gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
          
          {/* Aesthetic mini absolute tag */}
          <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded bg-zinc-950/80 border border-zinc-800/50 text-[9px] font-mono text-pink-400 tracking-wider">
            FOREVER 💖
          </div>
        </div>

        {/* Polaroid bottom caption area */}
        <div className="mt-4 flex flex-col items-center text-center">
          <span className="font-cursive text-lg sm:text-xl text-pink-300 tracking-wide select-none">
            giving you a daisy
          </span>
          <p className="text-[10px] text-zinc-500 font-sans tracking-wide mt-1 mx-2 select-text">
            "A special golden hour spark that never fades"
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
};
