import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface ThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>()(
	persist(
		(set, get) => ({
			// deterministic initial so server and first client render match;
			// the real theme is applied after mount by ThemeBoot
			theme: "light",
			setTheme: (theme) => {
				set({ theme });
				if (typeof document !== "undefined") {
					document.documentElement.classList.toggle("dark", theme === "dark");
				}
			},
			toggleTheme: () => {
				const next = get().theme === "dark" ? "light" : "dark";
				get().setTheme(next);
			},
		}),
		{
			name: "theme-store",
			// don't rehydrate during initial render (avoids hydration mismatch);
			// ThemeBoot triggers rehydration after mount
			skipHydration: true,
		},
	),
);
