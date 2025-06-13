import { debounce } from "@/utils/utils";
import { useEffect, useState } from "react";

/**
 * Modified from link below
 * @see https://observablehq.com/@werehamster/avoiding-hydration-mismatch-when-using-react-hooks
 * @param mediaQueryString
 * @returns {unknown}
 */
const useBetterMediaQuery = (mediaQueryString: string) => {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(mediaQueryString);

		const listener = () => setMatches(!!mediaQueryList.matches);
		listener();
		mediaQueryList.addEventListener("change", debounce(listener, 100), {
			passive: true,
		});
		return () =>
			mediaQueryList.removeEventListener("change", debounce(listener, 100));
	}, [mediaQueryString]);

	return matches;
};

export default useBetterMediaQuery;
