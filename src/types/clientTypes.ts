export interface City {
  id: string | number
  name: string
  lat: number
  lon: number
  title: string
  temp: string
  weatherIconUrl: string
}

export interface MainCard {
  id: number | string
  title: string
  value: string
  iconSrc: string
  descr?: string
}

export type Unit = 'metric' | 'imperial'

export interface Geo {
  name: string
  lat: string | number
  lon: string | number
}

export interface WeatherInfoClient {
  geoName: string
  temp: string
  tempMax: string
  tempMin: string
  feelsLike: string
  iconUrl: string
  description: string
  backgroundUrl: string
  currentDate?: string
}

export interface ForecastItemClient {
  id: number | string
  time: string
  iconUrl: string
  temp: string
  windSpeed: string
  windDirection: string
  clouds: string
  pressure: string
  humidity: string
  tempMax: string
  tempMin: string
  description: string
  [key: string]: string | number
}

export interface WeatherMainInfo {
  windSpeed: string
  windDirection: string
  clouds: string
  pressure: string
  humidity: string
  sunrise: string
  sunset: string
}
export interface WeatherMainTomorrowInfo {
  windSpeed: string
  windDirection: string
  clouds: string
  pressure: string
  humidity: string
}
