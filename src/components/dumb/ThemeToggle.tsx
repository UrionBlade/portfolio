"use client";

import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const dark = theme === "dark";

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);

	return (
		<label className="relative inline-block w-16 h-9 cursor-pointer">
			<input
				type="checkbox"
				aria-label="toggle theme"
				className="opacity-0 w-0 h-0 peer"
				checked={dark}
				onChange={toggleTheme}
			/>
			<div className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-full transition-colors duration-300" />
			<div className="absolute top-0.5 left-0.5 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white dark:bg-dark-muted shadow transition-transform duration-500 ease-in-out peer-checked:translate-x-7">
				{dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
			</div>
		</label>
	);
}
