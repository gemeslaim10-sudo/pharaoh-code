export interface AboutHeroFeature {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  /** Uploaded icon URL or inline SVG markup. */
  iconSvg?: string;
}

export interface AboutHeroData {
  subtitle_ar: string;
  subtitle_en: string;
  titlePart1_ar: string;
  titlePart1_en: string;
  titlePart2_ar: string;
  titlePart2_en: string;
  description_ar: string;
  description_en: string;
  buttonText_ar: string;
  buttonText_en: string;
  establishedText?: string;
  establishedText_ar?: string;
  establishedText_en?: string;
  buttonLink?: string;
  imageUrl?: string;
  features: AboutHeroFeature[];
}

export interface AboutVisionMissionData {
  visionTitle_ar: string;
  visionTitle_en: string;
  visionText_ar: string;
  visionText_en: string;
  missionTitle_ar: string;
  missionTitle_en: string;
  missionText_ar: string;
  missionText_en: string;
}

export interface AboutPhilosophyItem {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  /** Uploaded icon URL or inline SVG markup. */
  iconSvg?: string;
}

export interface AboutPhilosophyData {
  subtitle_ar: string;
  subtitle_en: string;
  titlePart1_ar?: string;
  titlePart1_en?: string;
  titlePart2_ar?: string;
  titlePart2_en?: string;
  items: AboutPhilosophyItem[];
}

export interface AboutFaqItem {
  question_ar?: string;
  question_en?: string;
  question?: string;
  answer_ar?: string;
  answer_en?: string;
  answer?: string;
}

export interface AboutFaqData {
  subtitle_ar: string;
  subtitle_en: string;
  titlePart1_ar: string;
  titlePart1_en: string;
  titlePart2_ar: string;
  titlePart2_en: string;
  faqs: AboutFaqItem[];
}

export interface AboutCommentsData {
  subtitle_ar: string;
  subtitle_en: string;
  titlePart1_ar: string;
  titlePart1_en: string;
  titlePart2_ar: string;
  titlePart2_en: string;
  description_ar: string;
  description_en: string;
  formTitle_ar: string;
  formTitle_en: string;
  /** Single (non translated) watermark word behind the comments form. */
  backgroundText: string;
}

export interface AboutFormData {
  hero: AboutHeroData;
  visionMission: AboutVisionMissionData;
  philosophy: AboutPhilosophyData;
  faq: AboutFaqData;
  comments: AboutCommentsData;
}

export const INITIAL_ABOUT_FORM: AboutFormData = {
  hero: {
    subtitle_ar: '', subtitle_en: '',
    titlePart1_ar: '', titlePart1_en: '',
    titlePart2_ar: '', titlePart2_en: '',
    description_ar: '', description_en: '',
    buttonText_ar: '', buttonText_en: '',
    establishedText: '', establishedText_ar: '', establishedText_en: '',
    buttonLink: '', imageUrl: '',
    features: [
      { title_ar: '', title_en: '', description_ar: '', description_en: '', iconSvg: '' },
      { title_ar: '', title_en: '', description_ar: '', description_en: '', iconSvg: '' }
    ]
  },
  visionMission: {
    visionTitle_ar: '', visionTitle_en: '',
    visionText_ar: '', visionText_en: '',
    missionTitle_ar: '', missionTitle_en: '',
    missionText_ar: '', missionText_en: ''
  },
  philosophy: {
    subtitle_ar: '', subtitle_en: '',
    titlePart1_ar: '', titlePart1_en: '',
    titlePart2_ar: '', titlePart2_en: '',
    items: [
      { title_ar: '', title_en: '', description_ar: '', description_en: '', iconSvg: '' },
      { title_ar: '', title_en: '', description_ar: '', description_en: '', iconSvg: '' },
      { title_ar: '', title_en: '', description_ar: '', description_en: '', iconSvg: '' }
    ]
  },
  faq: {
    subtitle_ar: '', subtitle_en: '',
    titlePart1_ar: '', titlePart1_en: '',
    titlePart2_ar: '', titlePart2_en: '',
    faqs: []
  },
  comments: {
    subtitle_ar: '', subtitle_en: '',
    titlePart1_ar: '', titlePart1_en: '',
    titlePart2_ar: '', titlePart2_en: '',
    description_ar: '', description_en: '',
    formTitle_ar: '', formTitle_en: '',
    backgroundText: ''
  }
};

export const EMPTY_ABOUT_HERO_FEATURE: AboutHeroFeature = {
  title_ar: '', title_en: '', description_ar: '', description_en: '', iconSvg: ''
};

export const EMPTY_ABOUT_PHILOSOPHY_ITEM: AboutPhilosophyItem = {
  title_ar: '', title_en: '', description_ar: '', description_en: '', iconSvg: ''
};
