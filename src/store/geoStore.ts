import { defineStore } from 'pinia'
import { Geo } from '@/types'
import { getGeo } from '@/utils'

export const useGeoStore = defineStore('geo', {
  state: () => ({
    // basic location
    name: getGeo().name ?? 'Москва',
    lat: getGeo().lat ?? 55.7522,
    lon: getGeo().lon ?? 37.6156,
  }),
  getters: {
    getName: (state) => state.name,
    getLat: (state) => state.lat,
    getLon: (state) => state.lon,
  },
  actions: {
    setGeo({ name, lat, lon }: Geo) {
      this.name = name
      this.lat = lat
      this.lon = lon
    },
  },
})
