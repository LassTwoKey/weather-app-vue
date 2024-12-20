<script setup lang="ts">
import Card from '@/components/UI/Card.vue'
import { ForecastItemClient } from '@/types'
import SwiperComponent from '@/components/SwiperComponent.vue'
import iconUrl from '@/assets/tabs/timer.svg'

interface Props {
  title: string
  swiperId?: string
  forecast?: ForecastItemClient[]
}

const { title, forecast, swiperId } = defineProps<Props>()
</script>

<template>
  <Card>
    <div class="flex items-center gap-3 mb-3">
      <img :src="iconUrl" alt="Hourly Forecast" />
      <h2 class="font-medium text-sm md:text-base">{{ title }}</h2>
    </div>
    <SwiperComponent
      v-if="forecast"
      :swiper-id="swiperId"
      :forecast-list="forecast"
    ></SwiperComponent>
  </Card>
</template>
