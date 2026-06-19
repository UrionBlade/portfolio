"use client";

import { type Theme, useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

/**
 * Applies the real theme after mount. The store starts at a deterministic
 * "light" (with skipHydration) so SSR and the first client render match;
 * here we read the persisted value (or OS preference) and apply it, which
 * also toggles the `dark` class. The inline no-flash script in <head> has
 * already set the class to avoid a background flash before this runs.
 */
export default function ThemeBoot() {
	useEffect(() => {
		let theme: Theme;
		try {
			const raw = localStorage.getItem("theme-store");
			const stored = raw ? JSON.parse(raw)?.state?.theme : null;
			theme =
				stored ??
				(window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light");
		} catch {
			theme = "light";
		}
		useTheme.getState().setTheme(theme);
	}, []);

	return null;
}
