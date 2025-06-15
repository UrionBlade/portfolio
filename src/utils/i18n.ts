// i18n.ts (opzionale se vuoi configurare i18next manualmente)
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "it",
		supportedLngs: ["it"],
		debug: process.env.NODE_ENV === "development",
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: "/locales/{{lng}}/translation.json",
		},
	});

export default i18n;
