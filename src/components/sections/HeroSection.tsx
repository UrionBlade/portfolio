"use client";

import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import Button from "../dumb/Button";
import FrameContent from "../dumb/FrameContent";

interface HeroSectionProps {
	onCTAProject?: () => void;
	onCTAContact?: () => void;
}

const ACCENT_STEPS = [
	"text-purple-300",
	"text-coral-200",
	"text-orange-200",
	"text-mint-300",
	"text-sky-300",
];

const AWARDS = [
	{
		src: "/images/awards/cssda-best-ui-purple.webp",
		alt: "CSS Design Awards — Best UI",
	},
	{
		src: "/images/awards/cssda-best-ux-orange.webp",
		alt: "CSS Design Awards — Best UX",
	},
	{
		src: "/images/awards/cssda-best-inn-green.webp",
		alt: "CSS Design Awards — Best Innovation",
	},
	{
		src: "/images/awards/cssda-special-kudos-yellow.webp",
		alt: "CSS Design Awards — Special Kudos",
	},
];

const HeroSection: FC<HeroSectionProps> = ({ onCTAProject }) => {
	const { t, i18n } = useTranslation();
	const { theme } = useTheme();
	const { isMobile } = useDeviceDetection();

	const cvHref = i18n.language?.toLowerCase().startsWith("en")
		? "/cv/Matteo_Poli_CV_EN.pdf"
		: "/cv/Matteo_Poli_CV_IT.pdf";

	const isDark = useMemo(() => theme === "dark", [theme]);

	const [accentStep, setAccentStep] = useState(0);
	const currentAccent = useMemo(() => {
		if (isDark) return "text-yellow-500";
		return ACCENT_STEPS[accentStep % ACCENT_STEPS.length];
	}, [isDark, accentStep]);

	// Cycle the "wow" accent color (light mode only, respects reduced motion).
	useEffect(() => {
		if (isDark) return;
		if (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		)
			return;
		const id = setInterval(
			() => setAccentStep((p) => (p + 1) % ACCENT_STEPS.length),
			2600,
		);
		return () => clearInterval(id);
	}, [isDark]);

	// Magnetic, mouse-reactive color grid (light mode only).
	useEffect(() => {
		if (typeof window === "undefined") return;
		const container = document.getElementById("grid-bg");
		if (!container) return;

		if (isDark) {
			container.innerHTML = "";
			return;
		}

		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const size = isMobile ? 56 : 120;
		const cols = Math.ceil(window.innerWidth / size);
		const rows = Math.ceil(window.innerHeight / size);

		// Brand palette sampled as a smooth left→right gradient.
		const palette = [
			[255, 107, 107], // coral
			[255, 128, 0], // orange
			[0, 255, 184], // mint
			[0, 127, 255], // sky
			[209, 55, 255], // orchid
		];
		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
		const colorAt = (f: number) => {
			const x = Math.max(0, Math.min(0.9999, f)) * (palette.length - 1);
			const i = Math.floor(x);
			const t = x - i;
			const a = palette[i];
			const b = palette[Math.min(palette.length - 1, i + 1)];
			return [
				Math.round(lerp(a[0], b[0], t)),
				Math.round(lerp(a[1], b[1], t)),
				Math.round(lerp(a[2], b[2], t)),
			];
		};

		container.innerHTML = "";
		container.style.display = "grid";
		container.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
		container.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;

		type Cell = {
			el: HTMLDivElement;
			cx: number;
			cy: number;
			rgb: number[];
			intensity: number;
		};
		const cells: Cell[] = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const wrap = document.createElement("div");
				wrap.style.width = `${size}px`;
				wrap.style.height = `${size}px`;
				wrap.style.padding = "4px";
				wrap.style.boxSizing = "border-box";
				const el = document.createElement("div");
				const rgb = colorAt(c / Math.max(1, cols - 1));
				el.style.width = "100%";
				el.style.height = "100%";
				el.style.borderRadius = "12px";
				el.style.backgroundColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.14)`;
				el.style.willChange = "transform, background-color";
				wrap.appendChild(el);
				container.appendChild(wrap);
				cells.push({
					el,
					cx: c * size + size / 2,
					cy: r * size + size / 2,
					rgb,
					intensity: 0,
				});
			}
		}

		// Static, calm grid for reduced-motion users.
		if (reduce) return;

		let mouseX = -9999;
		let mouseY = -9999;
		const radius = isMobile ? 170 : 260;
		const onMove = (e: PointerEvent) => {
			const rect = container.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		};
		const onLeave = (e: PointerEvent) => {
			if (e.relatedTarget) return; // only when the pointer truly leaves the window
			mouseX = -9999;
			mouseY = -9999;
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerout", onLeave, { passive: true });

		let raf = 0;
		let startTs = 0;
		const tick = (ts: number) => {
			if (!startTs) startTs = ts;
			const time = ts - startTs;
			for (const cell of cells) {
				// soft ambient wave so the grid breathes even at rest
				const ambient =
					0.1 + 0.08 * Math.sin(time * 0.0011 + (cell.cx + cell.cy) * 0.0045);
				// magnetic falloff around the cursor
				const dx = cell.cx - mouseX;
				const dy = cell.cy - mouseY;
				const m = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / radius);
				const target = Math.max(ambient, m * m);
				cell.intensity += (target - cell.intensity) * 0.12;
				const i = cell.intensity;
				cell.el.style.backgroundColor = `rgba(${cell.rgb[0]},${cell.rgb[1]},${cell.rgb[2]},${(0.1 + i * 0.85).toFixed(3)})`;
				cell.el.style.transform = `scale(${(1 + i * 0.16).toFixed(3)})`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerout", onLeave);
		};
	}, [isDark, isMobile]);

	return (
		<section className="relative w-full h-full overflow-hidden text-white bg-dark-muted dark:bg-dark-bg-1 dark:text-white transition-colors duration-500">
			{/* Background grid effect - only on light mode */}
			<div
				id="grid-bg"
				className="absolute inset-0 z-0 pointer-events-none dark:hidden"
			/>

			{/* Content */}
			<FrameContent className="items-center max-w-6xl mx-auto">
				<motion.div
					className="flex items-center gap-2 mb-6 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm px-4 py-1.5"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<span className="relative flex h-2.5 w-2.5">
						<span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping motion-reduce:hidden" />
						<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
					</span>
					<span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-white">
						{t("hero.available")}
					</span>
				</motion.div>

				<motion.h1
					className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					{t("hero.headline")}{" "}
					<span className={`transition-colors duration-200 ${currentAccent}`}>
						{t("hero.exclamation")}
					</span>
				</motion.h1>

				<motion.p
					className="mt-6 text-sm sm:text-lg md:text-2xl text-center text-white dark:text-neutral-300"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.8 }}
				>
					{t("hero.description")}
				</motion.p>

				<motion.div
					className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 w-full"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.6 }}
				>
					<Button
						onClick={() => {
							const a = document.createElement("a");
							a.href = cvHref;
							a.download = "";
							document.body.appendChild(a);
							a.click();
							a.remove();
						}}
						variant="primary"
						type="button"
					>
						{t("hero.cta_cv")}
					</Button>
					<Button onClick={onCTAProject} variant="secondary" type="button">
						{t("hero.cta_projects")}
					</Button>
				</motion.div>

				<motion.div
					className="mt-7 flex flex-col items-center gap-2"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.95, duration: 0.6 }}
				>
					<span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
						{t("hero.awards")}
					</span>
					<a
						href="https://www.cssdesignawards.com/sites/matteo-poli-portfolio/47906/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t("hero.awards")}
						className="group flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						{AWARDS.map((a) => (
							<Image
								key={a.src}
								src={a.src}
								alt={a.alt}
								width={48}
								height={48}
								className="w-10 h-10 md:w-12 md:h-12 drop-shadow-md transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-0.5 motion-reduce:transition-none"
							/>
						))}
					</a>
				</motion.div>
			</FrameContent>
		</section>
	);
};

export default HeroSection;
