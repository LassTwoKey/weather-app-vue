<script setup lang="ts">
import { ref } from 'vue'
import InputSearch from '@/components/InputSearch/InputSearch.vue'
import searchIcon from '@/assets/search.svg'
import logoIcon from '@/assets/logo.svg'
import { debounce, setUnit, setGeo } from '@/utils'
import { getCitiesByValue, getFullInfoByCities } from '@/api'
import { City, WeatherInfo } from '@/types'
import { getCountryByCode } from '@/utils/getCountry'
import { useGeoStore, useUnitStore } from '@/store/store'
import { setForecast, setWeather } from '@/utils/weatherData'

const citiesList = ref<City[]>([])
const isLoading = ref(false)
const resultString = ref('')
const isError = ref(false)
const searchListOpen = ref(false)
const searchListOpenMobile = ref(false)

const geoStore = useGeoStore()
const unitStore = useUnitStore()
const setUnitHandler = (unit: 'metric' | 'imperial') => {
  unitStore.setUnit(unit)
  setUnit(unit)

  setWeather()
  setForecast()
}
const performSearch = async (word: string) => {
  let cities = await getCitiesByValue(word)
  if (Array.isArray(cities)) {
    const recvData: WeatherInfo[] | void = await getFullInfoByCities(
      cities.map((city) => ({
        lat: city.lat,
        lon: city.lon,
      }))
    )

    if (recvData?.length) {
      citiesList.value = recvData.map((city, idx) => ({
        id: idx,
        name: city.name,
        lat: city.coord.lat,
        lon: city.coord.lon,
        title: `${city.name}, ${getCountryByCode(city.sys.country)}`,
        temp: `${Math.round(city.main.temp)} ${
          unitStore.getUnit === 'metric' ? '°C' : '°F'
        }`,
        weatherIconUrl: `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`,
      }))
      isLoading.value = false
    } else if (recvData?.length === 0) {
      resultString.value = `По запросу "${word}" ничего не найдено`
      isLoading.value = false
    } else {
      resultString.value = 'Ошибка загрузки городов'
      isError.value = true
      isLoading.value = false
    }
  }
}
const debouncedSearch: (arg: string) => void = debounce(performSearch, 1000)
const handleSearch = (word: string, isMobile: boolean) => {
  if (isMobile && !word.trim()) {
    citiesList.value = []
    isError.value = false
    resultString.value = ''

    return undefined
  }
  if (word.trim()) {
    if (isMobile) searchListOpenMobile.value = true
    else searchListOpen.value = true

    isLoading.value = true
    debouncedSearch(word)
  } else {
    searchListOpen.value = false
    isLoading.value = false
  }
}
const handleClose = (isMobile: boolean, withoutClose?: boolean) => {
  resultString.value = ''
  citiesList.value = []
  isError.value = false

  if (withoutClose) return undefined

  if (isMobile) searchListOpenMobile.value = false
  else searchListOpen.value = false
}
const selectCityHandler = (city: City) => {
  const geo = {
    name: city.name,
    lat: city.lat,
    lon: city.lon,
  }

  geoStore.setGeo(geo)
  setGeo(geo)

  setWeather(geo.lat, geo.lon)
  setForecast(geo.lat, geo.lon)

  handleClose(true)
  handleClose(false)
}
</script>

<template>
  <header class="header">
    <div class="app-container header__container">
      <div class="header__left">
        <div class="header__left_logo">
          <img :src="logoIcon" alt="Logo" />
          <p>Weather <span class="text-red-500">App</span></p>
        </div>
        <div class="header__left_mobile-search">
          <button
            class="header__left_mobile-search_btn app-rounded"
            @click="searchListOpenMobile = true"
          >
            <img :src="searchIcon" alt="Search" />
          </button>
          <InputSearch
            :isMobile="true"
            @handle-search="handleSearch"
            @handle-close="handleClose"
            @handle-select="selectCityHandler"
            :isLoading="isLoading"
            :resultString="resultString"
            :isOpenMobile="searchListOpenMobile"
            :isError="isError"
            :cities-list="citiesList"
          />
        </div>
      </div>
      <div class="header__center">
        <InputSearch
          @handle-search="handleSearch"
          @handle-close="handleClose"
          @handle-select="selectCityHandler"
          :isLoading="isLoading"
          :resultString="resultString"
          :isOpen="searchListOpen"
          :isError="isError"
          :cities-list="citiesList"
        />
      </div>
      <div class="header__right">
        <div class="header__right_buttons toggle-buttons app-rounded">
          <button
            class="app-rounded"
            :class="{ active: unitStore.getUnit === 'metric' }"
            @click="setUnitHandler('metric')"
          >
            <span class="text">°C</span>
            <span class="app-rounded active-btn"></span>
          </button>
          <button class="app-rounded" @click="setUnitHandler('imperial')">
            <span class="text">°F</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import './header.scss';
</style>
