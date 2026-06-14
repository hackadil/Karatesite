import { motion } from "motion/react";
import { Camera, Eye, ArrowUpRight } from "lucide-react";
import { ACTIVITIES, IMAGES } from "../data";
import ImageWithFallback from "./ImageWithFallback";

interface ActivitiesProps {
  onSelectCategory: (key: "cours" | "competitions") => void;
}

export default function Activities({ onSelectCategory }: ActivitiesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="activites" className="py-24 bg-brand-dark relative">
      <div className="absolute inset-0 bg-radial-gradient from-brand-gray/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red font-serif italic text-lg tracking-wide block mb-1">
            L'esprit traditionnel du Shotokan
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase font-display mt-2 relative pb-4 inline-block">
            Nos Activités du Club
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-brand-red" />
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light">
            Découvrez nos programmes sportifs complets d'arts martiaux, adaptés aux parcours des garçons, filles et adultes compétiteurs ou amateurs.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/5 border border-brand-red/15 text-brand-red text-xs uppercase tracking-wider font-semibold select-none">
            <Camera className="w-3.5 h-3.5" />
            Cliquez sur un programme pour explorer sa galerie photos
          </div>
        </div>

        {/* Activities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-center max-w-5xl mx-auto px-4"
        >
          {ACTIVITIES.map((act, index) => (
            <motion.div
              key={act.categoryKey}
              variants={itemVariants}
              onClick={() => onSelectCategory(act.categoryKey)}
              className="group bg-brand-card rounded-none border border-brand-gray hover:border-brand-red/40 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image panel with zooms & actions */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-900 border-b border-brand-gray">
                  <ImageWithFallback
                    src={act.image}
                    fallbackSrc={
                      act.categoryKey === "cours"
                        ? IMAGES.enfantsFallback
                        : IMAGES.competitionsFallback
                    }
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-700 scale-102 group-hover:scale-105 brightness-110 contrast-102"
                  />
                  {/* Dark overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent opacity-75" />

                  {/* Eye Badge / Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/75 transition-all duration-300">
                    <div className="px-6 py-3 border border-brand-red text-brand-red text-xs font-semibold uppercase tracking-[0.2em] bg-brand-dark flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4 text-brand-red" />
                      Ouvrir la Galerie
                    </div>
                  </div>

                  {/* Absolute small label */}
                  <div className="absolute top-4 right-4 bg-brand-dark border border-brand-red/10 text-brand-red text-[10px] uppercase font-bold tracking-widest px-3 py-1.5">
                    0{index + 1} / Album Photos
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 sm:p-8">
                  <h4 className="text-xl sm:text-2xl font-normal text-white uppercase group-hover:text-brand-red transition-colors font-display flex items-center justify-between">
                    {act.title}
                    <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-brand-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h4>
                  <p className="text-neutral-400 text-sm sm:text-base mt-2.5 font-light leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>

              {/* Bottom bar button */}
              <div className="px-6 py-4.5 border-t border-brand-gray bg-black/30 flex items-center justify-between text-xs text-brand-red font-bold uppercase tracking-[0.15em] group-hover:bg-brand-red/5 transition-colors">
                <span>Voir la galerie d'images</span>
                <span className="text-neutral-500 group-hover:text-brand-red transition-colors font-serif">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
