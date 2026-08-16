export interface FeatureItem {
  title_ar?: string;
  title_en?: string;
  desc_ar?: string;
  desc_en?: string;
}

export interface PackageItem {
  badge_ar?: string;
  badge_en?: string;
  title_ar?: string;
  title_en?: string;
  price?: string;
  period_ar?: string;
  period_en?: string;
  desc_ar?: string;
  desc_en?: string;
  isPopular?: boolean;
}

export interface RoadmapStepItem {
  number?: string;
  title_ar?: string;
  title_en?: string;
  desc_ar?: string;
  desc_en?: string;
}

export interface ServiceItem {
  id?: string;
  serviceId?: string;
  slug?: string;
  name?: string;
  title_ar?: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  icon?: string;
  category?: string;
  features?: FeatureItem[];
  packages?: PackageItem[];
  roadmapSteps?: RoadmapStepItem[];
  [key: string]: any;
}

export const DEFAULT_FEATURES: FeatureItem[] = [
  { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
  { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
  { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
];

export const DEFAULT_PACKAGES: PackageItem[] = [
  { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: false },
  { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: true },
  { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: false },
];

export const DEFAULT_ROADMAP_STEPS: RoadmapStepItem[] = [
  { number: '01', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
  { number: '02', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
  { number: '03', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
  { number: '04', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
];

export interface TemplateFields {
  heroSubtitleAr: string; heroSubtitleEn: string;
  heroTitle1Ar: string; heroTitle1En: string;
  heroTitle2Ar: string; heroTitle2En: string;
  heroDescAr: string; heroDescEn: string;
  heroBtnAr: string; heroBtnEn: string;
  overviewSubtitleAr: string; overviewSubtitleEn: string;
  overviewTitleAr: string; overviewTitleEn: string;
  overviewDescAr: string; overviewDescEn: string;
  packagesTitleAr: string; packagesTitleEn: string;
}

export const INITIAL_TEMPLATE_FIELDS: TemplateFields = {
  heroSubtitleAr: '', heroSubtitleEn: '',
  heroTitle1Ar: '', heroTitle1En: '',
  heroTitle2Ar: '', heroTitle2En: '',
  heroDescAr: '', heroDescEn: '',
  heroBtnAr: '', heroBtnEn: '',
  overviewSubtitleAr: '', overviewSubtitleEn: '',
  overviewTitleAr: '', overviewTitleEn: '',
  overviewDescAr: '', overviewDescEn: '',
  packagesTitleAr: '', packagesTitleEn: '',
};

export function extractTemplateFromService(s: Record<string, any>): TemplateFields {
  return {
    heroSubtitleAr: s.heroSubtitle_ar || '', heroSubtitleEn: s.heroSubtitle_en || '',
    heroTitle1Ar: s.heroTitle1_ar || '', heroTitle1En: s.heroTitle1_en || '',
    heroTitle2Ar: s.heroTitle2_ar || '', heroTitle2En: s.heroTitle2_en || '',
    heroDescAr: s.heroDesc_ar || '', heroDescEn: s.heroDesc_en || '',
    heroBtnAr: s.heroBtn_ar || '', heroBtnEn: s.heroBtn_en || '',
    overviewSubtitleAr: s.overviewSubtitle_ar || '', overviewSubtitleEn: s.overviewSubtitle_en || '',
    overviewTitleAr: s.overviewTitle_ar || '', overviewTitleEn: s.overviewTitle_en || '',
    overviewDescAr: s.overviewDesc_ar || '', overviewDescEn: s.overviewDesc_en || '',
    packagesTitleAr: s.packagesTitle_ar || '', packagesTitleEn: s.packagesTitle_en || '',
  };
}
