<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherInfoStore } from '@/store/store.ts'
import sampleIcon from '@/assets/widget/sample.svg'
import AshIcon from '@/assets/widget/Ash.jpg'
import ClearIcon from '@/assets/widget/Clear.jpg'
import CloudsIcon from '@/assets/widget/Clouds.jpg'
import DrizzleIcon from '@/assets/widget/Drizzle.jpg'
import DustIcon from '@/assets/widget/Dust.jpg'
import FogIcon from '@/assets/widget/Fog.jpg'
import HazeIcon from '@/assets/widget/Haze.jpg'
import MistIcon from '@/assets/widget/Mist.jpg'
import RainIcon from '@/assets/widget/Rain.jpg'
import SandIcon from '@/assets/widget/Sand.jpg'
import SmokeIcon from '@/assets/widget/Smoke.jpg'
import SnowIcon from '@/assets/widget/Snow.jpg'
import SquallIcon from '@/assets/widget/Squall.jpg'
import ThunderstormIcon from '@/assets/widget/Thunderstorm.jpg'
import TornadoIcon from '@/assets/widget/Tornado.jpg'

const weatherInfoStore = useWeatherInfoStore()
const weatherInfo = ref(weatherInfoStore)

const getWidgetBackgroundUrl = (imageName: string) => {
  switch (imageName) {
    case 'Ash':
      return AshIcon
    case 'Clear':
      return ClearIcon
    case 'Clouds':
      return CloudsIcon
    case 'Drizzle':
      return DrizzleIcon
    case 'Dust':
      return DustIcon
    case 'Fog':
      return FogIcon
    case 'Haze':
      return HazeIcon
      case 'Mist':
      return MistIcon
    case 'Rain':
      return RainIcon
    case 'Sand':
      return SandIcon
    case 'Smoke':
      return SmokeIcon
    case 'Snow':
      return SnowIcon
    case 'Squal':
      return SquallIcon
    case 'Thunderstorm':
      return ThunderstormIcon
    case 'Tornado':
      return TornadoIcon
    default:
      return sampleIcon
  }
}
</script>

<template>
  <div class="widget">
    <img
      draggable="false"
      :src="getWidgetBackgroundUrl(weatherInfo.getBackgroundUrl)"
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
