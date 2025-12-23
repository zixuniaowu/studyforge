import React from 'react';
import { useLanguageStore } from '../../stores/languageStore';
import { Language, languageNames } from '../../i18n';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  const languages: Language[] = ['zh', 'ja'];

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
        <Globe size={18} />
        <span className="text-sm font-medium">{languageNames[language]}</span>
      </button>
      <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
              language === lang ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
            }`}
          >
            {languageNames[lang]}
          </button>
        ))}
      </div>
    </div>
  );
};
