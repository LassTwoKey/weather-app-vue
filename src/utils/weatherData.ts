import { ForecastInfo, WeatherInfo } from '@/types'
import { getForecastByCoordinate, getWeatherByCoordinate } from '@/api'
import { getCountryByCode } from './getCountry'
import {
  useWeatherInfoStore,
  useGeoStore,
  useForecastStore,
  useTodayStore,
  useTomorrowStore,
  useFiveDaysStore,
} from '@/store/store.ts'
import {
  getWindDirection,
  getWindString,
  hPaToMmHg,
  splitIntoSubArrays,
} from './misc.ts'
import { formatTime, formatUnixTimeTo24HourTimeString } from './date.ts'

import sampleIcon from '@/assets/widget/sample.svg'
import AshIcon from '@/assets/widget/Ash.jpg'
import ClearIcon from '@/assets/widget/Clear.jpg'
import CloudsIcon from '@/assets/widget/Clouds.jpg'
import DrizzleIcon from '@/assets/widget/Drizzle.jpg'
import DustIcon from '@/assets/widget/Dust.jpg'
import FogIcon from '@/assets/widget/Fog.jpg'
import HazeIcon from '@/assets/widget/Haze.jpg'
import MistIcon from '@/assets/widget/Mist.jpg'
import RainIcon from '@/assets/widget/Rain.jpg'
import SandIcon from '@/assets/widget/Sand.jpg'
import SmokeIcon from '@/assets/widget/Smoke.jpg'
import SnowIcon from '@/assets/widget/Snow.jpg'
import SquallIcon from '@/assets/widget/Squall.jpg'
import ThunderstormIcon from '@/assets/widget/Thunderstorm.jpg'
import TornadoIcon from '@/assets/widget/Tornado.jpg'


export const getWidgetBackgroundUrl = (imageName: string) => {
  switch (imageName) {
    case 'Ash':
      return AshIcon
    case 'Clear':
      return ClearIcon
    case 'Clouds':
      return CloudsIcon
    case 'Drizzle':
      return DrizzleIcon
    case 'Dust':
      return DustIcon
    case 'Fog':
      return FogIcon
    case 'Haze':
      return HazeIcon
      case 'Mist':
      return MistIcon
    case 'Rain':
      return RainIcon
    case 'Sand':
      return SandIcon
    case 'Smoke':
      return SmokeIcon
    case 'Snow':
      return SnowIcon
    case 'Squal':
      return SquallIcon
    case 'Thunderstorm':
      return ThunderstormIcon
    case 'Tornado':
      return TornadoIcon
    default:
      return sampleIcon
  }
}
export const firstLetterUpperCase = (string: string) => {
  if (!string) return ''
  return string[0].toUpperCase() + string.slice(1)
}
export const setWeather = async (lat?: number, lon?: number) => {
  const weatherInfoStore = useWeatherInfoStore()
  const todayStore = useTodayStore()
  const geoStore = useGeoStore()

  if (!isNaN(+geoStore.getLat) && !isNaN(+geoStore.getLon)) {
    const weatherData: WeatherInfo | null = await getWeatherByCoordinate(
      lat ?? +geoStore.getLat,
      lon ?? +geoStore.getLon
    )

    if (weatherData) {
      weatherInfoStore.setWeatherInfo({
        geoName: `${weatherData.name}, ${getCountryByCode(
          weatherData.sys.country
        )}`,
        temp: `${Math.round(weatherData.main.temp)}°`,
        feelsLike: `${Math.round(weatherData.main.feels_like)}°`,
        iconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        description: `${firstLetterUpperCase(
          weatherData.weather[0].description
        )}`,
        backgroundUrl: getWidgetBackgroundUrl(weatherData.weather[0].main),
        tempMax: `${Math.round(weatherData.main.temp_max)}°`,
        tempMin: `${Math.round(weatherData.main.temp_min)}°`,
      })
      todayStore.setInfo({
        windSpeed: getWindString(weatherData.wind.speed),
        windDirection: getWindDirection(weatherData.wind.deg),
        clouds: `${weatherData.clouds.all} %`,
        pressure: `${hPaToMmHg(weatherData.main.pressure)} мм рт. ст.`,
        humidity: `${weatherData.main.humidity} %`,
        sunrise: formatUnixTimeTo24HourTimeString(
          weatherData.sys.sunrise,
          weatherData.timezone
        ),
        sunset: formatUnixTimeTo24HourTimeString(
          weatherData.sys.sunset,
          weatherData.timezone
        ),
      })
    }
  }
}

export const setForecast = async (lat?: number, lon?: number) => {
  const forecastStore = useForecastStore()
  const geoStore = useGeoStore()
  const tomorrowStore = useTomorrowStore()
  const todayStore = useTodayStore()
  const fiveDaysStore = useFiveDaysStore()

  if (!isNaN(+geoStore.getLat) && !isNaN(+geoStore.getLon)) {
    const forecastData: ForecastInfo | null = await getForecastByCoordinate(
      lat ?? +geoStore.getLat,
      lon ?? +geoStore.getLon
    )

    const forecast = forecastData?.list.map((forecastElem, index) => ({
      id: index,
      time: formatTime(forecastElem.dt_txt),
      iconUrl: `https://openweathermap.org/img/wn/${forecastElem.weather[0].icon}@2x.png`,
      temp: `${Math.round(forecastElem.main.temp)}°`,
      windSpeed: getWindString(forecastElem.wind.speed),
      windDirection: getWindDirection(forecastElem.wind.deg),
      clouds: `${forecastElem.clouds.all} %`,
      pressure: `${hPaToMmHg(forecastElem.main.pressure)} мм рт. ст.`,
      humidity: `${forecastElem.main.humidity} %`,
      tempMax: `${Math.round(forecastElem.main.temp_max)}°`,
      tempMin: `${Math.round(forecastElem.main.temp_min)}°`,
      description: firstLetterUpperCase(forecastElem.weather[0].description),
    }))

    if (forecast) {
      forecastStore.setForecast(forecast)
      const firstPoint = forecast.findIndex(
        (forecastElem) => forecastElem.time === '0:00'
      )
      const lastPoint = firstPoint + 8
      const noonPoint = firstPoint + 4

      todayStore.setForecast(forecast.slice(0, 8))

      tomorrowStore.setInfo(forecast[noonPoint])
      tomorrowStore.setForecast(forecast.slice(firstPoint, lastPoint))

      const fiveDaysForecasts = [
        forecast.slice(0, 8),
        ...splitIntoSubArrays(forecast.slice(firstPoint), 8).slice(0, 4),
      ]
      fiveDaysStore.setForecast(fiveDaysForecasts)
    }
  }
}
