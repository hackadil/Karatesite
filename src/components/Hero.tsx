import { motion } from "motion/react";
import { Flame, Shield, Users, CircleAlert } from "lucide-react";
import { APP_INFO, IMAGES } from "../data";
import ImageWithFallback from "./ImageWithFallback";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center py-20 px-4 overflow-hidden japanese-grid">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={IMAGES.heroBg}
          fallbackSrc={IMAGES.heroBgFallback}
          alt="Karate Action Hero Background"
          className="w-full h-full scale-102 hover:scale-105 transition-transform duration-[12000ms] ease-out select-none pointer-events-none opacity-40 md:opacity-50"
        />
        {/* Layer of shadows & high contrast gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-transparent to-[#0A0A0A]/40 z-10" />
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[11rem] sm:text-[18rem] md:text-[26rem] font-serif opacity-[0.03] pointer-events-none text-brand-red select-none z-10 leading-none tracking-widest uppercase">
        空手
      </div>

      {/* Decorative Traditional Grid Lines or Japanese Motif */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-20 max-w-5xl mx-auto text-center mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 px-5 py-2 border border-brand-red/30 text-brand-red text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-2.5 bg-brand-red/5"
          >
            <Shield className="w-4 h-4 animate-pulse text-brand-red" />
            DOJO AGREE COTONOU - SOWETO
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tight text-white leading-[1.1] font-display max-w-4xl uppercase"
          >
            Fighting Spirit <br className="hidden sm:inline" />
            <span className="text-brand-red font-serif italic font-light tracking-wide block mt-2 sm:mt-4">
              Karaté Club
            </span>
          </motion.h1>

          {/* Devise banner */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-neutral-400 font-serif italic text-base sm:text-lg md:text-2xl font-light tracking-[0.1em] flex items-center gap-2 sm:gap-4 justify-center"
          >
            <span>{APP_INFO.devise.start}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
            <span>{APP_INFO.devise.end}</span>
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed px-4"
          >
            Développez votre corps et votre force de caractère avec le karaté Shotokan traditionnel. 
            Des cours de haute qualité dispensés sous l'autorité d'instructeurs émérites et passionnés.
          </motion.p>

          {/* Quick Stats Grid Overlay */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl px-4"
          >
            {[
              { label: "Directeur technique", val: "3e Dan" },
              { label: "Séance / Semaine", val: "Mercredi & Samedi" },
              { label: "Frais d'adhésion", val: "5000 F CFA" },
              { label: "Mensualité équivalente", val: "3333 F CFA" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-brand-card/35 backdrop-blur-md px-4 py-4 border border-brand-red/10 text-center premium-border-hover transition-all group"
              >
                <div className="text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors uppercase font-semibold tracking-widest">
                  {stat.label}
                </div>
                <div className="text-base sm:text-lg font-bold text-white tracking-wide mt-2 group-hover:text-brand-red transition-colors font-display">
                  {stat.val}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-5 items-center justify-center w-full max-w-md px-4"
          >
            <a
              href={APP_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-brand-red hover:bg-[#D4B270] text-black font-bold uppercase tracking-[0.2em] text-xs transition-colors duration-300 inline-flex items-center justify-center gap-2.5"
            >
              <Flame className="w-4 h-4" />
              Inscrire mon enfant
            </a>

            <button
              onClick={() => scrollToSection("activites")}
              className="w-full sm:w-auto px-10 py-4 bg-transparent hover:bg-white hover:text-black text-white font-bold uppercase tracking-[0.2em] text-xs border border-white/20 transition-colors duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              Nos activités
            </button>
          </motion.div>

          {/* Scroll feedback guide widget */}
          <motion.button
            variants={itemVariants}
            onClick={() => scrollToSection("activites")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors group focus:outline-none cursor-pointer"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Découvrir</span>
            <div className="w-6 h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center p-1 group-hover:border-white transition-colors">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-brand-red rounded-full"
              />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
