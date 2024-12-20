<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTomorrowStore } from '@/store/store.ts'
import WeatherCard from '@/components/UI/WeatherCard.vue'
import NamedCard from '@/components/UI/NamedCard.vue'
import { useAnimateElems, useAnimateTabContent } from '@/composables'

const tabId = ref('tomorrow_')

const tomorrowStore = useTomorrowStore()
const tomorrow = storeToRefs(tomorrowStore)

const mainCards = tomorrow.getMainCards
const forecastList = tomorrow.getForecast

useAnimateTabContent('.animate-box', {})
useAnimateElems(`#${tabId.value} .changed-foreacast-value`, {})
</script>

<template>
  <div class="grid gap-4 md:gap-5 grid-cols-2 mb-4 md:mb-5">
    <WeatherCard
      v-for="mainCard of mainCards"
      class="animate-box"
      :key="mainCard.id"
      :options="mainCard"
    />
  </div>
  <div class="mb-4 md:mb-5">
    <NamedCard
      title="Часовой прогноз"
      class="animate-box"
      :swiper-id="tabId"
      :forecast="forecastList"
    />
  </div>
</template>
