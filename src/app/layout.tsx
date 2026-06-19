import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import ThemeBoot from "@/components/dumb/ThemeBoot";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.matteo-poli.com"),
	title: "Matteo Poli — Front-end Developer",
	description:
		"Front-end developer freelance: interfacce animate, veloci e accessibili in React, Next.js e TypeScript. Pluripremiato ai CSS Design Awards.",
	applicationName: "Matteo Poli",
	authors: [{ name: "Matteo Poli", url: "https://www.matteo-poli.com" }],
	creator: "Matteo Poli",
	keywords: [
		"Matteo Poli",
		"front-end developer",
		"sviluppatore front-end",
		"React",
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"GSAP",
		"Framer Motion",
		"web developer freelance",
		"Besozzo",
		"Varese",
		"CSS Design Awards",
	],
	robots: { index: true, follow: true },
	alternates: {
		canonical: "/",
		languages: { it: "/it", en: "/en" },
	},
	openGraph: {
		type: "website",
		siteName: "Matteo Poli",
		title: "Matteo Poli — Front-end Developer",
		description:
			"Interfacce animate, veloci e accessibili in React e Next.js. Pluripremiato ai CSS Design Awards.",
		url: "https://www.matteo-poli.com",
	},
	twitter: {
		card: "summary_large_image",
		title: "Matteo Poli — Front-end Developer",
		description:
			"Interfacce animate, veloci e accessibili. Pluripremiato ai CSS Design Awards.",
	},
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
		<html lang="it" suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: tiny trusted no-flash theme script
					dangerouslySetInnerHTML={{
						__html:
							"(function(){try{var r=localStorage.getItem('theme-store');var t=r?JSON.parse(r).state.theme:null;if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();",
					}}
				/>
			</head>
			<body className={`${poppins.className} antialiased`}>
				<ThemeBoot />
				{children}
				<Toaster
					position="top-center"
					toastOptions={{ duration: 3000, style: { marginTop: "2rem" } }}
				/>
				<Analytics />
			</body>
		</html>
	);
}
