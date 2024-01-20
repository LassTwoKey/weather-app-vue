<script setup lang="ts">
import { ref } from 'vue'
import { City } from '@/types'
import searchIcon from '@/assets/search.svg'
import closeIcon from '@/assets/close.svg'

interface Props {
  citiesList: City[]
  isLoading?: boolean
  isOpen?: boolean
  isOpenMobile?: boolean
  resultString: string
  isError: boolean
  isMobile?: boolean
}

const {
  citiesList,
  isLoading,
  isOpen,
  isOpenMobile,
  resultString,
  isError,
  isMobile,
} = defineProps<Props>()
const emits = defineEmits(['handle-search', 'handle-close', 'handle-select'])
const searchInputRef = ref<HTMLInputElement | null>(null)

const searchHandler = (event: Event) => {
  const word = (event.target as HTMLInputElement).value

  emits('handle-search', word, isMobile)
}
const clearSearchHandler = (_:any, isCloseBtn?:boolean, word?:string) => {
  if (word) {
    if (searchInputRef.value) {
      searchInputRef.value.value = ''
    }
    emits('handle-close', isMobile, true)
    return undefined
  }

  if (!(document.body.offsetWidth > 768) && !isCloseBtn) {
    return undefined
  }
  

  if (searchInputRef.value) {
    searchInputRef.value.value = ''
  }
  searchInputRef.value = null
  emits('handle-close', isMobile)
}
const selectCityHandler = (city: City) => {
  emits('handle-select', city)
}
</script>

<template>
  <div v-if="!isMobile" class="search" v-click-outside="clearSearchHandler">
    <div class="search__field" :class="{
        'app-rounded': !isOpen,
        'rounded-t-lg': isOpen,
      }">
      <input
        type="text"
        ref="searchInputRef"
        @input="searchHandler"
        placeholder="Введите город"
      />
      <button v-if="!isOpen" class="search__field_btn">
        <img class="scale-125" :src="searchIcon" alt="Search" />
      </button>
      <button v-else @click="clearSearchHandler" class="search__field_btn">
        <img class="scale-150" :src="closeIcon" alt="Clear" />
      </button>
    </div>
    <div
      v-if="isLoading"
      class="search__list"
      :class="{ 'opacity-0 invisible': !isOpen }"
    >
      <div class="search__loader">
        <div class="text-center font-medium">
          <span class="loader-dot"></span>
        </div>
      </div>
    </div>
    <ul
      v-if="!isLoading"
      class="search__list"
      :class="{ 'opacity-0 invisible': !isOpen }"
    >
      <li class="search__item" v-for="city of citiesList" :key="city.id">
        <button @click="selectCityHandler(city)">
          <span class="search__item_info">
            <span>{{ city.title }}</span>
            <span>{{ city.temp }}</span>
          </span>
          <img :src="city.weatherIconUrl" alt="Icon" />
        </button>
      </li>
    </ul>
    <div
      v-if="!isLoading && !citiesList.length && !isError"
      class="search__list"
      :class="{ 'opacity-0 invisible': !isOpen }"
    >
      <div class="text-center py-2">{{ resultString }}</div>
    </div>
    <div
      v-if="!isLoading && isError"
      class="search__list"
      :class="{ 'opacity-0 invisible': !isOpen }"
    >
      <div class="text-center py-2 text-red-600">{{ resultString }}</div>
    </div>
  </div>

  <div
    v-else
    class="search-wrapper-mobile"
    :class="{ 'show-mobile-search': isOpenMobile }"
  >
    <div class="search">
      <div class="search__field app-rounded mx-3">
        <input
          type="text"
          ref="searchInputRef"
          @input="searchHandler"
          placeholder="Введите город"
        />
        <button v-if="!isOpenMobile" class="search__field_btn">
          <img :src="searchIcon" alt="Search" />
        </button>
        <button v-else @click="clearSearchHandler($event, true, searchInputRef?.value)" class="search__field_btn">
          <img class="scale-150" :src="closeIcon" alt="Clear" />
        </button>
      </div>
      <div
        v-if="isLoading"
        class="search__list mt-3"
        :class="{ 'opacity-0 invisible': !isOpenMobile }"
      >
        <div class="search__loader">
          <div class="text-center font-medium">
            <span class="loader-dot"></span>
          </div>
        </div>
      </div>
      <ul
        v-if="!isLoading"
        class="search__list mt-3"
        :class="{ 'opacity-0 invisible': !isOpenMobile }"
      >
        <li class="search__item" v-for="city of citiesList" :key="city.id">
          <button @click="selectCityHandler(city)">
            <span class="search__item_info">
              <span>{{ city.title }}</span>
              <span>{{ city.temp }}</span>
            </span>
            <img :src="city.weatherIconUrl" alt="Icon" />
          </button>
        </li>
      </ul>
      <div
        v-if="!isLoading && !citiesList.length && !isError"
        class="search__list mt-3"
        :class="{ 'opacity-0 invisible': !isOpenMobile }"
      >
        <div class="text-center py-2">{{ resultString }}</div>
      </div>
      <div
        v-if="!isLoading && isError"
        class="search__list"
        :class="{ 'opacity-0 invisible': !isOpenMobile }"
      >
        <div class="text-center py-2 text-red-600">{{ resultString }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './inputSearch.scss';
</style>
