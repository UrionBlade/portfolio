"use client";

import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import Button from "../dumb/Button";
import FrameContent from "../dumb/FrameContent";

interface HeroSectionProps {
	onCTAProject?: () => void;
	onCTAContact?: () => void;
}

const HeroSection: FC<HeroSectionProps> = ({ onCTAProject }) => {
	const { t, i18n } = useTranslation();
	const { theme } = useTheme();
	const { isMobile } = useDeviceDetection();

	const cvHref = i18n.language?.toLowerCase().startsWith("en")
		? "/cv/Matteo_Poli_CV_EN.pdf"
		: "/cv/Matteo_Poli_CV_IT.pdf";

	const isDark = useMemo(() => theme === "dark", [theme]);

	const accentSteps: string[] = [
		"text-purple-300",
		"text-coral-200",
		"text-orange-200",
		"text-mint-300",
		"text-sky-300",
	];

	const [accentStep, setAccentStep] = useState(0);
	const currentAccent = useMemo(() => {
		if (isDark) return "text-yellow-500";
		return accentSteps[accentStep % accentSteps.length];
	}, [isDark, accentStep]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (isDark) {
			const container = document.getElementById("grid-bg");
			if (container) container.innerHTML = "";
			return;
		}
		if (typeof window === "undefined") return;
		const container = document.getElementById("grid-bg");
		if (!container) return;

		const size = isMobile ? 40 : 140;
		const cols = Math.ceil(window.innerWidth / size);
		const rows = Math.ceil(window.innerHeight / size);
		const total = cols * rows;

		container.innerHTML = "";
		container.style.display = "grid";
		container.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
		container.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;

		const blocks: HTMLDivElement[] = [];

		for (let i = 0; i < total; i++) {
			const div = document.createElement("div");
			div.style.width = `${size}px`;
			div.style.height = `${size}px`;
			div.style.transition =
				"background 0.8s ease-in-out, transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)";

			div.style.background = "#cc5252"; // coral-600
			blocks.push(div);
			container.appendChild(div);
		}

		let colorStep = 0;
		const colors = ["#cc5252", "#cc6600", "#00996e", "#0066cc", "#811f99"];

		const animate = () => {
			const delayMap: Map<number, HTMLDivElement[]> = new Map();
			setAccentStep((prev) =>
				prev + 1 > accentSteps.length - 1 ? 0 : prev + 1,
			);
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const index = row * cols + col;
					const diagonal = row + col;
					if (!delayMap.has(diagonal)) delayMap.set(diagonal, []);
					const delay = diagonal * 100;
					setTimeout(() => {
						const block = blocks[index];
						block.style.transform = "rotateY(180deg)";
						block.style.background = colors[colorStep % colors.length];
						setTimeout(() => {
							block.style.transform = "rotateY(0deg)";
						}, 600);
					}, delay);
				}
			}
			colorStep++;
		};

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		animate();
		const interval = setInterval(animate, 10000);
		return () => clearInterval(interval);
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
					className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4 w-full"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.6 }}
				>
					<Button onClick={onCTAProject} variant="primary" type="button">
						{t("hero.cta_projects")}
					</Button>
					<Button
						onClick={() => {
							const a = document.createElement("a");
							a.href = cvHref;
							a.download = "";
							document.body.appendChild(a);
							a.click();
							a.remove();
						}}
						variant="secondary"
						type="button"
					>
						{t("hero.cta_cv")}
					</Button>
				</motion.div>
			</FrameContent>
		</section>
	);
};

export default HeroSection;
