export interface FeatureItem {
  title_ar?: string;
  title_en?: string;
  desc_ar?: string;
  desc_en?: string;
}

export interface PackageItem {
  level_ar?: string;
  level_en?: string;
  badge_ar?: string;
  badge_en?: string;
  title_ar?: string;
  title_en?: string;
  price?: string;
  period_ar?: string;
  period_en?: string;
  desc_ar?: string;
  desc_en?: string;
  features_heading_ar?: string;
  features_heading_en?: string;
  features_list_ar?: string[];
  features_list_en?: string[];
  isPopular?: boolean;
}

export interface RoadmapStepItem {
  number?: string;
  title_ar?: string;
  title_en?: string;
  desc_ar?: string;
  desc_en?: string;
}

export interface GuaranteeItem {
  icon?: string;
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
  addedValueTitle_ar?: string;
  addedValueTitle_en?: string;
  addedValueSubtitle_ar?: string;
  addedValueSubtitle_en?: string;
  guarantees?: GuaranteeItem[];
  [key: string]: any;
}

export const DEFAULT_FEATURES: FeatureItem[] = [
  { 
    title_ar: 'تنفيذ عالي الدقة والاحترافية:', 
    title_en: 'High-Precision Execution:', 
    desc_ar: 'نلتزم بأعلى معايير الجودة لتقديم نتائج تفوق التوقعات.', 
    desc_en: 'We adhere to highest quality standards for optimal results.' 
  },
  { 
    title_ar: 'حلول مخصصة ومتكاملة:', 
    title_en: 'Customized Integrated Solutions:', 
    desc_ar: 'نصمم وننفذ حلولاً تناسب متطلبات نشاطك وهدفك بدقة.', 
    desc_en: 'Tailored solutions matching your business requirements.' 
  },
  { 
    title_ar: 'دعم ومتابعة مستمرة:', 
    title_en: 'Continuous Support & Follow-up:', 
    desc_ar: 'فريق عمل متأهب لدعمك ومتابعة تنفيذ كافة التفاصيل أولاً بأول.', 
    desc_en: 'Dedicated team for continuous support and execution tracking.' 
  },
];

export const DEFAULT_GUARANTEES: GuaranteeItem[] = [
  {
    icon: '✨',
    title_ar: 'تحليل وتخطيط متكامل',
    title_en: 'Comprehensive Discovery & Strategy',
    desc_ar: 'جلسة تحليل تفصيلية لتحديد المتطلبات الدقيقة ورسم خطة التنفيذ المثالية.',
    desc_en: 'Detailed discovery session to specify requirements and timeline.'
  },
  {
    icon: '🗺️',
    title_ar: 'تسليم احترافي مع الدعم',
    title_en: 'Professional Delivery & Support',
    desc_ar: 'تسليم كامل مخرجات الخدمة مع توفير المتابعة والدعم الفني المباشر.',
    desc_en: 'Complete handover of deliverables with dedicated support.'
  }
];

export const DEFAULT_PACKAGES: PackageItem[] = [
  {
    level_ar: 'المستوى الأول', level_en: 'Level 1 - Starter',
    title_ar: '', title_en: '', price: '', period_ar: '', period_en: '',
    desc_ar: '', desc_en: '',
    features_heading_ar: 'المميزات المضمنة:', features_heading_en: 'Included Features:',
    features_list_ar: [''], features_list_en: [''],
    isPopular: false
  },
  {
    level_ar: 'المستوى الثاني', level_en: 'Level 2 - Professional',
    title_ar: '', title_en: '', price: '', period_ar: '', period_en: '',
    desc_ar: '', desc_en: '',
    features_heading_ar: 'المميزات المضمنة:', features_heading_en: 'Included Features:',
    features_list_ar: [''], features_list_en: [''],
    isPopular: true
  },
  {
    level_ar: 'المستوى الثالث', level_en: 'Level 3 - Enterprise',
    title_ar: '', title_en: '', price: '', period_ar: '', period_en: '',
    desc_ar: '', desc_en: '',
    features_heading_ar: 'المميزات المضمنة:', features_heading_en: 'Included Features:',
    features_list_ar: [''], features_list_en: [''],
    isPopular: false
  },
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
  addedValueTitleAr?: string; addedValueTitleEn?: string;
  addedValueSubtitleAr?: string; addedValueSubtitleEn?: string;
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
  addedValueTitleAr: '', addedValueTitleEn: '',
  addedValueSubtitleAr: '', addedValueSubtitleEn: '',
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
    addedValueTitleAr: s.addedValueTitle_ar || '', addedValueTitleEn: s.addedValueTitle_en || '',
    addedValueSubtitleAr: s.addedValueSubtitle_ar || '', addedValueSubtitleEn: s.addedValueSubtitle_en || '',
  };
}
