import { defineStore } from 'pinia'
import { getUnit } from '@/utils'
import { Unit } from '@/types'

export const useUnitStore = defineStore('unit', {
  state: () => ({
    unit: getUnit() ?? 'metric',
  }),
  getters: {
    getUnit: (state) => state.unit,
  },
  actions: {
    setUnit(unit: Unit) {
      this.unit = unit
    },
  },
})
