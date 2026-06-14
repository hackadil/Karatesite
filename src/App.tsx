import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Activities from "./components/Activities";
import About from "./components/About";
import Horaires from "./components/Horaires";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GalleryModal from "./components/GalleryModal";
import MentionsModal from "./components/MentionsModal";
import CookieBanner from "./components/CookieBanner";
import SplashLoader from "./components/SplashLoader";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  // Gallery and Mentions modal display states
  const [activeGalleryKey, setActiveGalleryKey] = useState<"cours" | "competitions" | null>(null);
  const [isMentionsOpen, setIsMentionsOpen] = useState(false);

  const handleSelectGallery = (key: "cours" | "competitions") => {
    setActiveGalleryKey(key);
  };

  const handleCloseGallery = () => {
    setActiveGalleryKey(null);
  };

  const handleOpenMentions = () => {
    setIsMentionsOpen(true);
  };

  const handleCloseMentions = () => {
    setIsMentionsOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-[#f5f5f7] selection:bg-brand-red selection:text-white overflow-hidden font-sans">
      {/* Cinematic Splash Screen Introduction */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashLoader key="loader" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Dynamic Background Noise Overlay for cinematic feel */}
      <div className="absolute inset-0 bg-repeat bg-[url('images/bg-texture.png')] opacity-5 pointer-events-none z-30" />
      
      {/* Core navigation header */}
      <Navbar onOpenMentions={handleOpenMentions} />

      {/* Main content body wraps */}
      <main className="relative">
        <Hero />
        <Activities onSelectCategory={handleSelectGallery} />
        <About />
        <Horaires />
        <Contact />
      </main>

      {/* Footer copyright */}
      <Footer onOpenMentions={handleOpenMentions} />

      {/* Lightbox photo galleries Modal */}
      <GalleryModal
        isOpen={activeGalleryKey !== null}
        categoryKey={activeGalleryKey}
        onClose={handleCloseGallery}
      />

      {/* General disclosures and regulations Modal */}
      <MentionsModal
        isOpen={isMentionsOpen}
        onClose={handleCloseMentions}
      />

      {/* Persistent Cookie consent manager banner */}
      <CookieBanner />
    </div>
  );
}
