import React from 'react';
import { useTranslation } from 'react-i18next';

const flags: { [key: string]: string } = {
  en: '🇬🇧',
  es: '🇪🇸',
  pt: '🇵🇹',
  it: '🇮🇹',
  de: '🇩🇪',
};

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      {Object.entries(flags).map(([lang, flag]) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-2 py-1 rounded ${
            i18n.language === lang ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;