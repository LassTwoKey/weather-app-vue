import { Unit, Geo } from '@/types'

export function setUnit(unit: Unit) {
  localStorage.setItem('currentUnit', unit)
}

export function getUnit() {
  const unit = localStorage.getItem('currentUnit')

  if (unit === 'metric' || unit === 'imperial') return unit
  else return null
}

export function setGeo({ name, lat, lon }: Geo) {
  if (name && lat && lon) {
    localStorage.setItem('name', name)
    localStorage.setItem('lat', `${lat}`)
    localStorage.setItem('lon', `${lon}`)
  }
}

export function getGeo() {
  return {
    name: localStorage.getItem('name'),
    lat: localStorage.getItem('lat'),
    lon: localStorage.getItem('lon'),
  }
}
