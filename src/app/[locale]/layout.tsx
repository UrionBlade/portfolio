import { I18nProvider } from "@/i18n/I18nProvider";
import type { Metadata } from "next";

const COPY = {
	it: {
		title: "Matteo Poli — Front-end Developer",
		description:
			"Front-end developer freelance: interfacce animate, veloci e accessibili in React, Next.js e TypeScript. Pluripremiato ai CSS Design Awards.",
	},
	en: {
		title: "Matteo Poli — Front-end Developer",
		description:
			"Freelance front-end developer: animated, fast and accessible interfaces in React, Next.js and TypeScript. Award-winning at the CSS Design Awards.",
	},
} as const;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const copy = COPY[locale === "en" ? "en" : "it"];
	return {
		title: { absolute: copy.title },
		description: copy.description,
		alternates: {
			canonical: `/${locale}`,
			languages: { it: "/it", en: "/en" },
		},
		openGraph: {
			title: copy.title,
			description: copy.description,
			url: `https://www.matteo-poli.com/${locale}`,
			locale: locale === "en" ? "en_US" : "it_IT",
		},
	};
}

const personLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Matteo Poli",
	jobTitle: "Front-end Developer",
	url: "https://www.matteo-poli.com",
	image: "https://www.matteo-poli.com/images/me.png",
	sameAs: [
		"https://www.linkedin.com/in/urion",
		"https://www.cssdesignawards.com/sites/matteo-poli-portfolio/47906/",
	],
	knowsAbout: [
		"React",
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"GSAP",
		"Framer Motion",
		"UI Design",
		"UX Design",
		"Web Accessibility",
		"Web Performance",
	],
	address: {
		"@type": "PostalAddress",
		addressLocality: "Besozzo",
		addressRegion: "VA",
		addressCountry: "IT",
	},
	award: [
		"CSS Design Awards — Best UI Design",
		"CSS Design Awards — Best UX Design",
		"CSS Design Awards — Best Innovation",
		"CSS Design Awards — Special Kudos",
	],
};

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return (
		<I18nProvider locale={locale}>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static, trusted JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
			/>
			{children}
		</I18nProvider>
	);
}
