import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTheme } from "@/hooks/useTheme";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import FrameContent from "../dumb/FrameContent";

type ProjectConfig = {
	key: string;
	url: string;
	image: string;
	/** placement on the desktop 3×2 bento grid */
	span: string;
	/** tech stack — language-neutral, shown as chips */
	stack: string[];
	/** featured tile shows the full description + role inline */
	featured?: boolean;
};

const PROJECTS: ProjectConfig[] = [
	{
		key: "watermelon",
		url: "https://watermelon-studio.it",
		image: "/images/watermelon.webp",
		span: "lg:col-span-1 lg:row-span-2",
		stack: ["Next.js", "TypeScript", "Sanity", "GSAP", "Tailwind"],
		featured: true,
	},
	{
		key: "rachele",
		url: "https://rachele-dolcezze.pages.dev/",
		image: "/images/rachele.webp",
		span: "lg:col-span-1 lg:row-span-1",
		stack: ["Next.js", "Tailwind", "Cloudflare"],
	},
	{
		key: "silvana",
		url: "https://showcase-sites.pages.dev/",
		image: "/images/silvana.webp",
		span: "lg:col-span-1 lg:row-span-1",
		stack: ["Next.js", "GSAP", "Tailwind"],
	},
	{
		key: "lafontana",
		url: "https://lafontana.matteo-poli.workers.dev/",
		image: "/images/lafontana.webp",
		span: "lg:col-span-1 lg:row-span-1",
		stack: ["Next.js", "Tailwind", "Cloudflare"],
	},
	{
		key: "inkhaus",
		url: "https://showcase-tattoo-studio.pages.dev/",
		image: "/images/inkhaus.webp",
		span: "lg:col-span-1 lg:row-span-1",
		stack: ["React", "GSAP", "Tailwind"],
	},
];

const GooeyBackground = () => {
	const COLOR = "#339aff";
	return (
		<svg
			className="absolute inset-0 w-full h-full z-10 pointer-events-none motion-reduce:hidden"
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
	project,
	priority,
}: {
	project: ProjectConfig;
	priority?: boolean;
}) => {
	const { t } = useTranslation();
	const name = t(`projects.items.${project.key}.name`);
	const tag = t(`projects.items.${project.key}.tag`);
	const role = t(`projects.items.${project.key}.role`);
	const description = t(`projects.items.${project.key}.description`);

	return (
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${name} — ${t("projects.visit")}`}
			className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-[2rem] ${project.span} min-h-[12rem] lg:min-h-0 transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
		>
			<Image
				src={project.image}
				alt={name}
				fill
				sizes="(max-width: 1024px) 90vw, 33vw"
				priority={priority}
				className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
			/>
			{/* legibility scrim */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

			{/* tag + external arrow */}
			<div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
				<span className="inline-flex px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.15em] bg-white/85 text-black backdrop-blur-sm">
					{tag}
				</span>
				<ArrowUpRight
					aria-hidden="true"
					className="w-8 h-8 p-1.5 rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
				/>
			</div>

			{/* title + role + description + stack */}
			<div className="relative z-10 p-5 lg:p-6">
				<h3
					className={`font-extrabold text-white leading-tight ${
						project.featured ? "text-2xl lg:text-3xl" : "text-xl"
					}`}
				>
					{name}
				</h3>
				{project.featured && (
					<p className="text-[0.7rem] uppercase tracking-[0.15em] text-white/60 mt-1">
						{role}
					</p>
				)}
				<p
					className={`text-sm text-white/90 mt-2 ${
						project.featured ? "block" : "block line-clamp-2"
					}`}
				>
					{description}
				</p>
				<ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
					{project.stack.map((tech) => (
						<li
							key={tech}
							className="text-[0.6rem] font-semibold px-2 py-0.5 rounded-md bg-white/15 text-white/90 backdrop-blur-sm"
						>
							{tech}
						</li>
					))}
				</ul>
			</div>
		</a>
	);
};

const ProjectsSection = () => {
	const { isMobile } = useDeviceDetection();
	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);

	const { t } = useTranslation();

	return (
		<section
			className="relative h-full w-full overflow-hidden dark:bg-dark-bg-1 bg-sky-500"
			id="projects"
		>
			{!isDark && <GooeyBackground />}
			<FrameContent className="max-w-screen-xl mx-auto">
				<div className="mb-6 lg:mb-8 shrink-0">
					<h2 className="text-3xl md:text-5xl font-bold text-left text-white">
						{t("projects.title")}
					</h2>
					<p className="hidden lg:block text-white/85 text-base mt-3 max-w-[42rem]">
						{t("projects.description")}
					</p>
				</div>

				{isMobile ? (
					<Swiper
						spaceBetween={16}
						slidesPerView={1.1}
						className="flex-1 min-h-0 w-full !pb-6"
					>
						{PROJECTS.map((project, i) => (
							<SwiperSlide key={project.key} className="!h-full pb-2">
								<ProjectCard project={project} priority={i === 0} />
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:h-[clamp(24rem,56vh,38rem)]">
						{PROJECTS.map((project, i) => (
							<ProjectCard
								key={project.key}
								project={project}
								priority={i === 0}
							/>
						))}
					</div>
				)}
			</FrameContent>
		</section>
	);
};

export default ProjectsSection;
