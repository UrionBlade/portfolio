import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps {
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	rows?: number;
	error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
	value,
	onChange,
	placeholder,
	rows = 5,
	error,
}) => {
	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);

	return (
		<div className="w-full">
			<textarea
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				rows={rows}
				className={twMerge(
					"w-full px-5 py-3 rounded-md border transition-all duration-300 resize-none",
					isDark
						? "bg-dark-muted text-white border-dark-accent placeholder-white/40 focus:ring-yellow-500 focus:ring-2 focus:outline-none"
						: "bg-white text-gray-900 placeholder-gray-400 border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-grass-500 focus:shadow-[0_0_12px_#33ff33]",
				)}
			/>
			{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Textarea;
