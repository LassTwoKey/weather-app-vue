import { defineStore } from 'pinia'
import { ForecastItemClient } from '@/types'

export const useForecastStore = defineStore('forecast', {
  state: () => ({
    forecast: [] as ForecastItemClient[],
  }),
  getters: {
    getForecast: (state) => state.forecast,
  },
  actions: {
    setForecast(payload: ForecastItemClient[]) {
      this.forecast = payload
    },
  },
})
