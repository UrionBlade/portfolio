import useBetterMediaQuery from "./useBetterMediaQuery";

export const useDeviceDetection = () => {
	const isMobile = useBetterMediaQuery("only screen and (max-width: 767px)");
	const isDesktop = useBetterMediaQuery("only screen and (min-width: 1280px)");
	// ponytail: only mobile/desktop are consumed; tablet is the gap between them.
	// add finer breakpoints back when a layout actually needs one.
	return { isMobile, isDesktop };
};
