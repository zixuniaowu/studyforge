import { Language, Translations } from './types';
import { zh } from './zh';
import { ja } from './ja';

export type { Language, Translations };

export const translations: Record<Language, Translations> = {
  zh,
  ja,
};

export const languageNames: Record<Language, string> = {
  zh: '中文',
  ja: '日本語',
};

export const defaultLanguage: Language = 'zh';
