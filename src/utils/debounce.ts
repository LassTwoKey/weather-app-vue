export function debounce(func: (...arg: any[]) => any, delay: number) {
  let timeoutId: number

  return function (this: any) {
    const context = this
    const args = Array.from(arguments)

    clearTimeout(timeoutId)
    timeoutId = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}
