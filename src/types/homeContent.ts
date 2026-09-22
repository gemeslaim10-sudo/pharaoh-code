/**
 * Editable text content of the HOME page (`pages/home` Firestore document).
 * Every field is bilingual (`_ar` / `_en`) and read on the site through
 * `getDynamicText(...)`; an empty value falls back to the built-in i18n text.
 *
 * NOTE: the `stats` section of `pages/home` is NOT part of this shape — it has
 * its own dashboard editor (`/dashboard/stats`) and must never be overwritten here.
 */

export interface HomeHeroContent {
  subtitle_ar: string;
  subtitle_en: string;
  titlePart1_ar: string;
  titlePart1_en: string;
  titlePart2_ar: string;
  titlePart2_en: string;
  titlePart3_ar: string;
  titlePart3_en: string;
  description_ar: string;
  description_en: string;
  primaryBtnText_ar: string;
  primaryBtnText_en: string;
  primaryBtnLink: string;
  secondaryBtnText_ar: string;
  secondaryBtnText_en: string;
  secondaryBtnLink: string;
  /** Second hero slide (media stays in Settings → Hero Theme). */
  slide2TitlePart1_ar: string;
  slide2TitlePart1_en: string;
  slide2TitlePart2_ar: string;
  slide2TitlePart2_en: string;
  slide2Subtitle_ar: string;
  slide2Subtitle_en: string;
}

/** Shared header of every home section (badge + split title + paragraph). */
export interface HomeSectionHeaderContent {
  subtitle_ar: string;
  subtitle_en: string;
  titlePart1_ar: string;
  titlePart1_en: string;
  titlePart2_ar: string;
  titlePart2_en: string;
  description_ar: string;
  description_en: string;
}

/** Header of a section that also renders a "view all" button. */
export interface HomeLinkedSectionHeaderContent extends HomeSectionHeaderContent {
  linkText_ar: string;
  linkText_en: string;
}

export interface HomeWorkflowStepContent {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  /** Uploaded icon URL or inline SVG markup (rendered with <SmartIcon />). */
  iconSvg: string;
}

export interface HomeWorkflowContent extends HomeSectionHeaderContent {
  steps: HomeWorkflowStepContent[];
}

export interface HomeCreativeContent extends HomeSectionHeaderContent {
  bannerText_ar: string;
  bannerText_en: string;
  bannerBadge: string;
}

export interface HomeContentData {
  hero: HomeHeroContent;
  portfolio: HomeLinkedSectionHeaderContent;
  services: HomeLinkedSectionHeaderContent;
  clients: HomeLinkedSectionHeaderContent;
  creative: HomeCreativeContent;
  workflow: HomeWorkflowContent;
  team: HomeLinkedSectionHeaderContent;
  testimonials: HomeSectionHeaderContent;
}

/** Firestore section keys this editor is allowed to write. */
export type HomeContentSectionKey = keyof HomeContentData;

const EMPTY_HEADER: HomeSectionHeaderContent = {
  subtitle_ar: '', subtitle_en: '',
  titlePart1_ar: '', titlePart1_en: '',
  titlePart2_ar: '', titlePart2_en: '',
  description_ar: '', description_en: '',
};

const EMPTY_LINKED_HEADER: HomeLinkedSectionHeaderContent = {
  ...EMPTY_HEADER,
  linkText_ar: '', linkText_en: '',
};

export const EMPTY_WORKFLOW_STEP: HomeWorkflowStepContent = {
  title_ar: '', title_en: '',
  description_ar: '', description_en: '',
  iconSvg: '',
};

export const INITIAL_HOME_CONTENT: HomeContentData = {
  hero: {
    subtitle_ar: '', subtitle_en: '',
    titlePart1_ar: '', titlePart1_en: '',
    titlePart2_ar: '', titlePart2_en: '',
    titlePart3_ar: '', titlePart3_en: '',
    description_ar: '', description_en: '',
    primaryBtnText_ar: '', primaryBtnText_en: '',
    primaryBtnLink: '',
    secondaryBtnText_ar: '', secondaryBtnText_en: '',
    secondaryBtnLink: '',
    slide2TitlePart1_ar: '', slide2TitlePart1_en: '',
    slide2TitlePart2_ar: '', slide2TitlePart2_en: '',
    slide2Subtitle_ar: '', slide2Subtitle_en: '',
  },
  portfolio: { ...EMPTY_LINKED_HEADER },
  services: { ...EMPTY_LINKED_HEADER },
  clients: { ...EMPTY_LINKED_HEADER },
  creative: {
    ...EMPTY_HEADER,
    bannerText_ar: '', bannerText_en: '',
    bannerBadge: '',
  },
  workflow: {
    ...EMPTY_HEADER,
    steps: [
      { ...EMPTY_WORKFLOW_STEP },
      { ...EMPTY_WORKFLOW_STEP },
      { ...EMPTY_WORKFLOW_STEP },
      { ...EMPTY_WORKFLOW_STEP },
    ],
  },
  team: { ...EMPTY_LINKED_HEADER },
  testimonials: { ...EMPTY_HEADER },
};
