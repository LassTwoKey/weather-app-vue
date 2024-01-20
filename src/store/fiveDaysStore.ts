import { defineStore } from 'pinia'
import { ForecastItemClient } from '@/types'

import airIcon from '@/assets/tabs/air.svg'
import cloudIcon from '@/assets/tabs/cloud.svg'
import humidityIcon from '@/assets/tabs/humidity.svg'
import waveIcon from '@/assets/tabs/wave.svg'

export const useFiveDaysStore = defineStore('fiveDays', {
  state: () => ({
    forecast: [] as ForecastItemClient[][],
  }),
  getters: {
    getForecast: (state) => state.forecast,
    getMainCards: () => [
      {
        id: 'windSpeed',
        title: 'Ветер',
        value: 'N/A',
        descr: 'N/A',
        iconSrc: airIcon,
      },
      {
        id: 'clouds',
        title: 'Облачность',
        value: 'N/A',
        iconSrc: cloudIcon,
      },
      {
        id: 'pressure',
        title: 'Давление',
        value: 'N/A',
        iconSrc: waveIcon,
      },
      {
        id: 'humidity',
        title: 'Влажность',
        value: 'N/A',
        iconSrc: humidityIcon,
      },
    ],
  },
  actions: {
    setForecast(payload: ForecastItemClient[][]) {
      this.forecast = payload
    },
  },
})
