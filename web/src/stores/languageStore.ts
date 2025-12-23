import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, translations, defaultLanguage, Translations } from '../i18n';

interface LanguageState {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: defaultLanguage,
      t: translations[defaultLanguage],
      setLanguage: (lang: Language) => {
        set({ language: lang, t: translations[lang] });
      },
    }),
    {
      name: 'studyforge-language',
      partialize: (state) => ({ language: state.language }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.language];
        }
      },
    }
  )
);

// Helper hook for translations
export const useT = () => useLanguageStore((state) => state.t);
