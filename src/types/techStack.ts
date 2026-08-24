export interface TechCardItem {
  title_ar?: string;
  title_en?: string;
  desc_ar?: string;
  desc_en?: string;
  description_ar?: string;
  description_en?: string;
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
