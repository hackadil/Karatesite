export interface GalleryCategory {
  key: "cours" | "competitions";
  title: string;
  images: string[];
}

export interface ActivityCard {
  title: string;
  description: string;
  image: string;
  categoryKey: "cours" | "competitions";
}

export interface SenseiProfile {
  name: string;
  title: string;
  photo: string;
  dan: string;
  federation: string;
  referee: string;
}

export interface RateItem {
  id: string;
  name: string;
  price: number;
  description: string;
  period?: string;
  required?: boolean;
}

export interface ClassSchedule {
  day: string;
  time: string;
  activity: string;
  location: string;
}

