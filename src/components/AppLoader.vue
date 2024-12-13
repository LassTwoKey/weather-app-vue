<script setup lang="ts">
interface Props {
  isStartLoading: boolean
}

const { isStartLoading } = defineProps<Props>()
</script>

<template>
  <div
    class="fixed inset-0 w-full h-full bg-white z-50 flex justify-center items-center duration-500"
    :class="{ 'top-full duration-500': !isStartLoading }"
  >
    <div class="grid gap-3">
      <span class="loader"></span>
      <h1 class="text-4xl font-medium text-gray-800">
        Weather <span class="text-red-500">App</span>
      </h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/style.scss';

.loader {
  width: 48px;
  height: 48px;
  display: block;
  margin: 20px auto;
  box-sizing: border-box;
  position: relative;
}
.loader::after {
  content: '';
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  left: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50% 50% 0;
  border: 15px solid $primary;
  transform: rotate(45deg) translate(0, 0);
  animation: animMarker 0.4s ease-in-out infinite alternate;
}
.loader::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 150%;
  width: 24px;
  height: 4px;
  border-radius: 50%;
  animation: animShadow 0.4s ease-in-out infinite alternate;
}

@keyframes animMarker {
  0% {
    transform: rotate(45deg) translate(5px, 5px);
  }
  100% {
    transform: rotate(45deg) translate(-5px, -5px);
  }
}

@keyframes animShadow {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
