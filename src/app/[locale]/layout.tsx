import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import { dir } from "i18next";
import { I18nProvider } from "@/i18n/I18nProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Matteo Poli",
	description: "Costruisco esperienze digitali che fanno dire 'wow'!",
};

export const viewport: Viewport = {
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
	width: "device-width",
	userScalable: false,
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	return (
		<html lang={locale}>
			<body className={`${poppins.className} antialiased`}>
				<I18nProvider locale={locale}>{children}</I18nProvider>
				<Toaster
					position="top-center"
					toastOptions={{ duration: 3000, style: { marginTop: "2rem" } }}
				/>
			</body>
		</html>
	);
}
