<script setup lang="ts">
import Card from "./Card.vue";
import {ForecastItemClient} from "../../types";
import SwiperComponent from "../SwiperComponent.vue";

interface Props {
  iconUrl: string
  title: string
  forecast?: ForecastItemClient[]
}

const { iconUrl, title, forecast } = defineProps<Props>()

</script>

<template>
  <Card>
    <div class="flex gap-3 mb-3">
<!--      <img src="../../assets/tabs/timer.svg" alt="Hourly Forecast">-->
<!--      <h2 class="font-medium">Часовой прогноз</h2>-->
      <img :src="iconUrl" alt="Hourly Forecast">
      <h2 class="font-medium">{{title}}</h2>
    </div>
    <SwiperComponent v-if="forecast" :forecast-list="forecast"></SwiperComponent>
  </Card>
</template>

<style scoped lang="scss">

</style>