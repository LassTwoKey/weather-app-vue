<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherInfoStore } from '../store/store.ts'

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

<style lang="scss">
@import './widget.scss';
</style>
