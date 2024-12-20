import { onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { useWeatherInfoStore } from '@/store/weatherInfoStore'
import { AnimateOptions, AnimateTabContentOptions } from '@/types'

export const useAnimateTabContent = (
  className: string,
  options: AnimateTabContentOptions
) => {
  let ctx: gsap.core.Tween

  const valueOptions = {
    delay: options.delay ?? 0,
    y: options.y ?? 30,
    x: options.x ?? 0,
    duration: options.duration ?? 0.3,
    staggerEach: options.staggerEach ?? 0.1,
  }

  onMounted(() => {
    ctx = gsap.from(gsap.utils.toArray(className), {
      delay: valueOptions.delay ?? 0,
      opacity: 0,
      y: valueOptions.y ?? 0,
      x: valueOptions.x ?? 0,
      duration: valueOptions.duration ?? 0.3,
      stagger: {
        each: valueOptions.staggerEach ?? 0.1,
        from: 'start',
      },
    })
  })

  onUnmounted(() => {
    ctx.revert()
  })
}

export const useAnimateElems = (className: string, options: AnimateOptions) => {
  let ctx: gsap.core.Tween

  const weatherInfoStore = useWeatherInfoStore()

  let isAnimating = false

  const valueOptions = {
    delay: options.delayOnStart ?? options.delay ?? 0,
    x: options.x ?? 10,
    y: options.y ?? 0,
    duration: options.duration ?? 0.3,
    staggerEach: options.staggerEach ?? 0.1,
  }

  watch(weatherInfoStore, () => {
    if (isAnimating) return

    if (gsap.utils.toArray(className).length) {
      ctx = gsap.from(gsap.utils.toArray(className), {
        delay: options.delay ?? 0,
        opacity: 0,
        y: valueOptions.y ?? 0,
        x: valueOptions.x ?? 0,
        duration: valueOptions.duration ?? 0.3,
        stagger: {
          each: valueOptions.staggerEach ?? 0.1,
          from: 'start',
        },
        onStart: () => {
          isAnimating = true
        },
        onComplete: () => {
          isAnimating = false
        },
      })
    }
  })

  onMounted(() => {
    if (options.immediate) {
      gsap.killTweensOf(className)
      ctx = gsap.from(gsap.utils.toArray(className), {
        delay: options.delayOnStart ?? options.delay ?? 0,
        opacity: 0,
        y: valueOptions.y ?? 0,
        x: valueOptions.x ?? 0,
        duration: valueOptions.duration ?? 0.3,
        stagger: {
          each: valueOptions.staggerEach ?? 0.1,
          from: 'start',
        },
        onStart: () => {
          isAnimating = true
        },
        onComplete: () => {
          isAnimating = false
        },
      })
    }
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}

export const useAnimateElemsTo = (
  className: string,
  options: AnimateOptions,
  watchedValue: object
) => {
  let ctx: gsap.core.Tween

  let isAnimating = false

  watch(watchedValue, () => {
    if (isAnimating) return

    ctx = gsap.to(className, {
      ...options,
      onStart: () => {
        isAnimating = true
      },
      onComplete: () => {
        isAnimating = false
      },
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
