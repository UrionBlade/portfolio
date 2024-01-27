export const debounce = (func: (...args: any[]) => void, ms: number = 500) => {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, ms)
  }
}