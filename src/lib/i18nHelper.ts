import { Language } from '@/types/i18n';

/**
 * Helper to dynamically extract text based on active language from database objects.
 * Supports object structured as:
 * 1. { title_ar: '...', title_en: '...' }
 * 2. { title: { ar: '...', en: '...' } }
 * 3. Fallbacks gracefully to Arabic or raw string if target language value is missing.
 */
export function getDynamicText(
  data: any,
  field: string,
  language: Language = 'ar'
): string {
  if (!data) return '';

  // Case 1: Nested object format -> data[field] = { ar: '...', en: '...' }
  if (data[field] && typeof data[field] === 'object') {
    return data[field][language] || data[field]['ar'] || data[field]['en'] || '';
  }

  // Case 2: Suffix format -> data.title_ar / data.title_en
  const targetKey = `${field}_${language}`;
  if (data[targetKey]) {
    return data[targetKey];
  }

  // Fallback to Arabic suffix
  const fallbackKey = `${field}_ar`;
  if (data[fallbackKey]) {
    return data[fallbackKey];
  }

  // Fallback to standard field name if plain string
  if (typeof data[field] === 'string') {
    return data[field];
  }

  return '';
}
