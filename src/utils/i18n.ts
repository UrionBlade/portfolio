import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/translation.json";
import it from "../../public/locales/it/translation.json";

// Translations are bundled as static resources (no HTTP backend) so they are
// available during server rendering. The route locale is applied by
// I18nProvider via changeLanguage().
if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources: {
			it: { translation: it },
			en: { translation: en },
		},
		lng: "it",
		fallbackLng: "it",
		supportedLngs: ["it", "en"],
		interpolation: { escapeValue: false },
		react: { useSuspense: false },
	});
}

export default i18n;
