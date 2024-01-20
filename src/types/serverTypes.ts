import { CityCoordinates } from './commonTypes'

interface CityServer {
  coord: CityCoordinates
  country: string
  id: number
  name: string
  population: number
  sunrise: number
  sunset: number
  timezone: number
}
interface Clouds {
  all: number
}
interface MainWeather {
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
  temp: number
  temp_max: number
  temp_min: number
}
interface Weather {
  description: string
  icon: string
  id: number
  main: string
}
interface Wind {
  deg: number
  gust: number
  speed: number
}
interface ForecastItem {
  clouds: Clouds
  dt: number
  dt_txt: string
  main: MainWeather
  pop: number
  sys: {
    pod: string
  }
  visibility: number
  weather: Weather[]
  wind: Wind
}

export interface WeatherInfo {
  base: string
  clouds: Clouds
  cod: number
  coord: CityCoordinates
  dt: number
  id: number
  main: MainWeather
  name: string
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  weather: Weather[]
  wind: Wind
  timezone: number
}

export interface ForecastInfo {
  city: CityServer
  cnt: number
  cod: string
  list: ForecastItem[]
  message: number
}
