<script setup lang="ts">

interface Props {
  isBorderless?: boolean
}

const { isBorderless } = defineProps<Props>()
</script>

<template>
<div :class="{'app-rounded bg-white p-3 shadow-sm shadow-red-400/50': !isBorderless}">
  <slot></slot>
</div>
</template>