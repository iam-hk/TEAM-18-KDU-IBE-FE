import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./English.json";
import translationFR from "./French.json";
import translationDE from "./German.json";

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  de: {
    translation: translationDE,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
