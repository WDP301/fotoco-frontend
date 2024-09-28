// context/LanguageContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { Locale } from '@/lib/define';
import { getDictionary } from '@/lib/utils';

interface LanguageContextType {
  lang: Locale;
  dict: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) => {
  const dict = getDictionary(lang);
  return (
    <LanguageContext.Provider value={{ lang, dict }}>
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
