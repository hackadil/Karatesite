import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, Lock, Eye, Check } from "lucide-react";
import { APP_INFO } from "../data";

interface MentionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MentionsModal({ isOpen, onClose }: MentionsModalProps) {
  const [activeTab, setActiveTab] = useState<"mentions" | "cookies">("mentions");
  
  // Local preference states
  const [cookiesChoice, setCookiesChoice] = useState({
    essential: true,
    analytics: false,
    whatsapp: true,
  });

  useEffect(() => {
    if (isOpen) {
      const storedChoice = localStorage.getItem("cookiesChoice");
      if (storedChoice) {
        try {
          setCookiesChoice(JSON.parse(storedChoice));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const saveSettings = () => {
    localStorage.setItem("cookiesChoice", JSON.stringify(cookiesChoice));
    localStorage.setItem("cookiesAccepted", "true");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
        />

        {/* Modal body sheet */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl bg-brand-card border border-brand-gray/60 rounded-3xl p-6 shadow-2xl z-20 max-h-[85vh] flex flex-col justify-between overflow-hidden"
        >
          {/* Header row */}
          <div>
            <div className="flex justify-between items-center border-b border-brand-gray/50 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-brand-red" />
                <h3 className="text-xl font-bold font-display text-white tracking-wide">
                  Espace Règlementation & Politique
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-brand-red p-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Swappers */}
            <div className="flex border-b border-brand-gray/50 mb-6 uppercase tracking-wider text-xs font-bold gap-4">
              <button
                onClick={() => setActiveTab("mentions")}
                className={`pb-3 border-b-2 transition-all cursor-pointer ${
                  activeTab === "mentions"
                    ? "border-brand-red text-white"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                Mentions Légales
              </button>
              <button
                onClick={() => setActiveTab("cookies")}
                className={`pb-3 border-b-2 transition-all cursor-pointer ${
                  activeTab === "cookies"
                    ? "border-brand-red text-white"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                Paramétres des Cookies
              </button>
            </div>
          </div>

          {/* Scrolling Content sheet */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm text-neutral-300 font-light leading-relaxed mb-6">
            {activeTab === "mentions" ? (
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-white text-base mb-2">
                    1. Informations Éditeur
                  </h4>
                  <p>
                    L'application web est publiée par l'<strong>Association sportive Fighting spirit karaté club</strong>, enregistrée à Cotonou, Soweto, Bénin.
                  </p>
                  <p className="mt-1">
                    <strong>Directeur de publication :</strong> Maître Aballo (Arbitre Continental & Instructeur).
                  </p>
                  <p className="mt-1">
                    <strong>Contact :</strong> +229 96 99 55 58.
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-white text-base mb-2">
                    2. Hébergement & Système
                  </h4>
                  <p>
                    Ce site web est hébergé en environnement infonuagique sécurisé sur les serveurs de Netlify et GitHub Pages. Le service de build compile le code front-end de l'applet de manière performante.
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-white text-base mb-2">
                    3. Propriété Intellectuelle
                  </h4>
                  <p>
                    Tous les logos originaux, les textes et les données d'entraînements de Maître Aballo sont protégés au titre des droits d'auteur. Les photos des élèves publiées dans la galerie ont fait l'objet d'autorisations familiales préalables.
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-white text-base mb-2">
                    4. Politique de Confidentialité
                  </h4>
                  <p>
                    Aucun formulaire d'inscription ne stocke de données nominatives sur nos serveurs. L'utilisateur utilise des liens WhatsApp sécurisés pour des communications directes cryptées d'appareils à appareils, garantissant une vie privée maximale à votre enfant.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-neutral-400">
                  Nous respectons les directives européennes (RGPD / CNIL) et africaines pour la protection des données personnelles. Choisissez vos consentements ci-dessous :
                </p>

                {/* Cookie toggles item list */}
                <div className="space-y-3.5 mt-4">
                  
                  {/* Essential item */}
                  <div className="flex items-start justify-between p-3.5 bg-brand-gray/40 rounded-xl border border-brand-gray/60">
                    <div>
                      <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-brand-red" />
                        Cookies Techniques requis (Essentiels)
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 font-light">
                        Indispensable pour retenir votre choix cookies d'une visite à l'autre et mémoriser l'état du calculateur de tarifs.
                      </p>
                    </div>
                    <div className="text-[10px] uppercase font-bold text-neutral-500 font-mono py-1 px-2.5 rounded-full bg-neutral-800">
                      Activé d'office
                    </div>
                  </div>

                  {/* WhatsApp sync cookie item */}
                  <div className="flex items-start justify-between p-3.5 bg-brand-gray/40 rounded-xl border border-brand-gray/60">
                    <div>
                      <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-brand-red" />
                        Cookies de liaison externe (WhatsApp / Facebook)
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 font-light">
                        Mémorise les données du générateur de demandes pour éviter de tout saisir à chaque reconnexion.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiesChoice.whatsapp}
                      onChange={(e) =>
                        setCookiesChoice({ ...cookiesChoice, whatsapp: e.target.checked })
                      }
                      className="accent-brand-red w-4 h-4 cursor-pointer self-center"
                    />
                  </div>

                  {/* Analytics cookie item */}
                  <div className="flex items-start justify-between p-3.5 bg-brand-gray/40 rounded-xl border border-brand-gray/60">
                    <div>
                      <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-brand-red" />
                        Cookies Statistiques d'audience anonymes
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 font-light">
                        Compte le nombre de visiteurs uniques mensuels sur la plateforme d'informations de Sowéto.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiesChoice.analytics}
                      onChange={(e) =>
                        setCookiesChoice({ ...cookiesChoice, analytics: e.target.checked })
                      }
                      className="accent-brand-red w-4 h-4 cursor-pointer self-center"
                    />
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-brand-gray/50 pt-4 flex gap-3 flex-col sm:flex-row justify-end text-xs uppercase tracking-wider font-bold">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
            >
              Fermer la fenêtre
            </button>
            <button
              onClick={saveSettings}
              className="px-5 py-3 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Souvegarder mes Choix
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
