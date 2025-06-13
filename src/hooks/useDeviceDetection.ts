import { useMediaQuery } from "@react-hook/media-query";
import useBetterMediaQuery from "./useBetterMediaQuery";

export const useDeviceDetection = () => {
	const isAbove1920 = useBetterMediaQuery(
		"only screen and (min-width: 1921px)",
	);

	// 4xl
	const is1920 = useBetterMediaQuery("only screen and (min-width: 1537px)");

	//3xl
	const is1536 = useBetterMediaQuery(
		"only screen and (min-width: 1441px) and (max-width: 1536px)",
	);

	const isAbove1440 = useBetterMediaQuery(
		"only screen and (min-width: 1441px)",
	);

	//2xl
	const is1440 = useBetterMediaQuery(
		"only screen and (min-width: 1280px) and (max-width: 1440px)",
	);

	//xl
	const is1280 = useBetterMediaQuery(
		"only screen and (min-width: 1025px) and (max-width: 1280px)",
	);

	//lg
	const is1024 = useMediaQuery("only screen and (min-width: 1024px)");

	const is768 = useMediaQuery(
		"only screen and (min-width: 768px) and (max-width: 1023px)",
	);

	const isTablet = useBetterMediaQuery(
		"only screen and (min-width: 768px) and (max-width: 1279px)",
	);
	const isMobile = useBetterMediaQuery("only screen and (max-width: 767px)");
	const isDesktop = !isMobile && !isTablet;

	return {
		isTablet,
		isMobile,
		isDesktop,
		isAbove1440,
		is1440,
		is1536,
		is1920,
		is1280,
		is1024,
		is768,
		isAbove1920,
	};
};
