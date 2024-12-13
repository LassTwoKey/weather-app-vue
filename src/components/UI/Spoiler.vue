<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/UI/Card.vue'
import SwiperComponent from '@/components/SwiperComponent.vue'
import { ForecastItemClient, MainCard } from '@/types'
import WeatherCard from '@/components/UI/WeatherCard.vue'

interface Props {
  isBorderless?: boolean
  options: {
    id: number
    date: string
    description: string
    tempMax: string
    tempMin: string
    iconUrl: string
    forecast: ForecastItemClient[]
    mainCards: MainCard[]
  }
}
const { options, isBorderless } = defineProps<Props>()
const isOpen = ref(options.id === 0)
</script>

<template>
  <Card class="p-0">
    <button
      class="w-full flex justify-between font-medium"
      @click="isOpen = !isOpen"
    >
      <span class="flex flex-col text-left">
        <span class="text-gray-800 text-sm md:text-base">{{
          options.date
        }}</span>
        <span class="text-gray-400 text-xs md:text-base">{{
          options.description
        }}</span>
      </span>
      <span class="flex gap-1 md:gap-3">
        <span class="divide-x">
          <span class="flex flex-col text-right text-sm md:text-base">
            <span>{{ options.tempMax }}</span>
            <span>{{ options.tempMin }}</span>
          </span>
        </span>
        <img
          class="h-10 md:h-14 select-none pointer-events-none"
          :src="options.iconUrl"
          alt=""
        />
        <span>
          <img
            class="select-none pointer-events-none"
            :class="[isOpen ? 'rotate-180' : '']"
            src="../../assets/arrow.svg"
            alt=""
          />
        </span>
      </span>
    </button>
    <Transition>
      <div v-if="isOpen" class="pt-0">
        <div class="grid grid-cols-2 gap-4 md:gap-5 py-4 md:py-6">
          <WeatherCard
            :is-borderless="isBorderless"
            v-for="mainCard of options.mainCards"
            :key="mainCard.id"
            :options="mainCard"
          />
        </div>
        <SwiperComponent :forecast-list="options.forecast"></SwiperComponent>
      </div>
    </Transition>
  </Card>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  height: auto;
  overflow: hidden;
}

.v-enter-from,
.v-leave-to {
  height: 0;
}
</style>
