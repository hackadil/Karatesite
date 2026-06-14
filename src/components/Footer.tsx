import { Eye, ShieldAlert, Facebook } from "lucide-react";
import { APP_INFO } from "../data";

interface FooterProps {
  onOpenMentions: () => void;
}

export default function Footer({ onOpenMentions }: FooterProps) {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-12 px-4 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        
        {/* Brand signature details */}
        <div className="text-center md:text-left">
          <div className="font-serif font-light text-white text-base tracking-[0.15em] uppercase">
            Fighting Spirit <span className="text-brand-red font-serif italic text-sm">Karate Club</span>
          </div>
          <p className="text-neutral-500 text-xs mt-1.5 font-light">
            © {currentYear} Association Sportive Fighting Spirit Karaté Club - Cotonou. Tous droits réservés.
          </p>
          <p className="text-[10px] text-neutral-600 font-light mt-0.5">
            Dōjō agréé pour l'enseignement du karaté pour adolescents, enfants et adultes à Sowéto.
          </p>
        </div>

        {/* Social communities links */}
        <div className="flex items-center gap-4">
          <a
            href={APP_INFO.facebookGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-none bg-black/40 border border-brand-gray text-neutral-400 hover:text-brand-red hover:border-brand-red flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Rejoindre sur Facebook"
          >
            <Facebook className="w-4 h-4 fill-current" />
          </a>
          <span className="text-xs text-neutral-400 hidden sm:inline font-serif italic">Rejoindre la communauté Facebook</span>
        </div>

        {/* Legal policies triggers */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-neutral-400 font-serif">
          <button
            onClick={scrollToTop}
            className="hover:text-brand-red transition-all cursor-pointer underline decoration-dotted"
          >
            Haut de page ↑
          </button>
          
          <button
            onClick={onOpenMentions}
            className="hover:text-brand-red transition-all cursor-pointer inline-flex items-center gap-1.5 text-center"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Mentions Légales
          </button>

          <button
            onClick={onOpenMentions}
            className="hover:text-brand-red transition-all cursor-pointer inline-flex items-center gap-1.5 text-center"
          >
            <Eye className="w-3.5 h-3.5" />
            Gestion des Cookies
          </button>
        </div>

      </div>
    </footer>
  );
}
