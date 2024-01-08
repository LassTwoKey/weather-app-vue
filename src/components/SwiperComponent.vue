<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ForecastItemClient } from '../types'

interface Props {
  forecastList: ForecastItemClient[]
}

const { forecastList } = defineProps<Props>()
</script>

<template>
  <swiper v-if="forecastList.length" slides-per-view="auto" :space-between="23">
    <swiper-slide v-for="forecastItem of forecastList" :key="forecastItem.id">
      <div
        class="text-center flex flex-col text-gray-700 justify-center font-medium"
      >
        <h4>{{ forecastItem.time }}</h4>
        <img
          class="w-12 max-w-fit select-none -translate-x-1"
          :src="forecastItem.iconUrl"
          alt="Forecast Image"
        />
        <p>{{ forecastItem.temp }}</p>
      </div>
    </swiper-slide>
  </swiper>
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
