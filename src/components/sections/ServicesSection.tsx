import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Tone = "ink" | "snow";
type Item = { title: string; text: string };

// ink = dark text on the bright layer (revealed by the spotlight),
// snow = light text on the dark overlay (the default, fully legible state).
// Both layers render identical markup so the mask reveal lines up perfectly.
const TONES: Record<
	Tone,
	{ head: string; body: string; idx: string; idxHover: string; rule: string }
> = {
	ink: {
		head: "text-neutral-900",
		body: "text-neutral-800",
		idx: "text-neutral-900/25",
		idxHover: "group-hover:text-neutral-900/60",
		rule: "border-neutral-900/15",
	},
	snow: {
		head: "text-white",
		body: "text-neutral-200",
		idx: "text-white/25",
		idxHover: "group-hover:text-yellow-500",
		rule: "border-white/15",
	},
};

function ServicesContent({
	items,
	tone,
}: {
	items: [string, Item][];
	tone: Tone;
}) {
	const { t } = useTranslation();
	const c = TONES[tone];

	return (
		<div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8">
			<header className="max-w-[42rem]">
				<h2
					className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none ${c.head}`}
				>
					{t("services.title")}
				</h2>
				<p className={`mt-4 text-base sm:text-lg ${c.body}`}>
					{t("services.description")}
				</p>
			</header>

			<ol className="mt-8 sm:mt-12 grid gap-x-10 sm:grid-cols-2">
				{items.map(([key, { title, text }], i) => {
					const featured = i === 0;
					return (
						<li
							key={key}
							className={`group flex gap-4 sm:gap-6 border-t py-5 sm:py-6 ${c.rule} ${
								featured ? "sm:col-span-2" : ""
							}`}
						>
							<span
								className={`font-display font-extrabold leading-none tabular-nums transition-colors duration-300 ${c.idx} ${c.idxHover} ${
									featured ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
								}`}
							>
								{String(i + 1).padStart(2, "0")}
							</span>
							<div className="min-w-0">
								<h3
									className={`font-display font-bold ${c.head} ${
										featured ? "text-xl sm:text-3xl" : "text-lg sm:text-xl"
									}`}
								>
									{title}
								</h3>
								<p
									className={`mt-1.5 ${c.body} ${
										featured
											? "text-sm sm:text-lg max-w-[40rem]"
											: "text-sm sm:text-base"
									}`}
								>
									{text}
								</p>
							</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
}

const ServicesSection = () => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLDivElement>(null);
	const { isMobile } = useDeviceDetection();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const items = Object.entries(
		t("services.items", { returnObjects: true }) as Record<string, Item>,
	);

	useEffect(() => {
		if (!sectionRef.current || isDark) return;

		const updatePosition = (e: MouseEvent) => {
			if (!sectionRef.current) return;
			const rect = sectionRef.current.getBoundingClientRect();
			setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
		};

		sectionRef.current.addEventListener("mousemove", updatePosition);
		return () => {
			sectionRef.current?.removeEventListener("mousemove", updatePosition);
		};
	}, [isDark]);

	return (
		<section
			ref={sectionRef}
			id="services"
			className="relative w-full h-full overflow-hidden flex items-center bg-neutral-200 dark:bg-dark-bg-2"
		>
			{isDark ? (
				<ServicesContent items={items} tone="snow" />
			) : (
				<>
					{/* Bright layer (ink) — revealed by the spotlight; shown directly on mobile.
					    z-0 makes it a stacking context so the overlay paints fully above it. */}
					<div className="absolute inset-0 z-0 flex items-center">
						<div className="absolute inset-0 bg-gradient-to-br from-sun-200 via-coral-300 to-orchid-300" />
						<ServicesContent items={items} tone="ink" />
					</div>

					{/* Dark overlay (snow) — the default, fully legible state. A radial
					    hole follows the cursor to reveal the bright layer beneath.
					    Desktop only; mobile shows the bright layer above. */}
					{!isMobile && (
						<div
							className="absolute inset-0 z-10 flex items-center bg-dark-bg-2 pointer-events-none"
							style={{
								WebkitMaskImage: `radial-gradient(circle 340px at ${mousePosition.x}px ${mousePosition.y}px, transparent 98%, black 100%)`,
								maskImage: `radial-gradient(circle 340px at ${mousePosition.x}px ${mousePosition.y}px, transparent 98%, black 100%)`,
								WebkitMaskRepeat: "no-repeat",
								maskRepeat: "no-repeat",
								transition:
									"mask-image 0.2s ease-out, -webkit-mask-image 0.2s ease-out",
							}}
						>
							<ServicesContent items={items} tone="snow" />
						</div>
					)}
				</>
			)}
		</section>
	);
};

export default ServicesSection;
