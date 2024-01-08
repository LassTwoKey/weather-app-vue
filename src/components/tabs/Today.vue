<script setup lang="ts">
import {storeToRefs} from "pinia";
import WeatherCard from "../UI/WeatherCard.vue";
import {useTodayStore} from "../../store/store.ts";
import NamedCard from "../UI/NamedCard.vue";

const todayStore = useTodayStore()
const today = storeToRefs(todayStore)

const mainCards = today.getMainCards
const dayStates = today.getDayStates
const forecastList = today.getForecast
</script>

<template>
  <div class="grid gap-4 md:gap-5 grid-cols-2 mb-4 md:mb-5">
    <WeatherCard v-for="mainCard of mainCards" :key="mainCard.id" :options="mainCard"/>
  </div>
  <div class="mb-4 md:mb-5">
    <NamedCard iconUrl="src/assets/tabs/timer.svg" title="Часовой прогноз" :forecast="forecastList"/>
  </div>
  <div class="grid gap-4 md:gap-5 grid-cols-2">
    <WeatherCard v-for="dayState of dayStates" :key="dayState.id" :options="dayState"/>
  </div>
</template>

<style scoped lang="scss">

</style>