import { useEffect, useRef, useState, useMemo } from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

const projects = [
	{
		title: "Cataclysm",
		description:
			"Cataclysm è un gioco multiplayer gratuito in cui il lavoro di squadra è la chiave per la sopravvivenza. Tu e il tuo team di quattro giocatori dovete unirvi per sconfiggere orde infinite di mostruosi nemici.",
		url: "https://cataclysm-game.com/",
		image: "/images/cataclysm-loop.mp4",
	},
	{
		title: "Flower Shop",
		description:
			"Da sessant'anni coltiviamo la bellezza e portiamo natura nelle vostre case. Scoprite la nostra selezione di fiori freschi, bouquet artigianali e piante da interno.",
		url: "https://flower-shop-website-lime.vercel.app/",
		image: "/images/bouquet3.webp",
	},
];

const GooeyBackground = () => {
	const COLOR = "#339aff";
	return (
		<svg
			className="absolute inset-0 w-full h-full z-10 pointer-events-none"
			viewBox="0 0 800 600"
			preserveAspectRatio="xMidYMid slice"
		>
			<title>Animated gooey background</title>
			<defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
					<feColorMatrix
						in="blur"
						mode="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
						result="goo"
					/>
					<feBlend in="SourceGraphic" in2="goo" />
				</filter>
			</defs>
			<g filter="url(#goo)">
				<circle cx="200" cy="300" r="80" fill={COLOR}>
					<animate
						attributeName="cx"
						values="200;400;180;200"
						dur="8s"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="cy"
						values="300;200;320;300"
						dur="6s"
						repeatCount="indefinite"
					/>
				</circle>
				<circle cx="500" cy="350" r="100" fill={COLOR}>
					<animate
						attributeName="cx"
						values="500;300;520;500"
						dur="10s"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="cy"
						values="350;400;340;350"
						dur="7s"
						repeatCount="indefinite"
					/>
				</circle>
				<circle cx="350" cy="200" r="60" fill={COLOR}>
					<animate
						attributeName="cx"
						values="350;450;330;350"
						dur="9s"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="cy"
						values="200;250;190;200"
						dur="5s"
						repeatCount="indefinite"
					/>
				</circle>
			</g>
		</svg>
	);
};

const ProjectCard = ({
	title,
	description,
	url,
	image,
}: {
	title: string;
	description: string;
	url: string;
	image: string;
}) => {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="relative p-6 flex flex-col justify-between rounded-[2rem] bg-gradient-to-br from-neutral-100/70 to-white/30 dark:from-neutral-800/70 dark:to-neutral-900/30 shadow-xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group hover:scale-[1.03] hover:rotate-[1deg] h-full hover:shadow-lg hover:shadow-yellow-500/30 transform"
		>
			{image.includes("mp4") ? (
				<video
					src={image}
					autoPlay
					loop
					muted
					className="rounded-xl w-full h-48 object-cover mb-4 group-hover:scale-105 transition duration-500"
				/>
			) : (
				<div className="h-48 relative mb-4">
					<Image
						src={image}
						alt={title}
						fill
						className="rounded-xl w-full h-48 object-cover object-top mb-4 group-hover:scale-105 transition duration-500"
					/>
				</div>
			)}
			<div>
				<h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
					{title}
				</h3>
				<p className="text-sm text-neutral-700 dark:text-neutral-300">
					{description}
				</p>
			</div>
		</a>
	);
};

const ProjectsSection = () => {
	const { isMobile } = useDeviceDetection();
	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);

	return (
		<section
			className="relative min-h-screen w-full px-6 py-24 flex flex-col justify-center items-center overflow-hidden dark:bg-dark-bg-1 bg-sky-500"
			id="projects"
		>
			{!isDark && <GooeyBackground />}
			<div className="relative z-20 w-full max-w-screen-xl mx-auto">
				<div className="mb-12">
					<h2 className="text-3xl md:text-5xl font-bold text-left text-white dark:text-white">
						Alcuni tra i miei progetti
					</h2>
				</div>
				{isMobile ? (
					<Swiper
						spaceBetween={24}
						slidesPerView={1.2}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch"
					>
						{projects.map((project, i) => (
							<SwiperSlide key={project.title} className="h-full">
								<ProjectCard {...project} />
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
						{projects.map((project) => (
							<div key={project.title} className="h-full">
								<ProjectCard {...project} />
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default ProjectsSection;
