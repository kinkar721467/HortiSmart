import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
];

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/translations/${locale}`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        } else {
          console.warn(`Failed to load translations for ${locale}. Using fallback keys.`);
        }
      } catch (error) {
        console.error(`Error fetching translations for ${locale}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [locale]);

  const changeLocale = (newLocale) => {
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === newLocale)) {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
    }
  };

  // The translation helper t()
  const t = (key, replacements = {}) => {
    const keys = key.split('.');
    let translation = translations;

    for (const k of keys) {
      if (translation && typeof translation === 'object') {
        translation = translation[k];
      } else {
        translation = undefined;
        break;
      }
    }

    if (typeof translation !== 'string') {
      return key;
    }

    let result = translation;
    Object.keys(replacements).forEach((placeholder) => {
      result = result.replace(`:${placeholder}`, replacements[placeholder]);
    });

    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, t, loading }}>
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
