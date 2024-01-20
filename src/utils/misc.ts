import { useUnitStore } from '@/store/store'

export function getWindDirection(degrees: number) {
  const directions = [
    { min: 0, max: 22.5, text: 'С' },
    { min: 22.5, max: 67.5, text: 'СВ' },
    { min: 67.5, max: 112.5, text: 'В' },
    { min: 112.5, max: 157.5, text: 'ЮВ' },
    { min: 157.5, max: 202.5, text: 'Ю' },
    { min: 202.5, max: 247.5, text: 'ЮЗ' },
    { min: 247.5, max: 292.5, text: 'З' },
    { min: 292.5, max: 337.5, text: 'СЗ' },
    { min: 337.5, max: 360, text: 'С' },
  ]

  for (const direction of directions) {
    if (degrees >= direction.min && degrees < direction.max) {
      return direction.text
    }
  }

  return 'Неизвестное направление'
}

export function getWindString(windSpeed: number) {
  const unitStore = useUnitStore()
  const windSpeedMetric = unitStore.getUnit === 'metric' ? 'м/с' : 'м/ч'
  return `${windSpeed} ${windSpeedMetric},`
}

export function hPaToMmHg(hPa: number) {
  // Соотношение: 1 гектопаскаль = 0.75006 миллиметра ртутного столба
  const mmHg = hPa * 0.75006
  return Math.round(mmHg)
}

export function splitIntoSubArrays<T>(array: T[], subarraySize: number) {
  let subArrays = []
  for (let i = 0; i < array.length; i += subarraySize) {
    subArrays.push(array.slice(i, i + subarraySize))
  }
  return subArrays
}
