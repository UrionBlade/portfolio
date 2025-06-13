export const debounce = (func: (...args: unknown[]) => void, ms = 500) => {
	let timer: NodeJS.Timeout
	return (...args: unknown[]) => {
		const context = this
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(context, args)
		}, ms)
	}
}
