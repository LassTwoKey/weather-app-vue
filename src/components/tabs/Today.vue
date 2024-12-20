<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import WeatherCard from '@/components/UI/WeatherCard.vue'
import NamedCard from '@/components/UI/NamedCard.vue'
import { useTodayStore } from '@/store/store.ts'
import { useAnimateElems, useAnimateTabContent } from '@/composables'

const tabId = ref('today_')

const todayStore = useTodayStore()
const today = storeToRefs(todayStore)

const mainCards = today.getMainCards
const dayStates = today.getDayStates
const forecastList = today.getForecast

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
  <div class="grid gap-4 md:gap-5 grid-cols-2">
    <WeatherCard
      v-for="dayState of dayStates"
      class="animate-box"
      :key="dayState.id"
      :options="dayState"
    />
  </div>
</template>
