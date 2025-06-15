"use client";

import ThemeToggle from "@/components/dumb/ThemeToggle";
import SiteGuide from "@/components/sections/SiteGuide";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { ArrowDown, ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type SwiperCore from "swiper";
import { EffectCreative, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
	ssr: false,
});

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

	const { t } = useTranslation("translation");

	return (
		<main className="w-screen h-screen overflow-hidden relative bg-frame-white p-[clamp(8px,2vw,16px)] cursor-default">
			<SiteGuide />
			<div className="absolute top-4 z-50 w-[calc(100vw-2rem)] flex justify-between items-center px-6">
				<Image
					src={"/images/me.png"}
					width={isDesktop ? 100 : 70}
					height={isDesktop ? 84.38 : 59.06}
					className="cursor-pointer w-auto h-auto"
					alt="logo"
					onClick={() => swiper?.slideTo(0)}
					priority
				/>
				<ThemeToggle />
			</div>

			<Swiper
				className="w-full h-[calc(100vh-1.5rem)] md:h-[calc(100vh-2rem)] overflow-hidden"
				onSwiper={setSwiper}
				direction="vertical"
				slidesPerView={1}
				mousewheel={true}
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
				modules={[Mousewheel, EffectCreative]}
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
					<ContactSection />
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
							<ArrowUp
								className={`w-8 h-8 hidden lg:inline ${activeIndex === 0 ? "cursor-not-allowed" : "hover:animate-bounce cursor-pointer"}`}
								color={activeIndex === 0 ? "#d1d1d1" : "#f6f6f6"}
								onClick={() => swiper?.slidePrev()}
							/>
							<ArrowDown
								className={`w-8 h-8 hidden lg:inline ${activeIndex === SECTION_NUMBER - 1 ? "cursor-not-allowed" : "hover:animate-bounce cursor-pointer"}`}
								color={
									activeIndex === SECTION_NUMBER - 1 ? "#d1d1d1" : "#f6f6f6"
								}
								onClick={() => swiper?.slideNext()}
							/>
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
