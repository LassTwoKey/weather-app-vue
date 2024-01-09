<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import Today from './Today.vue'
import Tomorrow from './Tomorrow.vue'
import FiveDays from './FiveDays.vue'

const activeTab = ref<number>(1)
const tabs = shallowRef([
  {
    id: 1,
    title: 'Сегодня',
    component: Today,
  },
  {
    id: 2,
    title: 'Завтра',
    component: Tomorrow,
  },
  {
    id: 3,
    title: '5 Дней',
    component: FiveDays,
  },
])
const computedContent = computed(() =>
  tabs.value.find((tab) => tab.id === activeTab.value)
)
</script>

<template>
  <div id="tabs" class="tabs-wrapper">
    <div class="tabs">
      <button
        v-for="tab of tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="app-rounded"
        :class="[activeTab === tab.id ? 'active' : '']"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs__content">
      <component v-if="computedContent?.component" :is="computedContent.component"></component>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'tabs';
</style>
