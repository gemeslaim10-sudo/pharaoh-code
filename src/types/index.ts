export interface SectionItem {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  text?: string;
  icon?: string;
  image?: string;
  imageUrl?: string;
  link?: string;
  name?: string;
  role?: string;
  company?: string;
  question?: string;
  answer?: string;
  url?: string;
  date?: string;
  content?: string;
  value?: string;
  label?: string;
  category?: string;
  color?: string;
  fbUrl?: string;
  instaUrl?: string;
  stat1Val?: string;
  stat1Lbl?: string;
  stat2Val?: string;
  stat2Lbl?: string;
  skill1Name?: string;
  skill1Val?: string;
  skill2Name?: string;
  skill2Val?: string;
  skill3Name?: string;
  skill3Val?: string;
  [key: string]: any;
}

export interface SectionData {
  titlePart1?: string;
  titlePart2?: string;
  titlePart3?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  primaryActionText?: string;
  secondaryActionText?: string;
  intro?: string;
  footerText?: string;
  footerLinkText?: string;
  
  items?: SectionItem[];
  members?: SectionItem[];
  faqs?: SectionItem[];
  sections?: SectionItem[];
  features?: SectionItem[];
  info?: Record<string, string>;
  
  // Explicitly allowing these properties that might be used across components
  image?: string;
  link?: string;
  title?: string;
  text?: string;
  
  [key: string]: any;
}
