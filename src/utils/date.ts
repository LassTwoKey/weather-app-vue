export function formatTime(date:string | number | Date) {
    if (typeof date === 'number' || typeof date === 'string') {
        date = new Date(date)
    }

    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${formattedMinutes}`
}

export function getFormattedDate() {
    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]

    const now = new Date()
    const monthName = months[now.getMonth()]
    return `${monthName} ${now.getDate()}, ${formatTime(now)}`
}

export function formatUnixTimeTo24HourTimeString(unixTime:number, timezoneOffset:number) {
    let timeMilliseconds = unixTime * 1000 + timezoneOffset * 1000

    let timeDate = new Date(timeMilliseconds)

    let hours = timeDate.getUTCHours()
    let minutes = timeDate.getUTCMinutes()

    let formattedHours = hours < 10 ? `0${hours}` : hours
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${formattedHours}:${formattedMinutes}`
}

export function getFormattedDateForFiveDays(date: number | Date) {
    const currentDate = new Date()
    let inputDate

    if (typeof date === 'number') inputDate = new Date(date)
    else inputDate = date

    const options:any = {
        day: 'numeric',
        month: 'long',
    }

    if (
        inputDate.getDate() === currentDate.getDate() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear()
    ) {
        // Сегодня
        return `Сегодня, ${inputDate.toLocaleDateString('ru-RU', options)}`
    } else if (
        inputDate.getDate() === currentDate.getDate() + 1 &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear()
    ) {
        // Завтра
        return `Завтра, ${inputDate.toLocaleDateString('ru-RU', options)}`
    } else {
        // День недели
        return `${inputDate.toLocaleDateString('ru-RU', {
            ...options,
            weekday: 'long',
        })}`
    }
}