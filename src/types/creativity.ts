export type CreativityType = 'portfolio' | 'philosophy' | 'services';

export interface PortfolioCategoryRef {
  slug: string;
  name_ar: string;
  name_en: string;
}

/** A portfolio project ("عمل") as shown on the public /portfolio/[id] page. */
export interface PortfolioProject {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  categories: string[];
  category_ar: string;
  category_en: string;
  link: string;
  appLink: string;
  clientName_ar: string;
  clientName_en: string;
  projectYear: string;
  tools: string[];
  /** Designs, logos, screenshots — uploaded from the dashboard. */
  gallery: string[];
  videos: string[];
  createdAt: string;
}
