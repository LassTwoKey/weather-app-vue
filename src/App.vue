<script setup lang="ts">
import { ref } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import Header from '@/components/Header/Header.vue'
import Widget from '@/components/Widget.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import Footer from '@/components/Footer.vue'
import { setForecast, setWeather } from '@/utils/weatherData'

const isStartLoading = ref(true)
const setData = async () => {
  await setWeather()
  await setForecast()
  setTimeout(() => {
    isStartLoading.value = false
  }, 500)
}

setData()
</script>

<template>
  <AppLoader :is-start-loading="isStartLoading" />
  <div class="h-full flex flex-col">
    <Header />
    <main class="container flex-auto mx-auto md:px-3 py-4 md:py-7">
      <div class="md:max-w-lg">
        <Widget />
        <div class="px-4 md:p-0">
          <Tabs />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
