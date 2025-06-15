import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
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
	minimumScale: 0.5,
	maximumScale: 5,
	width: "device-width",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="it">
			<body className={`${poppins.className} antialiased`}>
				{children}
				<Toaster
					position="top-center"
					toastOptions={{ duration: 3000, style: { marginTop: "2rem" } }}
				/>
			</body>
		</html>
	);
}
