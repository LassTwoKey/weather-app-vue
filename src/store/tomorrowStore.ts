import { defineStore } from 'pinia'
import { ForecastItemClient, WeatherMainTomorrowInfo } from '@/types'
import airIcon from '@/assets/tabs/air.svg'
import cloudIcon from '@/assets/tabs/cloud.svg'
import humidityIcon from '@/assets/tabs/humidity.svg'
import waveIcon from '@/assets/tabs/wave.svg'

export const useTomorrowStore = defineStore('tomorrow', {
  state: () => ({
    info: {
      windSpeed: 'N/A',
      windDirection: 'N/A',
      clouds: 'N/A',
      pressure: 'N/A',
      humidity: 'N/A',
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
    getForecast: (state) => state.list,
  },
  actions: {
    setInfo(payload: WeatherMainTomorrowInfo) {
      this.info = {
        windSpeed: payload.windSpeed,
        windDirection: payload.windDirection,
        clouds: payload.clouds,
        pressure: payload.pressure,
        humidity: payload.humidity,
      }
    },
    setForecast(payload: ForecastItemClient[]) {
      this.list = payload
    },
  },
})
