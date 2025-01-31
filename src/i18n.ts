import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../public/locales/en-translation.json";
import itTranslations from "../public/locales/it-translation.json"
import esTranslations from "../public/locales/es-translation.json"

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations
    },
    es: {
      translation: esTranslations
    },
    it: {
      translation: itTranslations
    },
  },
});

export default i18n;
