"use client";

import ThemeToggle from "@/components/dumb/ThemeToggle";
// Hero is server-rendered (above the fold) so the headline is in the initial
// HTML → fast LCP + crawlable. Below-the-fold sections stay client-only.
import HeroSection from "@/components/sections/HeroSection";
import SiteGuide from "@/components/sections/SiteGuide";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { ArrowDown, ArrowUp, FileDown, Linkedin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type SwiperCore from "swiper";
import { EffectCreative, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const AboutSection = dynamic(
	() => import("@/components/sections/AboutSection"),
	{
		ssr: false,
	},
);

const ContactSection = dynamic(
	() => import("@/components/sections/ContactSection"),
	{
		ssr: false,
	},
);

const ProjectsSection = dynamic(
	() => import("@/components/sections/ProjectSection"),
	{
		ssr: false,
	},
);

const ServicesSection = dynamic(
	() => import("@/components/sections/ServicesSection"),
	{
		ssr: false,
	},
);

const SECTION_NUMBER = 5;

export default function Home() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [swiper, setSwiper] = useState<SwiperCore | null>(null);
	const { isMobile, isDesktop } = useDeviceDetection();

	const { t, i18n } = useTranslation("translation");
	const cvHref = i18n.language?.toLowerCase().startsWith("en")
		? "/cv/Matteo_Poli_CV_EN.pdf"
		: "/cv/Matteo_Poli_CV_IT.pdf";

	return (
		<main className="w-screen h-[100dvh] overflow-hidden relative bg-frame-white p-[clamp(8px,2vw,16px)] cursor-default">
			<SiteGuide />
			<div className="absolute top-4 z-40 w-[calc(100vw-2rem)] flex justify-between items-center lg:px-6">
				<Image
					src={"/images/me.png"}
					width={isDesktop ? 100 : 70}
					height={isDesktop ? 84.38 : 59.06}
					className="cursor-pointer w-auto h-auto"
					alt="logo"
					onClick={() => swiper?.slideTo(0)}
					priority
				/>
				<div className="flex items-center gap-2 md:gap-3">
					<a
						href="https://www.linkedin.com/in/urion"
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t("actions.linkedin")}
						className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white"
					>
						<Linkedin
							className="w-5 h-5"
							fill="currentColor"
							aria-hidden="true"
						/>
						<span className="sr-only">LinkedIn</span>
					</a>
					<a
						href={cvHref}
						download
						aria-label={t("actions.cv")}
						className="flex items-center gap-1.5 rounded-full bg-white text-black font-semibold text-sm px-3 h-9 shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						<FileDown className="w-4 h-4" />
						<span>CV</span>
					</a>
					<ThemeToggle />
				</div>
			</div>

			<Swiper
				className="w-full h-full overflow-hidden"
				onSwiper={setSwiper}
				direction="vertical"
				slidesPerView={1}
				mousewheel={true}
				keyboard={{ enabled: true }}
				effect="creative"
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				creativeEffect={{
					prev: {
						shadow: true,
						translate: [0, "-20%", -1],
					},
					next: {
						translate: [0, "100%", 0],
					},
				}}
				modules={[Mousewheel, EffectCreative, Keyboard]}
			>
				<SwiperSlide>
					<HeroSection
						onCTAProject={() => swiper?.slideTo(2)}
						onCTAContact={() => swiper?.slideTo(4)}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ServicesSection />
				</SwiperSlide>
				<SwiperSlide>
					<ProjectsSection />
				</SwiperSlide>
				<SwiperSlide>
					<AboutSection />
				</SwiperSlide>
				<SwiperSlide>
					<ContactSection active={activeIndex >= 3} />
				</SwiperSlide>
			</Swiper>
			<footer className="w-full left-0 bottom-4 md:bottom-8 absolute z-40 px-4 md:px-8 flex justify-between items-center">
				<div className="w-[190px]">
					<h2 className="text-gray-50 font-light text-[0.5rem] sm:text-xs md:text-lg">
						{t("footer.copyright")}
					</h2>
				</div>
				<div className="w-1/2 flex justify-center items-center">
					<div className="w-1/2 h-[2px] relative">
						<div className="bg-gray-50 w-full h-[2px] absolute" />
						<div
							className="bg-gray-300 h-[2px] absolute transiton-all duration-500"
							style={{
								width: `${(SECTION_NUMBER - 1 - activeIndex) * (100 / (SECTION_NUMBER - 1))}%`,
							}}
						/>
					</div>
					<div className="w-1/2 h-[2px] relative">
						<div className="bg-gray-300 w-full h-[2px] absolute" />
						<div
							className="bg-gray-50 h-[2px] absolute transiton-all duration-500"
							style={{
								width: `${activeIndex * (100 / (SECTION_NUMBER - 1))}%`,
							}}
						/>
					</div>
				</div>
				<div className="flex justify-end items-center gap-2 w-[190px]">
					{!isMobile && (
						<>
							<button
								type="button"
								aria-label={t("footer.navigation.prev")}
								disabled={activeIndex === 0}
								onClick={() => swiper?.slidePrev()}
								className="hidden lg:inline-flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-gray-50"
							>
								<ArrowUp
									className="w-8 h-8 hover:animate-bounce motion-reduce:hover:animate-none"
									color="#f6f6f6"
									aria-hidden="true"
								/>
							</button>
							<button
								type="button"
								aria-label={t("footer.navigation.next")}
								disabled={activeIndex === SECTION_NUMBER - 1}
								onClick={() => swiper?.slideNext()}
								className="hidden lg:inline-flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-gray-50"
							>
								<ArrowDown
									className="w-8 h-8 hover:animate-bounce motion-reduce:hover:animate-none"
									color="#f6f6f6"
									aria-hidden="true"
								/>
							</button>
						</>
					)}
					<h2 className="text-gray-50 font-light text-xs md:text-lg select-none cursor-text text-end">
						{activeIndex + 1} / {SECTION_NUMBER}
					</h2>
				</div>
			</footer>
		</main>
	);
}
