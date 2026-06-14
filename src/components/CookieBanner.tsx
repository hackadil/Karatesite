import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ShieldAlert } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local preferences
    const consent = localStorage.getItem("cookiesAccepted");
    if (!consent) {
      // 1000ms delay before prompting cookie banner, matching index.html script exactly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    
    // Set typical choices
    const defaultChoices = {
      essential: true,
      analytics: true,
      whatsapp: true,
    };
    localStorage.setItem("cookiesChoice", JSON.stringify(defaultChoices));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    
    const defaultChoices = {
      essential: true,
      analytics: false,
      whatsapp: false,
    };
    localStorage.setItem("cookiesChoice", JSON.stringify(defaultChoices));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-0 inset-x-0 z-40 bg-[#141519]/95 backdrop-blur-md border-t border-brand-gray/60 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl"
        >
          {/* Notification message */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-full bg-brand-red/10 border border-brand-red/25 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-brand-red" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
              🍪 <strong>Cookie du Dojo :</strong> Ce site utilise des petits cookies techniques pour mémoriser vos préférences et vos calculs de budget d'inscription. En continuant votre visite, vous acceptez leur utilisation pour un confort optimal.
            </p>
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center uppercase tracking-wider text-[10px] font-bold">
            <button
              onClick={handleDecline}
              className="px-4 py-2 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer w-1/2 md:w-auto text-center font-semibold"
            >
              Refuser
            </button>

            <button
              onClick={handleAccept}
              className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg transition-all transform hover:scale-103 cursor-pointer w-1/2 md:w-auto text-center inline-flex items-center justify-center gap-1.5 font-bold"
            >
              <Check className="w-4 h-4" />
              Accepter
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
