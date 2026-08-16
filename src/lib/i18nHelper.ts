import { Language } from '@/types/i18n';
import { KNOWN_TRANSLATIONS } from './i18n/knownTranslations';

/**
 * Helper to dynamically extract text based on active language from database objects.
 * Supports objects structured as:
 * 1. { title_ar: '...', title_en: '...' }
 * 2. { title: { ar: '...', en: '...' } }
 * 3. Known translation dictionary lookup.
 * 4. Language-matched fallback or empty string for component fallback key execution.
 */
export function getDynamicText<T extends object>(
  data: T | null | undefined,
  field: string,
  language: Language = 'ar'
): string {
  if (!data) return '';

  const record = data as Record<string, unknown>;

  // 1. Nested object format -> data[field] = { ar: '...', en: '...' }
  const fieldVal = record[field];
  if (fieldVal && typeof fieldVal === 'object' && !Array.isArray(fieldVal)) {
    const nested = fieldVal as Record<string, string>;
    if (nested[language]) return nested[language];
  }

  // 2. Explicit suffix format -> data.title_ar / data.title_en
  const targetKey = `${field}_${language}`;
  const suffixVal = record[targetKey];
  if (typeof suffixVal === 'string' && suffixVal.trim() !== '') {
    return suffixVal;
  }

  // 3. Raw value processing
  const rawValue = typeof fieldVal === 'string' ? fieldVal.trim() : '';

  // Check KNOWN_TRANSLATIONS dictionary for the raw value if it exists
  if (rawValue && KNOWN_TRANSLATIONS[rawValue]) {
    return KNOWN_TRANSLATIONS[rawValue][language];
  }

  if (rawValue) {
    const isArabicStr = /[\u0600-\u06FF]/.test(rawValue);
    // If requesting English but raw value is Arabic without explicit _en field,
    // return empty string so caller can use || fallback key
    if (language === 'en' && isArabicStr) {
      return '';
    }
    // If requesting Arabic but raw value is English without explicit _ar field,
    // return empty string so caller can use || fallback key
    if (language === 'ar' && !isArabicStr && /[a-zA-Z]/.test(rawValue)) {
      return '';
    }
    return rawValue;
  }

  return '';
}
