import { useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import "swiper/css";

const AboutSection = () => {
	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);
	const { t } = useTranslation();

	const timeline = t("about.timeline", { returnObjects: true }) as Array<{
		year: string;
		title: string;
		description: string;
	}>;

	return (
		<section
			className="relative w-full min-h-screen px-6 py-24 flex flex-col justify-center items-center overflow-hidden text-white dark:text-white bg-gradient-to-b from-violet-600 to-purple-800 dark:from-dark-muted dark:to-dark-bg-2"
			id="about"
		>
			<div className="relative z-10 w-full text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">
					{t("about.title")}
				</h2>
				<p className="text-lg md:text-xl text-white/90 dark:text-white/80 mx-auto max-w-6xl">
					{t("about.description")}
				</p>
			</div>

			<div className="relative z-10 w-full mb-20 px-2 sm:px-6">
				<div className="relative w-full">
					<div className="absolute top-[70px] left-0 w-full h-[2px] bg-white/30 dark:bg-yellow-500" />
					<Swiper
						spaceBetween={24}
						slidesPerView={1.2}
						breakpoints={{
							640: { slidesPerView: 2.5 },
							1024: { slidesPerView: 3.5 },
						}}
						className="pb-8"
					>
						{timeline.map((item) => (
							<SwiperSlide key={item.title} className="relative h-full">
								<div className="flex flex-col items-center">
									<p className="text-white/70 dark:text-yellow-500 italic text-sm mb-2">
										{item.year}
									</p>
									<div className="h-[40px] w-[2px] bg-white/40 dark:bg-yellow-500 mb-4" />
									<div className="text-center px-4">
										<p className="text-white font-bold text-base mb-1">
											{item.title}
										</p>
										<p className="text-sm text-white mx-auto leading-snug max-w-72">
											{item.description}
										</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			<div className="relative z-10 text-center italic text-white/80 dark:text-white/60">
				<p>{t("about.quote")}</p>
			</div>

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
