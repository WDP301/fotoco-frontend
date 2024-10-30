'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Locale } from '@/lib/define';
import { getDictionary } from '@/lib/utils';
import { getCookie, setCookie } from 'cookies-next';

interface LanguageContextType {
  lang: Locale;
  dict: Record<string, any>;
  updateLanguage: (newLang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Locale>('en');
  const [dict, setDict] = useState<Record<string, any>>(getDictionary('en'));

  useEffect(() => {
    const langFromCookie = getCookie('lang') as Locale;
    const selectedLang = langFromCookie || 'en'; // Fallback to 'en' if cookie is not set
    setLang(selectedLang);
    setDict(getDictionary(selectedLang));
  }, []); // Only run once on mount

  const updateLanguage = (newLang: Locale) => {
    setLang(newLang);
    setDict(getDictionary(newLang));
    setCookie('lang', newLang); // Update the cookie with the new language
  };

  return (
    <LanguageContext.Provider value={{ lang, dict, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
