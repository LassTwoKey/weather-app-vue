<script setup lang="ts">
import Card from '@/components/UI/Card.vue'
import { ForecastItemClient } from '@/types'
import SwiperComponent from '@/components/SwiperComponent.vue'
import iconUrl from '@/assets/tabs/timer.svg'

interface Props {
  title: string
  forecast?: ForecastItemClient[]
}

const { title, forecast } = defineProps<Props>()
</script>

<template>
  <Card>
    <div class="flex gap-3 mb-3">
      <img :src="iconUrl" alt="Hourly Forecast" />
      <h2 class="font-medium">{{ title }}</h2>
    </div>
    <SwiperComponent
      v-if="forecast"
      :forecast-list="forecast"
    ></SwiperComponent>
  </Card>
</template>
