import { useTheme } from "@/hooks/useTheme";
import type { FC, MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary";
}

export const Button: FC<ButtonProps> = ({
	children,
	variant = "primary",
	onClick,
	...props
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const btnRef = useRef<HTMLButtonElement>(null);

	const base =
		"px-6 py-3 rounded-xl font-semibold cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.2),transparent)] before:opacity-20 before:animate-pulse w-full md:w-auto";
	const variantClasses =
		variant === "primary"
			? isDark
				? "bg-neutral-100 text-black hover:bg-neutral-300"
				: "bg-white text-black shadow-xl hover:shadow-[0_0_40px_5px_rgba(255,255,255,0.6)] hover:scale-105"
			: isDark
				? "border border-neutral-400 text-white hover:bg-neutral-100 hover:text-black"
				: "border border-white text-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_5px_rgba(255,255,255,0.5)]";

	// parallax hover
	const handleMouseMove = useCallback(
		async (e: MouseEvent<HTMLButtonElement>) => {
			if (isDark || !btnRef.current) return;

			const rect = btnRef.current.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

			const gsap = (await import("gsap")).default;
			gsap.to(btnRef.current, { x, y, duration: 0.3, ease: "power3.out" });
		},
		[isDark],
	);

	const handleMouseLeave = useCallback(async () => {
		if (isDark || !btnRef.current) return;
		const gsap = (await import("gsap")).default;
		gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
	}, [isDark]);

	const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
		if (!btnRef.current || isDark) return onClick?.(e);
		const gsap = (await import("gsap")).default;
		gsap.fromTo(
			btnRef.current,
			{ scale: 0.96 },
			{ scale: 1, duration: 0.2, ease: "power2.out" },
		);
		onClick?.(e);
	};

	useEffect(() => {
		if (!isDark && btnRef.current) {
			import("gsap").then((gsap) => {
				gsap.default.to(btnRef.current, {
					boxShadow: "0 0 20px 4px rgba(255,255,255,0.3)",
					repeat: -1,
					yoyo: true,
					duration: 1.6,
					ease: "sine.inOut",
				});
			});
		}
	}, [isDark]);

	return (
		<button
			{...props}
			ref={btnRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			className={twMerge(base, variantClasses, props.className)}
		>
			{children}
		</button>
	);
};

export default Button;
