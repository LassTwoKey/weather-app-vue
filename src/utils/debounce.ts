export function debounce(func: (...arg: any[]) => any, delay: number) {
    let timeoutId: number

    return function () {
        const context = this
        const args = arguments

        clearTimeout(timeoutId)
        timeoutId = setTimeout(function () {
            func.apply(context, args)
        }, delay)
    }
}