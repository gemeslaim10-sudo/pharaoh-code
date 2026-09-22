export interface TechCardItem {
  title_ar?: string;
  title_en?: string;
  desc_ar?: string;
  desc_en?: string;
  description_ar?: string;
  description_en?: string;
  /** Uploaded icon URL or inline SVG markup. Falls back to the built-in icon by index. */
  icon?: string;
}

export interface TechStackFormData {
  subtitle_ar?: string;
  subtitle_en?: string;
  title1_ar?: string;
  title1_en?: string;
  title2_ar?: string;
  title2_en?: string;
  description_ar?: string;
  description_en?: string;
  cleanArch_ar?: string;
  cleanArch_en?: string;
  aesEncrypt_ar?: string;
  aesEncrypt_en?: string;
  cards: TechCardItem[];
}

/** Header block of the public /services page — stored at pages/services -> grid. */
export interface ServicesPageHeaderData {
  subtitle_ar?: string;
  subtitle_en?: string;
  titlePart1_ar?: string;
  titlePart1_en?: string;
  titlePart2_ar?: string;
  titlePart2_en?: string;
  description_ar?: string;
  description_en?: string;
}

export const INITIAL_SERVICES_PAGE_HEADER: ServicesPageHeaderData = {
  subtitle_ar: '', subtitle_en: '',
  titlePart1_ar: '', titlePart1_en: '',
  titlePart2_ar: '', titlePart2_en: '',
  description_ar: '', description_en: '',
};
