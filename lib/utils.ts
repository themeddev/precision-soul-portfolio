import { profile } from './data-loader';
import type { Language } from '../types';

export const updateDocumentTitle = (language: Language) => {
  document.title = `${profile.name} | ${profile.title}`;
};

export const updateDocumentLang = (language: Language) => {
  document.documentElement.lang = language;
};
