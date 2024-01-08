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

interface Clouds {
  all: number
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

export interface CityCoordinates {
  lat: number
  lon: number
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

// server types
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
