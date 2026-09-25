export interface DetailTheme {
  isLight: boolean;
  page: string;
  card: string;
  muted: string;
  body: string;
  heading: string;
  gold: string;
  divider: string;
  chip: string;
}

/** Arabic/English pair with a fallback to whichever side was filled in. */
export function pickLang(ar: string, en: string, language: string): string {
  return language === 'en' ? (en || ar) : (ar || en);
}
