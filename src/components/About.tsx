import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Award, Sparkles, Receipt, Calculator, ChevronRight, Check } from "lucide-react";
import { DOJOS_VALUES, SENSEI, RATES, APP_INFO, IMAGES } from "../data";
import ImageWithFallback from "./ImageWithFallback";

export default function About() {
  // Calculator states
  const [cotisationTerm, setCotisationTerm] = useState<number>(3); // 3, 6, 12 months
  const [includeKimono, setIncludeKimono] = useState<boolean>(true);
  const [includeAdhesion, setIncludeAdhesion] = useState<boolean>(true);

  // Constants
  const ADHESION_PRICE = 5000;
  const TRIMESTRE_PRICE = 10000;
  const KIMONO_PRICE = 5000;

  // Calcul totals
  const getCalculatedTotal = () => {
    let total = 0;
    if (includeAdhesion) total += ADHESION_PRICE;
    
    // Convert months to quarter rate
    const quarters = cotisationTerm / 3;
    total += quarters * TRIMESTRE_PRICE;

    if (includeKimono) total += KIMONO_PRICE;

    return total;
  };

  return (
    <section id="apropos" className="py-24 bg-[#0A0A0A] relative border-t border-b border-white/5 japanese-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-brand-red font-serif italic text-lg tracking-wide block mb-1">
            Tradition, Esprit et Discipline
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase font-display mt-2 relative pb-4 inline-block">
            Philosophie du Dojo & Tarifs
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-brand-red" />
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Un apprentissage ancré dans les valeurs morales et physiques traditionnelles du Karaté Shotokan.
          </p>
        </motion.div>

        {/* Philosophy & Devise Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
          className="bg-brand-card p-6 sm:p-10 rounded-none border border-brand-gray mb-16 relative overflow-hidden"
        >
          {/* Decorative martial elements or vectors */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-brand-red/5 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-light font-display text-white mb-4 uppercase flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-red" />
                Notre Mission & Philosophie
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                {APP_INFO.philosophie} Nous entraînons le corps pour fortifier l'esprit. Notre dōjō cultive le dépassement de soi, la discipline personnelle et le respect d'autrui dans un cadre rigoureux mais bienveillant.
              </p>
              
              <div className="mt-8 p-6 rounded-none bg-black/40 border-l border-brand-red">
                <div className="text-[10px] uppercase text-brand-red font-semibold tracking-widest">Nid de l'âme — Devise du Club</div>
                <div className="text-lg sm:text-xl font-light text-white font-serif italic mt-2 tracking-wide">
                  "{APP_INFO.devise.start} — {APP_INFO.devise.end}"
                </div>
              </div>
            </div>

            {/* Dojo Values List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DOJOS_VALUES.map((val, idx) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-black/20 border border-brand-gray p-5 rounded-none hover:border-brand-red/30 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-medium text-white text-base group-hover:text-brand-red transition-colors uppercase">
                      {val.title}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-brand-red font-serif px-2 py-0.5 rounded-none bg-brand-red/5 border border-brand-red/20">
                      {val.subtitle}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs mt-3 font-light leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sensei Profile & Rates Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          
          {/* Sensei Card (1/3 of the screen) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="lg:col-span-1 bg-brand-card border border-brand-gray rounded-none p-6 text-center relative overflow-hidden group"
          >
            
            <div className="w-32 h-32 mx-auto border-2 border-brand-red rotate-45 flex items-center justify-center p-1 bg-brand-dark mb-8 mt-4 overflow-hidden transition-all duration-300 group-hover:scale-105">
              <div className="-rotate-45 w-24 h-24 overflow-hidden rounded-full">
                <ImageWithFallback
                  src={SENSEI.photo}
                  fallbackSrc={IMAGES.senseiFallback}
                  alt={SENSEI.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>

            <span className="text-[10px] tracking-[0.2em] font-bold text-brand-red uppercase px-3.5 py-1.5 bg-brand-red/5 border border-brand-red/25">
              {SENSEI.dan}
            </span>

            <h3 className="font-display font-medium text-2xl text-white mt-5 tracking-wide uppercase">
              {SENSEI.name}
            </h3>
            <p className="text-neutral-400 text-xs font-light mt-1.5 uppercase tracking-widest font-serif italic text-brand-red">
              {SENSEI.title}
            </p>

            <div className="h-px bg-brand-gray my-6" />

            <div className="space-y-4 text-left text-xs text-neutral-300">
              <div className="flex gap-2.5 items-start">
                <Award className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Affiliation Nationale :</strong> <span className="text-neutral-400 font-light">{SENSEI.federation}</span>
                </p>
              </div>

              <div className="flex gap-2.5 items-start">
                <Shield className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Statut Continental :</strong> <span className="text-neutral-400 font-light">{SENSEI.referee}</span>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-brand-gray">
              <p className="text-[11px] text-neutral-400 italic font-serif leading-relaxed">
                "Un enseignement rigoureux pour guider l'élève vers le sommet de sa concentration."
              </p>
            </div>
          </motion.div>

          {/* Rates Table (2/3 of the screen) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="lg:col-span-2 space-y-8"
          >
            
            {/* Rates table card */}
            <div className="bg-brand-card border border-brand-gray rounded-none p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-light font-display text-white mb-6 uppercase flex items-center gap-2 tracking-wide">
                <Receipt className="w-5 h-5 text-brand-red" />
                Tableau des Tarifs du Club
              </h3>

              <div className="space-y-4">
                {RATES.map((rate) => (
                  <div
                    key={rate.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-none bg-black/15 border border-brand-gray/80 hover:border-brand-red/35 transition-colors gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-medium text-white text-base uppercase">
                          {rate.name}
                        </span>
                        {rate.required ? (
                          <span className="text-[9px] uppercase font-bold tracking-widest bg-brand-red/5 border border-brand-red/20 text-brand-red px-2.5 py-0.5 rounded-none font-serif">
                            Obligatoire
                          </span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold tracking-widest bg-neutral-900 border border-neutral-800 text-neutral-400 px-2.5 py-0.5 rounded-none font-serif">
                            Optionnel
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-400 text-xs mt-1.5 font-light">
                        {rate.description}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <div className="text-lg sm:text-xl font-semibold text-white font-display tracking-wide">
                        {rate.price.toLocaleString("fr-FR")} F CFA
                      </div>
                      {rate.period && (
                        <div className="text-[9px] text-neutral-500 uppercase font-mono tracking-widest mt-0.5">
                          {rate.period}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Calculator Widget (Unique feature visualizer) */}
            <div className="bg-brand-card border border-brand-red/25 rounded-none p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 py-1.5 px-4 bg-brand-red text-black text-[9px] font-bold uppercase tracking-[0.2em]">
                Simulateur Interactif
              </div>

              <h3 className="text-lg sm:text-xl font-light font-display text-white uppercase mb-4 flex items-center gap-2 tracking-wide">
                <Calculator className="w-5 h-5 text-brand-red" />
                Estimer mon Budget d'Inscription
              </h3>
              
              <p className="text-xs text-neutral-400 font-light mb-6">
                Cochez vos options et choisissez une période pour calculer instantanément les frais initiaux à payer au Dojo de Sowéto.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-brand-gray">
                {/* Options toggle form */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group text-sm text-neutral-200">
                    <input
                      type="checkbox"
                      checked={includeAdhesion}
                      onChange={(e) => setIncludeAdhesion(e.target.checked)}
                      className="accent-brand-red w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-white group-hover:text-brand-red transition-all">
                        Frais d'adhésion uniques (+5 000 F)
                      </span>
                      <p className="text-[10px] text-neutral-500">Payé uniquement le premier jour.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group text-sm text-neutral-200">
                    <input
                      type="checkbox"
                      checked={includeKimono}
                      onChange={(e) => setIncludeKimono(e.target.checked)}
                      className="accent-brand-red w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-white group-hover:text-brand-red transition-all">
                        Acheter le Kimono officiel (+5 000 F)
                      </span>
                      <p className="text-[10px] text-neutral-500">Si vous n'en possédez pas déjà un.</p>
                    </div>
                  </label>
                </div>

                {/* Term Select */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-450 font-semibold mb-2">
                    Durée de la cotisation de départ :
                  </label>
                  <select
                    value={cotisationTerm}
                    onChange={(e) => setCotisationTerm(Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-brand-gray text-white rounded-none px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-red cursor-pointer"
                  >
                    <option value={3}>1 Trimestre (3 mois) — 10 000 F CFA</option>
                    <option value={6}>2 Trimestres (6 mois) — 20 000 F CFA</option>
                    <option value={12}>1 An complet (12 mois) — 40 000 F CFA</option>
                  </select>
                  <p className="text-[10px] text-neutral-500 mt-2 leading-relaxed">
                    La cotisation se règle par trimestre au dōjō.
                  </p>
                </div>
              </div>

              {/* Calculated results */}
              <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="text-[10px] uppercase text-neutral-400 font-semibold tracking-widest bg-brand-red/5 px-2.5 py-1 inline-block border border-brand-red/10">
                    Total initial estimé
                  </div>
                  <div className="text-3xl font-extrabold text-white font-display mt-2.5 tracking-wide flex items-baseline gap-1">
                    {getCalculatedTotal().toLocaleString("fr-FR")}{" "}
                    <span className="text-brand-red text-sm font-bold">F CFA</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1 italic leading-relaxed">
                    * {includeAdhesion ? "Inscription comprise" : "Sans inscription"} • {cotisationTerm} mois de cours{" "}
                    {includeKimono ? "• Kimono officiel compris" : ""}
                  </p>
                </div>

                <a
                  href="https://wa.me/22996995558?text=Bonjour%2C%20je%20souhaite%20inscrire%20mon%20enfant%20au%20karat%C3%A9."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-red hover:bg-[#D4B270] text-black text-xs font-bold uppercase tracking-[0.2em] text-center transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Valider sur WhatsApp
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
