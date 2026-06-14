import { motion } from "motion/react";
import { Clock, Calendar, CheckCircle, Info, Activity, Flame } from "lucide-react";
import { SCHEDULES } from "../data";

export default function Horaires() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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

  const workflowSteps = [
    {
      num: "01",
      title: "Échauffement & Préparation",
      duration: "20 min",
      desc: "Cardio intense, assouplissements musculaires et étirement des articulations pour minimiser le risque de blessures.",
    },
    {
      num: "02",
      title: "Kihon (Techniques)",
      duration: "30 min",
      desc: "Apprentissage répétitif des coups de poing (Tsuki), blocages (Uke) et coups de pied (Geri) dans le vide ou sur bouclier.",
    },
    {
      num: "03",
      title: "Kata (Formes)",
      duration: "30 min",
      desc: "Enchaînements codifiés simulant un combat contre des adversaires imaginaires pour développer la précision et l'équilibre.",
    },
    {
      num: "04",
      title: "Kumite (Combat)",
      duration: "30 min",
      desc: "Affrontements deux à deux (conventionnels ou semi-libres) avec équipements de protection pour apprendre la distance et le timing.",
    },
    {
      num: "05",
      title: "Mokuso (Retour au calme)",
      duration: "10 min",
      desc: "Saluts traditionnels de fin de cours, exercices respiratoires et méditation guidée d'apaisement en posture Seiza.",
    },
  ];

  return (
    <section id="horaires" className="py-24 bg-[#0A0A0A] relative overflow-hidden border-b border-white/5 japanese-grid">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red font-serif italic text-lg tracking-wide block mb-1">
            Calendrier Dojo
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase font-display mt-2 relative pb-4 inline-block">
            Horaires des Entreînements
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-brand-red" />
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Trouvez les créneaux réguliers de l'association sportive au Centre Sportif Sowéto à Cotonou.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Calendar Display Cards (5/12 of the horizontal screen) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-brand-red font-bold flex items-center gap-2.5 mb-4">
              <Calendar className="w-4 h-4 text-brand-red" />
              Séances hebdomadaires
            </h3>

            {SCHEDULES.map((sched, idx) => (
              <motion.div
                key={sched.day}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-card border border-brand-gray p-6 rounded-none hover:border-brand-red/35 transition-all relative group"
              >
                {/* Decorative absolute glow */}
                <div className="absolute right-6 top-6 w-12 h-12 border border-brand-gray flex items-center justify-center bg-black/40 group-hover:bg-brand-red/5 group-hover:border-brand-red/30 transition-colors">
                  <Clock className="w-5 h-5 text-brand-red" />
                </div>

                <div className="text-brand-red font-serif italic text-xl tracking-wide">
                  {sched.day}
                </div>

                <div className="text-3xl font-display font-medium text-white mt-1 uppercase">{sched.time}</div>

                <div className="h-px bg-brand-gray/60 my-4" />

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-brand-red" />
                    {sched.activity}
                  </div>
                  <div className="text-xs text-neutral-400 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-neutral-500" />
                    Lieu : {sched.location}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="p-5 rounded-none bg-black/20 border border-brand-gray text-xs text-neutral-400 flex items-start gap-3">
              <Info className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Important :</strong> Nous recommandons aux élèves de se présenter au dojo 15 minutes avant le début de la séance afin d'enfiler le kimono dans les vestiaires de Sowéto. Les parents d'élèves sont invités à assister aux entraînements depuis le banc de touche.
              </p>
            </div>
          </div>

          {/* Training Timeline Blocks (7/12 of the horizontal screen) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-brand-red font-bold flex items-center gap-2.5">
              <Flame className="w-4 h-4" />
              Déroulement d'une séance (2h)
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {workflowSteps.map((step) => (
                <motion.div
                  key={step.num}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-5 rounded-none bg-brand-card border border-brand-gray hover:border-brand-red/20 transition-all duration-300"
                >
                  <div className="font-display font-light text-2xl text-brand-red bg-brand-red/5 px-4 py-2 border border-brand-red/25 shrink-0 rounded-none">
                    {step.num}
                  </div>
                  
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 font-display">
                      <span className="font-display font-medium text-white text-base uppercase">
                        {step.title}
                      </span>
                      <span className="text-[9px] tracking-widest uppercase font-bold text-brand-red font-serif px-2.5 py-0.5 rounded-none bg-brand-red/5 border border-brand-red/15 max-w-max">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
