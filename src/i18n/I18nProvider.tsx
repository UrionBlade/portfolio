"use client";

import "@/app/[locale]/i18n";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function I18nProvider({
	children,
	locale,
}: {
	children: React.ReactNode;
	locale: string;
}) {
	const { i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language !== locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale, i18n]);

	return <>{children}</>;
}
