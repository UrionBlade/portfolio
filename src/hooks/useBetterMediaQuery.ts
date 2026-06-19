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

		setMatches(mediaQueryList.matches);
		// one debounced instance: add and remove must reference the same fn
		const listener = debounce(() => setMatches(mediaQueryList.matches), 100);
		mediaQueryList.addEventListener("change", listener, { passive: true });
		return () => mediaQueryList.removeEventListener("change", listener);
	}, [mediaQueryString]);

	return matches;
};

export default useBetterMediaQuery;
