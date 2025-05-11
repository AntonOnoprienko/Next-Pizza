import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import en from '../../public/locales/en/common.json';
import uk from '../../public/locales/uk/common.json';
import ru from '../../public/locales/ru/common.json';

i18next.use(initReactI18next).init({
  resources: {
    en: { common: en },
    uk: { common: uk },
    ru: { common: ru },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
