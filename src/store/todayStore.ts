import { defineStore } from 'pinia'
import { ForecastItemClient, WeatherMainInfo } from '@/types'
import airIcon from '@/assets/tabs/air.svg'
import cloudIcon from '@/assets/tabs/cloud.svg'
import humidityIcon from '@/assets/tabs/humidity.svg'
import nightsStayIcon from '@/assets/tabs/nights_stay.svg'
import sunsetIcon from '@/assets/tabs/sunset.svg'
import waveIcon from '@/assets/tabs/wave.svg'

export const useTodayStore = defineStore('today', {
  state: () => ({
    info: {
      windSpeed: 'N/A',
      windDirection: 'N/A',
      clouds: 'N/A',
      pressure: 'N/A',
      humidity: 'N/A',
      sunrise: 'N/A',
      sunset: 'N/A',
    },
    list: [] as ForecastItemClient[],
  }),
  getters: {
    getInfo: (state) => state.info,
    getMainCards: (state) => [
      {
        id: 1,
        title: 'Ветер',
        value: state.info.windSpeed,
        descr: state.info.windDirection,
        iconSrc: airIcon,
      },
      {
        id: 2,
        title: 'Облачность',
        value: state.info.clouds,
        iconSrc: cloudIcon,
      },
      {
        id: 3,
        title: 'Давление',
        value: state.info.pressure,
        iconSrc: waveIcon,
      },
      {
        id: 4,
        title: 'Влажность',
        value: state.info.humidity,
        iconSrc: humidityIcon,
      },
    ],
    getDayStates: (state) => [
      {
        id: 1,
        title: 'Восход',
        value: state.info.sunrise,
        iconSrc: nightsStayIcon,
      },
      {
        id: 2,
        title: 'Закат',
        value: state.info.sunset,
        iconSrc: sunsetIcon,
      },
    ],
    getForecast: (state) => state.list,
  },
  actions: {
    setInfo(payload: WeatherMainInfo) {
      this.info = payload
    },
    setForecast(payload: ForecastItemClient[]) {
      this.list = payload
    },
  },
})
