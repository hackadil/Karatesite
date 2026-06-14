import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Camera, Library, Info } from "lucide-react";
import { GALLERY_DATA } from "../data";
import ImageWithFallback from "./ImageWithFallback";

interface GalleryModalProps {
  isOpen: boolean;
  categoryKey: "cours" | "competitions" | null;
  onClose: () => void;
}

const FALLBACK_GALLERY_IMAGES = {
  cours: [
    "https://images.unsplash.com/photo-1517438476312-10d79c07750d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1471922687909-617c65f44e8c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  ],
  competitions: [
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517438476312-10d79c07750d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1471922687909-617c65f44e8c?auto=format&fit=crop&q=80&w=800"
  ]
};

export default function GalleryModal({ isOpen, categoryKey, onClose }: GalleryModalProps) {
  const [currentKey, setCurrentKey] = useState<"cours" | "competitions">("cours");
  const [index, setIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Sync category on open
  useEffect(() => {
    if (categoryKey) {
      setCurrentKey(categoryKey);
      setIndex(0);
    }
  }, [categoryKey, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, index, currentKey]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeCategory = GALLERY_DATA[currentKey];
  const imagesList = activeCategory.images;
  const fallbacksList = FALLBACK_GALLERY_IMAGES[currentKey];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const selectCategory = (key: "cours" | "competitions") => {
    setCurrentKey(key);
    setIndex(0);
  };

  // Touch Swipe Handlers for Mobile Scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // pixels
    if (distance > minSwipeDistance) {
      handleNext(); // Swipe left to right -> Next image
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // Swipe right to left -> Prev image
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
        />

        {/* Modal body container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-5xl bg-[#141519] border border-brand-gray/60 rounded-3xl p-4 sm:p-6 shadow-2xl z-10 overflow-hidden"
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-brand-gray/50 pb-4 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-brand-red animate-pulse" />
              <div>
                <span className="text-[10px] tracking-widest text-brand-red uppercase font-black">
                  Galerie Photos Dojo
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide">
                  {currentKey === "cours" ? "Cours d'Entraînement " : "Stages & Compétitions"} ({index + 1}/{imagesList.length})
                </h3>
              </div>
            </div>

            {/* Segment Controls (Switch directly inside gallery) */}
            <div className="flex bg-brand-gray/50 border border-brand-gray/60 rounded-full p-1 self-stretch sm:self-auto uppercase tracking-wider text-[10px] font-bold">
              <button
                onClick={() => selectCategory("cours")}
                className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
                  currentKey === "cours"
                    ? "bg-brand-red text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Cours
              </button>
              <button
                onClick={() => selectCategory("competitions")}
                className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
                  currentKey === "competitions"
                    ? "bg-brand-red text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                stages & tournois
              </button>
            </div>

            {/* Close button absolute top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-brand-red p-2 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Fermer la galerie"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main big display with previous / next controls */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative h-64 sm:h-96 md:h-[450px] w-full flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden group"
          >
            {/* Navig Left */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-brand-red/80 hover:bg-brand-red text-white border border-brand-red/20 flex items-center justify-center cursor-pointer select-none opacity-80 hover:opacity-100 transition-all shadow-md group-hover:scale-105"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            {/* Display slide content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentKey}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full p-1 cursor-pointer"
                onClick={handleNext}
              >
                <ImageWithFallback
                  src={imagesList[index]}
                  fallbackSrc={fallbacksList[index]}
                  alt={`Photo de l'album ${activeCategory.title}`}
                  className="w-full h-full brightness-110 contrast-102 select-none"
                  objectFit="contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navig Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-brand-red/80 hover:bg-brand-red text-white border border-brand-red/20 flex items-center justify-center cursor-pointer select-none opacity-80 hover:opacity-100 transition-all shadow-md group-hover:scale-105"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>

            {/* Touch Slide indicator banner */}
            <div className="absolute bottom-4 inset-x-0 hidden sm:flex items-center justify-center">
              <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] tracking-wide flex items-center gap-2">
                <Library className="w-3.5 h-3.5 text-brand-red" />
                <span>Cliquez sur l'image ou utilisez les flèches du clavier / balayage pour naviguer</span>
              </div>
            </div>
          </div>

          {/* Thumbnail preview stream scroll */}
          <div className="flex gap-2.5 justify-start sm:justify-center items-center overflow-x-auto mt-6 pb-2 select-none max-w-full px-2">
            {imagesList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`relative w-16 sm:w-20 h-12 sm:h-16 rounded-xl border-2 overflow-hidden transition-all duration-300 shrink-0 cursor-pointer ${
                  index === idx
                    ? "border-brand-red scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <ImageWithFallback
                  src={img}
                  fallbackSrc={fallbacksList[idx]}
                  alt="Vignette miniature"
                  className="w-full h-full"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
