import { useTheme } from "@/hooks/useTheme";
import { twMerge } from "tailwind-merge";

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	placeholder: string;
}

const Textarea: React.FC<TextareaProps> = ({
	placeholder,
	className,
	rows = 5,
	...props
}) => {
	const isDark = useTheme((s) => s.theme === "dark");

	return (
		<textarea
			{...props}
			rows={rows}
			placeholder={placeholder}
			aria-label={placeholder}
			className={twMerge(
				"w-full cursor-text px-5 py-3 rounded-md border transition-all duration-300 resize-none",
				isDark
					? "bg-dark-muted text-white border-dark-accent placeholder-white/40 focus:ring-yellow-500 focus:ring-2 focus:outline-none"
					: "bg-white text-gray-900 placeholder-gray-400 border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-grass-500 focus:shadow-[0_0_12px_#33ff33]",
				className,
			)}
		/>
	);
};

export default Textarea;
