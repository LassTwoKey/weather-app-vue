<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ForecastItemClient } from '@/types'
import { useAnimateElems } from '@/composables'

interface Props {
  swiperId?: string
  forecastList: ForecastItemClient[]
}

const { forecastList, swiperId } = defineProps<Props>()

useAnimateElems(`#${swiperId} .changed-foreacast-temp`, {
  delayOnStart: 0.45,
  y: 15,
  x: 0,
  staggerEach: 0.06,
  immediate: true,
})
</script>

<template>
  <Swiper
    :id="swiperId"
    v-if="forecastList.length"
    slides-per-view="auto"
    :space-between="23"
  >
    <SwiperSlide v-for="forecastItem of forecastList" :key="forecastItem.id">
      <div
        class="text-center flex flex-col text-gray-700 justify-center font-medium text-sm md:text-base"
      >
        <h4>{{ forecastItem.time }}</h4>
        <img
          class="w-12 max-w-fit select-none -translate-x-1"
          :src="forecastItem.iconUrl"
          alt="Forecast Image"
        />
        <p class="changed-foreacast-temp">{{ forecastItem.temp }}</p>
      </div>
    </SwiperSlide>
  </Swiper>
  <p v-else class="font-medium text-center py-2 text-red-600">
    Ошибка с загрузкой прогноза
  </p>
</template>

<style scoped lang="scss">
.slider-container {
  overflow: hidden;
}
.swiper-slide {
  display: block;
  width: 40px;
}
</style>
