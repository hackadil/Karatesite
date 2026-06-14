import { GalleryCategory, ActivityCard, SenseiProfile, RateItem, ClassSchedule } from "./types";
import coursImg from "./assets/images/cours.jpg";
import cours1Img from "./assets/images/cours 1.png";
import cours2Img from "./assets/images/cours2.jpg";
import cours3Img from "./assets/images/cours3.jpg";
import cours4Img from "./assets/images/cours4.jpg";
import cours5Img from "./assets/images/cours5.jpg";

const enfantsImg = coursImg; // Real local image for enfants/cours
const beachImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"; // Fallback pour la plage (entraînement extérieur)
import senseiImg from "./assets/images/sensei_aballo_1781464491182.jpg";
import logoImg from "./assets/images/logo_fighting_spirit_1781469090203.jpg";

import comp1 from "./assets/images/comp_sino_beninoise_monument_1781467041243.jpg";
import comp2 from "./assets/images/comp_groupe_sous_tente_1781467056952.jpg";
import comp3 from "./assets/images/comp_noel_cadeaux_velos_1781467071650.jpg";
import comp4 from "./assets/images/comp_podium_fbk_da_aballo_1781467085983.jpg";
import comp5 from "./assets/images/comp_grand_groupe_cloture_1781467100468.jpg";
import comp6 from "./assets/images/comp_deux_fillettes_medailles_1781467114763.jpg";

export const APP_INFO = {
  name: "Fighting Spirit Karate Club",
  location: "Cotonou - Soweto, Bénin",
  addressFull: "Centre sportif Sowéto, Cotonou - Soweto",
  phone: "+229 96 99 55 58",
  phoneFormatted: "+22996995558",
  whatsappLink: "https://wa.me/22996995558?text=Bonjour%2C%20je%20veux%20inscrire%20mon%20enfant%20au%20karat%C3%A9",
  facebookGroup: "https://www.facebook.com/groups/221923285647810/",
  devise: {
    start: "Oser commencer",
    end: "Oser terminer"
  },
  philosophie: "Discipline, respect, persévérance et humilité sont les valeurs sacrées que nous transmettons avec passion à chaque cours.",
};

export const IMAGES = {
  logo: "images/logo.jpeg",
  logoFallback: logoImg,
  heroBg: "images/h.png",
  // Fallback high-quality background if heroBg is not uploaded yet in their system
  heroBgFallback: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1920",
  enfants: "images/e.jpg",
  enfantsFallback: enfantsImg,
  competitions: "images/az.jpg",
  competitionsFallback: comp2,
  sensei: senseiImg,
  senseiFallback: senseiImg,
  bgTexture: "images/bg-texture.png"
};

export const ACTIVITIES: ActivityCard[] = [
  {
    title: "Entraînement enfants & adultes",
    description: "Apprentissage complet du karaté Shotokan, du débutant à la ceinture noire. Développement de la motricité, de la souplesse, de la force physique et de la concentration.",
    image: IMAGES.enfants,
    categoryKey: "cours"
  },
  {
    title: "Stages & Compétitions",
    description: "Participation active aux tournois nationaux et régionaux, stages de perfectionnement technique dirigés par des experts certifiés, et passages de grades officiels.",
    image: IMAGES.competitions,
    categoryKey: "competitions"
  }
];

export const SENSEI: SenseiProfile = {
  name: "Maître Aballo",
  title: "Sensei Principal & Directeur Technique",
  photo: IMAGES.sensei,
  dan: "Ceinture noire 3ème Dan",
  federation: "FBK-DA (Fédération Béninoise de Karaté et disciplines Associées)",
  referee: "Arbitre Continental (UFAK - Union des Fédérations Africaines de Karaté)"
};

export const RATES: RateItem[] = [
  {
    id: "adhesion",
    name: "Frais d'adhésion",
    price: 5000,
    description: "Frais d'inscription annuels uniques pour les nouveaux membres.",
    required: true
  },
  {
    id: "cotisation",
    name: "Cotisation trimestrielle",
    price: 10000,
    description: "Accès à tous les entraînements réguliers du club pour un trimestre.",
    period: "par trimestre",
    required: true
  },
  {
    id: "kimono",
    name: "Tenue officielle (Kimono)",
    price: 5000,
    description: "Le port du kimono officiel (Karategi) blanc est obligatoire pour participer aux cours et aux passages de grades.",
    required: true
  }
];

export const SCHEDULES: ClassSchedule[] = [
  {
    day: "Mercredi",
    time: "16h00 - 18h00",
    activity: "Karaté Shotokan (Tous niveaux)",
    location: "Centre sportif Sowéto, Cotonou"
  },
  {
    day: "Samedi",
    time: "16h00 - 18h00",
    activity: "Karaté Technique, Kata & Combat",
    location: "Centre sportif Sowéto, Cotonou"
  }
];

export const GALLERY_DATA: Record<"cours" | "competitions", GalleryCategory> = {
  cours: {
    key: "cours",
    title: "Cours de Karaté",
    images: [
      coursImg,
      cours1Img,
      cours2Img,
      cours3Img,
      cours4Img,
      cours5Img
    ]
  },
  competitions: {
    key: "competitions",
    title: "Stages & Compétitions",
    images: [
      comp1,
      comp2,
      comp3,
      comp4,
      comp5,
      comp6
    ]
  }
};

export const DOJOS_VALUES = [
  {
    title: "Discipline",
    subtitle: "Rei",
    desc: "Suivre scrupuleusement les règles du dōjō. Apprendre à structurer son esprit pour surmonter les obstacles du quotidien.",
    icon: "ShieldAlert"
  },
  {
    title: "Respect",
    subtitle: "Respect d'autrui",
    desc: "Saluer son partenaire, honorer ses enseignants et estimer la progression de chacun, quel que soit le grade.",
    icon: "Heart"
  },
  {
    title: "Persévérance",
    subtitle: "Ganbaru",
    desc: "Fournir un effort constant. N'abandonnez jamais devant la fatigue ou la difficulté technique. 'Oser terminer'.",
    icon: "Zap"
  },
  {
    title: "Humilité",
    subtitle: "Modestie",
    desc: "Garder un esprit de débutant (Shoshin) constant, rester réceptif aux conseils et contrôler ses victoires.",
    icon: "Eye"
  }
];
