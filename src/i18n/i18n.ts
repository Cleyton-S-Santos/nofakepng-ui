import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationPt from './locales/pt.json';
import translationEn from './locales/en.json';
import translationEs from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: translationPt,
      },
      en: {
        translation: translationEn,
      },
      es: {
        translation: translationEs,
      },
    },
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
