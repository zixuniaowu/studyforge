import React from 'react';
import { useLanguageStore } from '../../stores/languageStore';
import { Language, languageNames } from '../../i18n';
import { Globe, Check } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  const languages: Language[] = ['zh', 'ja'];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm border border-white/10">
        <Globe size={18} />
        <span className="text-sm font-medium">{languageNames[language]}</span>
      </button>
      <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center justify-between w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
              language === lang ? 'text-indigo-600 font-medium bg-indigo-50/50' : 'text-gray-700'
            }`}
          >
            <span>{languageNames[lang]}</span>
            {language === lang && <Check size={16} className="text-indigo-600" />}
          </button>
        ))}
      </div>
    </div>
  );
};
