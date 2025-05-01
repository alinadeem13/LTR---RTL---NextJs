'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import ar from '../src/translation/ar.json';
import en from '../src/translation/en.json';
import fr from '../src/translation/fr.json';
import ur from '../src/translation/ur.json';

type Direction = 'ltr' | 'rtl';
export type Language = 'en' | 'ar' | 'fr' | 'ur'; // ✅ Export it

const DirectionContext = createContext<{
  direction: Direction;
  language: Language;
  translations: Record<string, string>;
  toggleDirection: () => void;
  setLanguage: (lang: Language) => void;
}>({
  direction: 'ltr',
  language: 'en',
  translations: en,
  toggleDirection: () => {},
  setLanguage: () => {},
});

export const useDirection = () => useContext(DirectionContext);

export const DirectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [direction, setDirection] = useState<Direction>('ltr');
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>(en);

  const getTranslations = (lang: Language): Record<string, string> => {
    switch (lang) {
      case 'ar': return ar;
      case 'fr': return fr;
      case 'ur': return ur;
      default: return en;
    }
  };

  const getDirection = (lang: Language): Direction => {
    return ['ar', 'ur'].includes(lang) ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    setTranslations(getTranslations(language));
    setDirection(getDirection(language));
  }, [language]);

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [direction, language]);

  return (
    <DirectionContext.Provider
      value={{ direction, language, translations, toggleDirection, setLanguage }}
    >
      {children}
    </DirectionContext.Provider>
  );
};
