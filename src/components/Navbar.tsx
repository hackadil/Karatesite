import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Flame } from "lucide-react";
import { APP_INFO, IMAGES } from "../data";
import ImageWithFallback from "./ImageWithFallback";

interface NavbarProps {
  onOpenMentions: () => void;
}

export default function Navbar({ onOpenMentions }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link tracker on scroll
      const sections = ["hero", "activites", "apropos", "horaires", "adresse", "contact"];
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "hero" },
    { label: "Activités", href: "activites" },
    { label: "Dojo & Enseignants", href: "apropos" },
    { label: "Horaires", href: "horaires" },
    { label: "Adresse", href: "adresse" },
    { label: "Contact", href: "contact" },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-dark/95 backdrop-blur-md py-3 shadow-lg border-b border-white/5"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & title brand */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-4 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 border-2 border-brand-red rotate-45 flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-brand-dark">
              <div className="-rotate-45 w-7 h-7 overflow-hidden rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm">
                <ImageWithFallback
                  src={IMAGES.logo}
                  fallbackSrc={IMAGES.logoFallback}
                  alt="Logo Club de Karaté"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display font-medium tracking-widest text-[9px] uppercase opacity-70">
                Association Sportive
              </span>
              <span className="font-display font-bold text-sm sm:text-base text-white tracking-wider flex items-center gap-1.5 leading-tight">
                Fighting Spirit{" "}
                <span className="text-brand-red font-semibold font-serif italic">Karate Club</span>
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isLinkActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`relative text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer hover:text-white focus:outline-none ${
                      isLinkActive ? "text-brand-red font-semibold" : "text-neutral-400"
                    }`}
                  >
                    {link.label}
                    {isLinkActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <a
              href={APP_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-brand-red hover:bg-brand-red-hover rounded-full transition-all duration-300 shadow-md shadow-brand-red/20 inline-flex items-center gap-2"
            >
              <Flame className="w-3.5 h-3.5 text-white animate-pulse" />
              Rejoindre le club
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-brand-red transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-30 md:hidden flex flex-col justify-center"
          >
            <div className="px-6 py-12 flex flex-col gap-8 text-center">
              {navLinks.map((link, idx) => {
                const isLinkActive = activeSection === link.href;
                return (
                  <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`font-display text-2xl font-bold tracking-wider hover:text-brand-red transition-all cursor-pointer ${
                      isLinkActive ? "text-brand-red" : "text-white"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex flex-col gap-4 items-center"
              >
                <a
                  href={APP_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs py-3 text-sm font-semibold uppercase tracking-wider text-white bg-brand-red hover:bg-brand-red-hover rounded-full shadow-lg shadow-brand-red/30 inline-flex justify-center items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  Inscription WhatsApp
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenMentions();
                  }}
                  className="text-xs text-neutral-400 hover:text-brand-red underline mt-4"
                >
                  Mentions légales et Cookies
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
