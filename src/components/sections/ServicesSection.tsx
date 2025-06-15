import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTheme } from "@/hooks/useTheme";
import {
	MonitorSmartphone,
	MousePointerClick,
	ShoppingBag,
	Workflow,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ServicesSection = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const sectionRef = useRef<HTMLDivElement>(null);
	const maskRef = useRef<HTMLDivElement>(null);
	const { isMobile } = useDeviceDetection();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const items = Object.entries(
		t("services.items", { returnObjects: true }) as Record<
			string,
			{ title: string; text: string }
		>,
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

	const icons = [
		<MonitorSmartphone key="monitor-smartphone" className="w-6 h-6" />,
		<ShoppingBag key="shopping-bag" className="w-6 h-6" />,
		<MousePointerClick key="mouse-pointer-click" className="w-6 h-6" />,
		<Workflow key="workflow" className="w-6 h-6" />,
	];

	return (
		<section
			ref={sectionRef}
			id="services"
			className="relative w-full h-full py-24 px-2 sm:px-6 text-black dark:text-white overflow-hidden bg-neutral-300 dark:bg-dark-bg-2 md:flex md:justify-center md:items-center"
		>
			{!isDark && (
				<>
					{/* Colorful duplicate layer below */}
					<div className="absolute z-0 inset-0 md:inset-auto md:w-full md:h-full md:flex md:justify-center md:items-center">
						<div className="absolute inset-0 bg-gradient-to-br from-pink-700 via-coral-700 to-orange-700 animate-[pulse_10s_infinite]" />
						<div className="relative z-10 max-w-6xl mx-auto text-center px-2 sm:px-6 py-24">
							<h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-neutral-900 drop-shadow-lg">
								{t("services.title")}
							</h2>
							<p className="text-base sm:text-lg md:text-xl mx-auto mb-8 sm:mb-12 text-neutral-800 ">
								{t("services.description")}
							</p>
							{isMobile ? (
								<>
									<Swiper
										spaceBetween={16}
										pagination={{
											clickable: true,
											el: ".custom-pagination",
											type: "bullets",
											bulletClass: "bg-dark-accent h-2 w-2 rounded-full",
											bulletActiveClass: "!bg-coral-200",
										}}
										modules={[Pagination]}
										className="pb-8"
									>
										{items.map(([key, { title, text }]) => (
											<SwiperSlide key={`slide-${key}`}>
												<div className="group p-4 rounded-xl bg-white/30 shadow-2xl flex flex-col items-start gap-4 backdrop-blur-md mx-2 transition-transform duration-300 ease-out hover:scale-105 hover:rotate-1 hover:shadow-pink-300/50">
													<div className="flex items-center justify-start gap-4">
														<div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shrink-0 shadow-md transform transition-transform duration-300 ease-out group-hover:rotate-12">
															{icons[Number(key) % icons.length]}
														</div>
														<h3 className="text-lg font-semibold mb-1 text-neutral-900">
															{title}
														</h3>
													</div>
													<p className="text-sm text-neutral-700">{text}</p>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
									<div className="custom-pagination mt-4 flex justify-center gap-2" />
								</>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
									{items.map(([key, { title, text }]) => (
										<div
											key={`mask-${key}`}
											className="group p-4 sm:p-6 rounded-xl bg-white/30 shadow-2xl flex items-start gap-4 backdrop-blur-md transition-transform duration-300 ease-out hover:scale-105 hover:rotate-1 hover:shadow-pink-300/50"
										>
											<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/70 flex items-center justify-center shrink-0 shadow-md transform transition-transform duration-300 ease-out group-hover:rotate-12">
												{icons[Number(key) % icons.length]}
											</div>
											<div>
												<h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-neutral-900">
													{title}
												</h3>
												<p className="text-sm sm:text-base text-neutral-700">
													{text}
												</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Dark overlay layer with mask */}
					{!isMobile && (
						<div
							ref={maskRef}
							className="absolute w-full h-full flex justify-center items-center z-10 bg-dark-bg-2 text-white pointer-events-none"
							style={{
								WebkitMaskImage: `radial-gradient(circle 340px at ${mousePosition.x}px ${mousePosition.y}px, transparent 98%, black 100%)`,
								maskImage: `radial-gradient(circle 340px at ${mousePosition.x}px ${mousePosition.y}px, transparent 98%, black 100%)`,
								WebkitMaskRepeat: "no-repeat",
								maskRepeat: "no-repeat",
								transition:
									"mask-image 0.2s ease-out, -webkit-mask-image 0.2s ease-out",
							}}
						>
							<div className="relative z-10 max-w-6xl mx-auto text-center px-2 sm:px-6 py-24">
								<h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
									{t("services.title")}
								</h2>
								<p className="text-base sm:text-lg md:text-xl mx-auto mb-8 sm:mb-12 ">
									{t("services.description")}
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
									{items.map(([key, { title, text }]) => (
										<div
											key={key}
											className="p-4 sm:p-6 rounded-xl bg-dark-muted shadow-lg flex items-start gap-4 transition-transform duration-200 hover:scale-105"
										>
											<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-dark-surface flex items-center justify-center shrink-0 text-yellow-500">
												{icons[Number(key) % icons.length]}
											</div>
											<div>
												<h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-white">
													{title}
												</h3>
												<p className="text-sm sm:text-base text-neutral-300">
													{text}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</>
			)}

			{/* Fallback dark section if dark mode */}
			{isDark && (
				<div className="relative z-10 max-w-6xl mx-auto text-center px-2 sm:px-6">
					<h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
						{t("services.title")}
					</h2>
					<p className="text-base sm:text-lg md:text-xl mx-auto mb-8 sm:mb-12">
						{t("services.description")}
					</p>
					{isMobile ? (
						<>
							<Swiper
								spaceBetween={16}
								pagination={{
									clickable: true,
									el: ".custom-pagination",
									type: "bullets",
									bulletClass: "bg-dark-accent h-2 w-2 rounded-full",
									bulletActiveClass: "!bg-yellow-500",
								}}
								modules={[Pagination]}
								className="pb-8"
							>
								{items.map(([key, { title, text }]) => (
									<SwiperSlide key={`dark-slide-${key}`}>
										<div className="p-4 rounded-xl bg-dark-muted shadow-lg flex flex-col items-start gap-4 mx-2">
											<div className="flex items-center justify-start gap-4">
												<div className="w-10 h-10 rounded-xl bg-dark-surface flex items-center justify-center shrink-0 text-yellow-500">
													{icons[Number(key) % icons.length]}
												</div>
												<h3 className="text-lg font-semibold mb-1 text-white">
													{title}
												</h3>
											</div>
											<p className="text-sm text-neutral-300">{text}</p>
										</div>
									</SwiperSlide>
								))}
							</Swiper>

							<div className="custom-pagination mt-4 flex justify-center gap-2" />
						</>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
							{items.map(([key, { title, text }]) => (
								<div
									key={key}
									className="p-4 sm:p-6 rounded-xl bg-dark-muted shadow-lg flex items-start gap-4 transition-transform duration-200 hover:scale-105"
								>
									<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-dark-surface flex items-center justify-center shrink-0 text-yellow-500">
										{icons[Number(key) % icons.length]}
									</div>
									<div>
										<h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-white">
											{title}
										</h3>
										<p className="text-sm sm:text-base text-neutral-300">
											{text}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</section>
	);
};

export default ServicesSection;
