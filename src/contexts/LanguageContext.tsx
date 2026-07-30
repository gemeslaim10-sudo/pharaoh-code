'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, Direction, LanguageContextType, Translations } from '@/types/i18n';
import { dictionary } from '@/data/translations';

const STORAGE_KEY = 'app_language';
const DEFAULT_LANGUAGE: Language = 'ar';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Helper to resolve nested keys like "home.hero.title" or fallback gracefully.
 * Also handles variable interpolation e.g., t("welcome", { name: "Ahmed" }) -> "Welcome Ahmed"
 */
function getNestedTranslation(
  obj: Translations,
  path: string,
  params?: Record<string, string | number>
): string | null {
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return null;
    }
  }

  if (typeof current === 'string') {
    if (params) {
      return current.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
        return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
      });
    }
    return current;
  }

  return null;
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isInitialized, setIsInitialized] = useState(false);

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Read stored language preference or browser default
    const storedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (storedLang && (storedLang === 'ar' || storedLang === 'en')) {
      setLanguageState(storedLang);
    } else {
      const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
      setLanguageState(browserLang);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language, direction, isInitialized]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const currentDict = dictionary[language] || {};
      const translation = getNestedTranslation(currentDict, key, params);

      if (translation !== null) {
        return translation;
      }

      // Fallback to default language (Arabic) if missing in target language
      if (language !== DEFAULT_LANGUAGE) {
        const fallbackDict = dictionary[DEFAULT_LANGUAGE] || {};
        const fallbackTranslation = getNestedTranslation(fallbackDict, key, params);
        if (fallbackTranslation !== null) {
          return fallbackTranslation;
        }
      }

      // If translation key is completely missing, throw loud error in console & UI
      console.error(`🚨 [i18n ERROR]: Missing translation key "${key}" for language "${language}". Please add it to src/data/translations.ts!`);
      return `⚠️ MISSING [${key}]`;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t, language, direction } = useLanguage();
  return { t, language, direction };
};
