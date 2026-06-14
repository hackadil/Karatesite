import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame } from "lucide-react";

interface SplashLoaderProps {
  onComplete: () => void;
  key?: string;
}

export default function SplashLoader({ onComplete }: SplashLoaderProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Fill the percentage progress bar elegantly over 2.2 seconds
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 80);

    // After 2.8 seconds total, trigger completion to start the exit slide
    const timeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Split name for staggered letter reveal
  const titleLetters = "FIGHTING SPIRIT".split("");
  const subtitleLetters = "KARATE CLUB".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        opacity: 0,
        transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060709] overflow-hidden"
    >
      {/* Background Decorative Traditional Kanji "空手道" (Karate-dō) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[14rem] sm:text-[22rem] md:text-[32rem] font-serif font-black text-brand-red leading-none tracking-widest flex flex-col lg:flex-row items-center gap-0 lg:gap-12"
        >
          <span>空</span>
          <span>手</span>
          <span>道</span>
        </motion.div>
      </div>

      {/* Cinematic subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />

      {/* Radial soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Animated Badge Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
          className="w-16 h-16 border-2 border-brand-red/50 rotate-45 flex items-center justify-center bg-[#0c0d12]/90 shadow-2xl shadow-brand-red/20 mb-8"
        >
          <div className="-rotate-45">
            <Flame className="w-8 h-8 text-brand-red animate-pulse" />
          </div>
        </motion.div>

        {/* Association Sportive Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white font-medium mb-3"
        >
          Association Sportive Cotonou
        </motion.p>

        {/* Title Staggered Letter Reveal */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-[0.15em] flex justify-center mb-1 overflow-hidden select-none">
          {titleLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5 + index * 0.04,
                duration: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              style={{ display: char === " " ? "inline" : "inline-block" }}
              className={char === " " ? "w-3" : ""}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif italic text-brand-red tracking-widest flex justify-center uppercase select-none mb-10 overflow-hidden">
          {subtitleLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.1 + index * 0.04,
                duration: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              style={{ display: char === " " ? "inline" : "inline-block" }}
              className={char === " " ? "w-3" : ""}
            >
              {char}
            </motion.span>
          ))}
        </h2>

        {/* Progress line indicator and skip button wrapper */}
        <div className="w-48 sm:w-64 max-w-xs relative flex flex-col items-center">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative mb-4">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${percent}%` }}
              transition={{ ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-brand-red to-red-500 shadow-[0_0_12px_rgba(230,57,70,0.8)]"
            />
          </div>

          <div className="flex justify-between w-full text-[10px] font-mono tracking-widest text-[#D4B270]/70 uppercase">
            <span>Bushido</span>
            <span>{percent}%</span>
          </div>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-6 text-[11px] sm:text-xs font-serif italic text-neutral-400 tracking-[0.1em]"
          >
            "Oser commencer, oser terminer"
          </motion.p>

          {/* Subtle skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            whileHover={{ opacity: 0.8, color: "#E63946" }}
            onClick={onComplete}
            className="mt-8 px-4 py-1.5 border border-white/10 hover:border-brand-red/30 text-[9px] uppercase tracking-[0.25em] text-neutral-500 rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
          >
            Passer l'introduction
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
