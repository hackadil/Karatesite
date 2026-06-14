import { useState } from "react";
import { motion } from "motion/react";
import { Phone, MapPin, Send, MessageSquare, ExternalLink, CalendarDays } from "lucide-react";
import { APP_INFO } from "../data";

export default function Contact() {
  // Conversational Form States
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [level, setLevel] = useState("Débutant complet");

  // Pre-fill generator
  const getCustomWhatsAppLink = () => {
    let customText = "Bonjour, je souhaite inscrire mon enfant au karaté.";
    if (childName.trim()) {
      customText = `Bonjour, je souhaite inscrire mon enfant ${childName.trim()}`;
      if (childAge.trim()) {
        customText += ` âgé de ${childAge.trim()} ans`;
      }
      customText += ` au karaté (niveau: ${level}). Pouvons-nous avoir plus d'informations?`;
    }
    return `https://wa.me/22996995558?text=${encodeURIComponent(customText)}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] relative border-b border-white/5 japanese-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-brand-red font-serif italic text-lg tracking-wide block mb-1">
            Inscriptions & Localisation
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase font-display mt-2 relative pb-4 inline-block">
            Rejoignez l'Aventure !
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-brand-red" />
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Trouvez les coordonnées de l'association et initiez les démarches d'inscription de votre enfant en toute simplicité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Address Card & WhatsApp Builder (Left of screen) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="space-y-6 flex flex-col justify-between"
          >
            
            {/* Info Box */}
            <div className="bg-brand-card border border-brand-gray rounded-none p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-light font-display text-white uppercase mb-6 flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-brand-red" />
                Contactez-nous Directement
              </h3>

              <div className="space-y-5">
                {/* Localisation info item */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 border border-brand-gray flex items-center justify-center shrink-0 bg-black/40">
                    <MapPin className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.15em] uppercase font-bold text-brand-red font-serif mb-1 inline-block">Adresse du Dojo</span>
                    <p className="text-white font-medium text-base sm:text-lg font-display uppercase">{APP_INFO.location}</p>
                    <p className="text-neutral-400 text-xs mt-1 font-light">{APP_INFO.addressFull}</p>
                  </div>
                </div>

                {/* Telephone info item */}
                <div className="flex gap-4 items-start pt-4 border-t border-brand-gray/50">
                  <div className="w-10 h-10 border border-brand-gray flex items-center justify-center shrink-0 bg-black/40">
                    <Phone className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.15em] uppercase font-bold text-brand-red font-serif mb-1 inline-block">Secrétariat Téléphone</span>
                    <p className="text-white font-serif italic text-xl sm:text-2xl hover:text-[#D4B270] transition-colors">
                      <a href={`tel:${APP_INFO.phoneFormatted}`}>{APP_INFO.phone}</a>
                    </p>
                    <p className="text-neutral-400 text-xs mt-1.5 font-light">Cliquez pour appeler directement notre équipe de karaté.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick prefilled card */}
            <div className="bg-brand-card border border-brand-red/25 rounded-none p-6 sm:p-8 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] font-bold bg-brand-red/5 text-brand-red px-3.5 py-1.5 rounded-none border border-brand-red/20 mb-5 inline-block font-serif">
                  Générateur de message instantané
                </span>
                
                <h3 className="text-lg sm:text-xl font-light font-display text-white uppercase mb-4 tracking-wide">
                  Pré-remplir votre demande
                </h3>

                {/* Form fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1.5 font-serif">
                        Prénom de l'enfant :
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Christian"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-brand-gray font-light text-white rounded-none px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1.5 font-serif">
                        Âge de l'enfant :
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 8"
                        value={childAge}
                        onChange={(e) => setChildAge(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-brand-gray font-light text-white rounded-none px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1.5 font-serif">
                      Niveau de pratique actuel :
                    </label>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      {["Débutant complet", "Initiation de base", "Déjà pratiqué / Ceinture"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLevel(lvl)}
                          className={`px-3 py-2 rounded-none border text-[10px] transition-all cursor-pointer font-serif uppercase tracking-wider ${
                            level === lvl
                              ? "bg-brand-red/5 border-brand-red text-brand-red font-bold"
                              : "bg-black/40 border-brand-gray text-neutral-400 hover:text-white"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ready message display */}
              <div className="mt-8 pt-5 border-t border-brand-gray">
                <div className="bg-black/20 p-4 rounded-none border border-brand-gray text-xs text-neutral-400 flex items-start gap-2.5 mb-4 font-light leading-relaxed">
                  <Send className="w-4 h-4 text-brand-red shrink-0 mt-0.5 animate-pulse" />
                  <p className="leading-relaxed italic font-serif">
                    "Chris, {childAge || "X"} ans, {level}..." - Un message de demande sera généré sur votre mobile.
                  </p>
                </div>

                <a
                  href={getCustomWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 text-center rounded-none bg-brand-red hover:bg-[#D4B270] text-black font-bold uppercase tracking-[0.2em] text-xs justify-center transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-black" />
                  Envoyer ma demande par WhatsApp
                </a>
              </div>
            </div>

          </motion.div>

          {/* Maps embed Container card (Right of screen) */}
          <motion.div
            id="adresse"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="bg-brand-card border border-brand-gray rounded-none p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-light font-display text-white uppercase mb-2 flex items-center gap-2.5">
                <CalendarDays className="w-5 h-5 text-brand-red" />
                Dojo de Sowéto (Cotonou)
              </h3>
              <p className="text-neutral-450 text-xs sm:text-sm font-light leading-relaxed mb-6">
                Le club se réunit deux fois par semaine au sein du célèbre <strong>Centre Sportif Sowéto</strong>.
              </p>
            </div>

            {/* Styled map Iframe with exact coordinates */}
            <div className="relative rounded-none overflow-hidden border border-brand-gray h-72 sm:h-96 md:h-[400px]">
              <iframe
                title="Google Maps - Centre Sportif Sowéto"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1742553709582!2d2.4420215999999897!3d6.371490500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023553d14e33fa9%3A0xce7c4f4a58ee590b!2sCentre%20sportif%20Sow%C3%A9to!5e0!3m2!1sfr!2sbj!4v1776103409324!5m2!1sfr!2sbj"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Maps Link Trigger Overlay */}
              <a
                href="https://maps.google.com/?q=Centre+sportif+Soweto+Cotonou"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-brand-dark/95 backdrop-blur-md hover:bg-brand-red border border-brand-gray text-white text-[9px] uppercase tracking-[0.2em] font-bold px-3.5 py-1.5 rounded-none inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer font-serif"
              >
                <span>Ouvrir dans Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-red" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
