import { I18nProvider } from "@/i18n/I18nProvider";

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return <I18nProvider locale={locale}>{children}</I18nProvider>;
}
