<script setup lang="ts">
import Card from '@/components/UI/Card.vue'
import { MainCard } from '@/types'

interface Props {
  options: MainCard
  isBorderless?: boolean
}

const { options, isBorderless } = defineProps<Props>()
</script>

<template>
  <Card class="flex gap-3" :is-borderless="isBorderless">
    <img
      class="select-none pointer-events-none w-6"
      :src="options.iconSrc"
      :alt="options.title"
    />
    <div class="font-medium">
      <h3 class="text-gray-800 text-sm md:text-base">{{ options.title }}</h3>
      <p :class="['text-gray-400 text-xs md:text-base']">
        {{ options.value }}
        <span v-if="options.descr" class="text-red-400">{{
          options.descr
        }}</span>
      </p>
    </div>
  </Card>
</template>
