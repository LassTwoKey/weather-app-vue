<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTomorrowStore } from '@/store/store.ts'
import WeatherCard from '@/components/UI/WeatherCard.vue'
import NamedCard from '@/components/UI/NamedCard.vue'

const tomorrowStore = useTomorrowStore()
const tomorrow = storeToRefs(tomorrowStore)

const mainCards = tomorrow.getMainCards
const forecastList = tomorrow.getForecast
</script>

<template>
  <div class="grid gap-4 md:gap-5 grid-cols-2 mb-4 md:mb-5">
    <WeatherCard
      v-for="mainCard of mainCards"
      :key="mainCard.id"
      :options="mainCard"
    />
  </div>
  <div class="mb-4 md:mb-5">
    <NamedCard title="Часовой прогноз" :forecast="forecastList" />
  </div>
</template>
