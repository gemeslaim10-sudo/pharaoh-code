import { Translations } from '@/types/i18n';
import { ar } from './translations/ar';
import { en } from './translations/en';

export { ar, en };

export const dictionary: Record<'ar' | 'en', Translations> = {
  ar,
  en,
};
