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
			theme:
				typeof window !== "undefined" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light",
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
		},
	),
);
