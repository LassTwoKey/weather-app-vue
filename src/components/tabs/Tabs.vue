<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import Today from '@/components/tabs/Today.vue'
import Tomorrow from '@/components/tabs/Tomorrow.vue'
import FiveDays from '@/components/tabs/FiveDays.vue'

const activeTab = ref(1)
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

const activeTabComponent = computed(
  () => tabs.value.find((tab) => tab.id === activeTab.value)?.component
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
        :class="[activeTab === tab.id && 'active']"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs__content">
      <component :is="activeTabComponent"></component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-wrapper {
  @apply w-full;
}

.tabs {
  @apply overflow-hidden py-4 md:py-8 flex gap-4 md:gap-8;
  button {
    @apply bg-white py-2 font-medium text-gray-800 flex-auto shadow-sm shadow-red-400/50;
    &.active {
      @apply from-red-400 bg-purple-500 bg-gradient-to-b text-white;
    }
  }
  &__content {
  }
}
</style>
