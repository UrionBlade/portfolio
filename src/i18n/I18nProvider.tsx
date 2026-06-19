"use client";

import i18n from "@/utils/i18n";

import { useEffect } from "react";

export function I18nProvider({
	children,
	locale,
}: {
	children: React.ReactNode;
	locale: string;
}) {
	useEffect(() => {
		if (i18n.language !== locale) {
			i18n.changeLanguage(locale);
		}
		// keep <html lang> in sync with the active locale
		if (typeof document !== "undefined") {
			document.documentElement.lang = locale;
		}
	}, [locale]);

	return <>{children}</>;
}
