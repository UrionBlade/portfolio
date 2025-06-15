import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18nextConfig from "../../../next-i18next.config";

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		...i18nextConfig,
		lng: i18nextConfig.defaultLocale,
		fallbackLng: i18nextConfig.fallbackLng,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
