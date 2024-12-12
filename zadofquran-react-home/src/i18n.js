import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./translations/en.json";
import arTranslations from "./translations/ar.json";

i18n.use(initReactI18next).init({
    supportedLngs: ["en", "ar"],
    resources: {
        en: {
            translation: enTranslations,
        },
        ar: {
            translation: arTranslations,
        },
    },
    lng: "ar",
    fallbackLng: "ar",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
