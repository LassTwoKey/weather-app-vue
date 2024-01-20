import { defineStore } from 'pinia'
import { WeatherInfoClient } from '@/types'
import { getFormattedDate } from '@/utils/date.ts'

import sampleIcon from '@/assets/widget/sample.svg'

export const useWeatherInfoStore = defineStore('weatherInfo', {
  state: () => ({
    geoName: 'N/A',
    temp: 'N/A',
    tempMax: 'N/A',
    tempMin: 'N/A',
    feelsLike: 'N/A',
    iconUrl: sampleIcon,
    description: 'N/A',
    backgroundUrl: sampleIcon,
    currentDate: getFormattedDate(),
  }),
  getters: {
    getGeoName: (state) => state.geoName,
    getTemp: (state) => state.temp,
    getTempMax: (state) => state.tempMax,
    getTempMin: (state) => state.tempMin,
    getFeelsLike: (state) => state.feelsLike,
    getIconUrl: (state) => state.iconUrl,
    getDescription: (state) => state.description,
    getBackgroundUrl: (state) => state.backgroundUrl,
    getCurrentDate: (state) => state.currentDate,
  },
  actions: {
    setWeatherInfo(payload: WeatherInfoClient) {
      this.geoName = payload.geoName
      this.temp = payload.temp
      this.tempMax = payload.tempMax
      this.tempMin = payload.tempMin
      this.feelsLike = payload.feelsLike
      this.iconUrl = payload.iconUrl
      this.description = payload.description
      this.backgroundUrl = payload.backgroundUrl
    },
  },
})
