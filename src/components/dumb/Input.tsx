import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	placeholder,
	error,
}) => {
	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);

	return (
		<div className="w-full">
			<input
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={twMerge(
					"w-full px-5 py-3 rounded-md border transition-all duration-300",
					isDark
						? "bg-dark-muted text-white border-dark-accent placeholder-white/40 focus:ring-yellow-500 focus:ring-2 focus:outline-none"
						: "bg-white text-gray-900 placeholder-gray-400 border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-grass-500 focus:shadow-[0_0_12px_#33ff33]",
				)}
			/>
			{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Input;
