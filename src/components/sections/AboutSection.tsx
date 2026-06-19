import { useTheme } from "@/hooks/useTheme";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import FrameContent from "../dumb/FrameContent";

const AboutSection = () => {
	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);
	const { t } = useTranslation();
	const [isGrabbing, setIsGrabbing] = useState(false);

	const timeline = t("about.timeline", { returnObjects: true }) as Array<{
		year: string;
		title: string;
		description: string;
	}>;

	const stack = [
		"React",
		"TypeScript",
		"Next.js",
		"JavaScript",
		"Tailwind CSS",
		"GSAP",
		"Framer Motion",
		"Node.js",
		"Git",
		"Figma",
	];

	return (
		<section
			className="relative w-full h-full overflow-hidden text-white dark:text-white bg-gradient-to-b from-violet-600 to-purple-800 dark:from-dark-muted dark:to-dark-bg-2"
			id="about"
		>
			<FrameContent>
				{/* Header — centered, constrained measure */}
				<div className="relative z-10 w-full text-center mb-4 md:mb-6">
					<h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
						{t("about.title")}
					</h2>
					<p className="text-base md:text-lg text-white/90 mx-auto max-w-[42rem]">
						{t("about.description")}
					</p>
				</div>

				{/* Stack — centered */}
				<div className="relative z-10 w-full mb-4 md:mb-6 text-center">
					<p className="text-xs uppercase tracking-[0.2em] text-white/70 dark:text-yellow-500 mb-3">
						{t("about.stackLabel")}
					</p>
					<ul className="flex flex-wrap justify-center gap-2 mx-auto max-w-[44rem]">
						{stack.map((tech) => (
							<li
								key={tech}
								className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/25 text-white"
							>
								{tech}
							</li>
						))}
					</ul>
				</div>

				{/* Timeline — draggable (free momentum), edge-faded, no controls.
				    The grab cursor + the slides fading out at both edges make the
				    horizontal drag clear without any chrome. */}
				<div className="relative z-10 w-full mb-6 md:mb-8">
					<p className="text-center text-xs uppercase tracking-[0.2em] text-white/70 dark:text-yellow-500 mb-3 md:mb-5">
						{t("about.timelineLabel")}
					</p>
					<div className="relative [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
						{/* connecting rail the nodes sit on (aligned to the dot centers) */}
						<div className="absolute top-[48px] left-0 w-full h-px bg-white/25 dark:bg-yellow-500/60" />
						<Swiper
							modules={[FreeMode]}
							freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
							spaceBetween={16}
							slidesPerView={1.4}
							breakpoints={{
								640: { slidesPerView: 2.6 },
								1024: { slidesPerView: 3.6 },
							}}
							className={isGrabbing ? "cursor-grabbing" : "cursor-grab"}
							onTouchStart={() => setIsGrabbing(true)}
							onTouchEnd={() => setIsGrabbing(false)}
							onMouseDown={() => setIsGrabbing(true)}
							onMouseUp={() => setIsGrabbing(false)}
						>
							{timeline.map((item) => (
								<SwiperSlide key={item.title} className="select-none">
									<div className="flex flex-col items-center text-center">
										{/* year, sitting just above the rail */}
										<p className="font-display text-xl sm:text-2xl font-extrabold tabular-nums leading-none text-white dark:text-yellow-500 h-9 flex items-center">
											{item.year}
										</p>
										{/* node dot, centered on the rail (rail is at 58px) */}
										<span className="mt-[6px] w-3 h-3 rounded-full bg-white dark:bg-yellow-500 ring-4 ring-white/10 dark:ring-yellow-500/20" />
										<p className="mt-5 md:mt-7 font-display text-white font-bold text-base sm:text-lg">
											{item.title}
										</p>
										<p className="mt-1.5 text-sm text-white/70 leading-snug max-w-[15rem] px-2">
											{item.description}
										</p>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>

				{/* Quote — centered, hidden on mobile where vertical room is tight */}
				<div className="relative z-10 hidden md:block text-center italic text-white/80 dark:text-white/70 mx-auto max-w-[42rem]">
					<p>{t("about.quote")}</p>
				</div>
			</FrameContent>

			<div className="absolute bottom-0 left-0 w-full h-[60vh] z-0 overflow-hidden">
				<svg
					className="absolute w-full h-full"
					viewBox="0 0 1440 460"
					preserveAspectRatio="none"
				>
					<title>Wave Layer 1</title>
					<path
						fill={isDark ? "#2a2a2a" : "#7c3aed"}
						fillOpacity="1"
						d="M0,160C360,240,1080,80,1440,160V320H0Z"
					>
						<animate
							attributeName="d"
							dur="15s"
							repeatCount="indefinite"
							values="M0,160C360,240,1080,80,1440,160V320H0Z;M0,180C480,120,960,200,1440,140V320H0Z;M0,160C360,240,1080,80,1440,160V320H0Z"
						/>
					</path>
				</svg>
				<svg
					className="absolute w-full h-full"
					viewBox="0 0 1440 340"
					preserveAspectRatio="none"
				>
					<title>Wave Layer 2</title>
					<path
						fill={isDark ? "#1e1e1e" : "#6b21a8"}
						fillOpacity="0.5"
						d="M0,180C480,120,960,200,1440,140V320H0Z"
					>
						<animate
							attributeName="d"
							dur="20s"
							repeatCount="indefinite"
							values="M0,180C480,120,960,200,1440,140V320H0Z;M0,200C360,160,1080,240,1440,180V320H0Z;M0,180C480,120,960,200,1440,140V320H0Z"
						/>
					</path>
				</svg>
				<svg
					className="absolute w-full h-full"
					viewBox="0 0 1440 220"
					preserveAspectRatio="none"
				>
					<title>Wave Layer 3</title>
					<path
						fill={isDark ? "#121212" : "#581c87"}
						fillOpacity="0.4"
						d="M0,190C400,150,1040,250,1440,200V320H0Z"
					>
						<animate
							attributeName="d"
							dur="25s"
							repeatCount="indefinite"
							values="M0,190C400,150,1040,250,1440,200V320H0Z;M0,170C380,190,1080,180,1440,210V320H0Z;M0,190C400,150,1040,250,1440,200V320H0Z"
						/>
					</path>
				</svg>
			</div>
		</section>
	);
};

export default AboutSection;
