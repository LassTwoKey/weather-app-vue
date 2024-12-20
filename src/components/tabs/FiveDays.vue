<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import Spoiler from '@/components/UI//Spoiler.vue'
import { useFiveDaysStore } from '@/store/store.ts'
import { getFormattedDateForFiveDays } from '@/utils/date.ts'
import { firstLetterUpperCase } from '@/utils/weatherData.ts'
import { useAnimateTabContent } from '@/composables'

const fiveDaysStore = useFiveDaysStore()
const fiveDays = storeToRefs(fiveDaysStore)
const forecastList = fiveDays.getForecast

const daysInfo = computed(() =>
  forecastList.value.map((dayInfo, idx) => {
    const date = firstLetterUpperCase(
      getFormattedDateForFiveDays(
        new Date().setDate(new Date().getDate() + idx)
      )
    )

    let pickIndex = 4

    const removeDegreeFromStr = (str: string) => {
      return str.slice(0, str.length - 1)
    }

    let tempMax = `${Math.max(
      ...dayInfo.map((item) => +removeDegreeFromStr(item.tempMax))
    )}°`
    let tempMin = `${Math.min(
      ...dayInfo.map((item) => +removeDegreeFromStr(item.tempMin))
    )}°`

    if (idx === 0) {
      pickIndex = 0
      tempMax = dayInfo[0].tempMax
      tempMin = dayInfo[0].tempMin
    }
    const mainCards = fiveDaysStore.getMainCards.map((mainCard) => ({
      ...mainCard,
      value: dayInfo[pickIndex][mainCard.id],
      descr:
        mainCard.id === 'windSpeed' ? dayInfo[pickIndex].windDirection : null,
    }))

    return {
      id: idx,
      date,
      description: dayInfo[pickIndex].description,
      tempMax,
      tempMin,
      iconUrl: dayInfo[pickIndex].iconUrl,
      forecast: dayInfo,
      mainCards,
    }
  })
)

useAnimateTabContent('.animate-box', {})
</script>

<template>
  <div class="flex flex-col gap-4 md:gap-5">
    <Spoiler
      v-for="dayInfo of daysInfo"
      :key="dayInfo.id"
      class="animate-box"
      :options="dayInfo"
      is-borderless
    />
  </div>
</template>
