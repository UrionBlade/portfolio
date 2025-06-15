import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
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
