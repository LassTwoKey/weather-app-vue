<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherInfoStore } from '@/store/store.ts'

const weatherInfoStore = useWeatherInfoStore()
const weatherInfo = ref(weatherInfoStore)
</script>

<template>
  <div class="widget">
    <img
      draggable="false"
      :src="weatherInfo.getBackgroundUrl"
      alt="Background"
    />
    <div class="backdrop"></div>
    <div class="widget__container">
      <h1 class="widget__header">{{ weatherInfo.getGeoName }}</h1>
      <div class="widget__main">
        <div class="widget__temp">
          <div class="widget__degree">{{ weatherInfo.getTemp }}</div>
          <div class="widget__feels-like">
            <p id="feels-like">Ощущается {{ weatherInfo.getFeelsLike }}</p>
          </div>
        </div>
        <div class="widget__weather-icon">
          <img draggable="false" :src="weatherInfo.getIconUrl" alt="Icon" />
          <p>{{ weatherInfo.getDescription }}</p>
        </div>
      </div>
      <div class="widget__footer">
        <div class="widget__date">{{ weatherInfo.getCurrentDate }}</div>
        <div class="widget__temps">
          <p>Макс {{ weatherInfo.getTempMax }}</p>
          <p>Мин {{ weatherInfo.getTempMin }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.widget {
  @apply relative w-full md:rounded-2xl rounded-b-2xl overflow-hidden p-4 md:p-5 text-white font-medium min-h-80 flex flex-col;
  & > img {
    @apply absolute inset-0 w-full h-full bg-cover object-cover bg-center;
  }
  .backdrop {
    @apply absolute inset-0 w-full h-full bg-black opacity-50;
  }
  &__container {
    @apply relative z-10 flex flex-col justify-between flex-auto;
  }
  &__header {
    @apply text-base;
  }
  &__main {
    @apply flex items-end justify-between gap-4;
  }
  &__temp {
    @apply flex items-end flex-wrap gap-1;
  }
  &__degree {
    @apply text-6xl md:text-7xl;
  }
  &__weather-icon {
    @apply text-center flex flex-col items-center w-40;
    img {
      @apply w-28 select-none;
    }
  }
  &__footer {
    @apply flex items-end justify-between;
  }
  &__temps {
    @apply text-right;
  }
}
</style>
