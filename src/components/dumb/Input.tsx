import { useTheme } from "@/hooks/useTheme";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, className, ...props }) => {
	const isDark = useTheme((s) => s.theme === "dark");

	return (
		<input
			{...props}
			placeholder={placeholder}
			aria-label={placeholder}
			className={twMerge(
				"w-full cursor-text px-5 py-3 rounded-md border transition-all duration-300",
				isDark
					? "bg-dark-muted text-white border-dark-accent placeholder-white/40 focus:ring-yellow-500 focus:ring-2 focus:outline-none"
					: "bg-white text-gray-900 placeholder-gray-400 border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-grass-500 focus:shadow-[0_0_12px_#33ff33]",
				className,
			)}
		/>
	);
};

export default Input;
