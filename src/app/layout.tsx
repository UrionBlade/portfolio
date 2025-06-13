import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import I18NProvider from "./i18n-providers";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>
				<I18NProvider>{children}</I18NProvider>
			</body>
		</html>
	);
}
