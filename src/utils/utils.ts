export const debounce = (func: (...args: unknown[]) => void, ms = 500) => {
	let timer: NodeJS.Timeout;
	return (...args: unknown[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => func(...args), ms);
	};
};
