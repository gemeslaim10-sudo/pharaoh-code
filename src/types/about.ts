export interface AboutHeroFeature {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
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

export interface AboutFormData {
  hero: AboutHeroData;
  visionMission: AboutVisionMissionData;
  philosophy: AboutPhilosophyData;
  faq: AboutFaqData;
}

export const INITIAL_ABOUT_FORM: AboutFormData = {
  hero: {
    subtitle_ar: '', subtitle_en: '',
    titlePart1_ar: '', titlePart1_en: '',
    titlePart2_ar: '', titlePart2_en: '',
    description_ar: '', description_en: '',
    buttonText_ar: '', buttonText_en: '',
    establishedText: '', imageUrl: '',
    features: [
      { title_ar: '', title_en: '', description_ar: '', description_en: '' },
      { title_ar: '', title_en: '', description_ar: '', description_en: '' }
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
      { title_ar: '', title_en: '', description_ar: '', description_en: '' },
      { title_ar: '', title_en: '', description_ar: '', description_en: '' },
      { title_ar: '', title_en: '', description_ar: '', description_en: '' }
    ]
  },
  faq: {
    subtitle_ar: '', subtitle_en: '',
    titlePart1_ar: '', titlePart1_en: '',
    titlePart2_ar: '', titlePart2_en: '',
    faqs: []
  }
};
