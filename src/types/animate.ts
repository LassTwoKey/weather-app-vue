export interface AnimateOptions {
  duration?: number
  x?: number
  y?: number
  staggerEach?: number
  immediate?: boolean
  delay?: number
  delayOnStart?: number
  scale?: number
  ease?: string
  yoyo?: boolean
  repeat?: number
}

export type AnimateTabContentOptions = Omit<AnimateOptions, 'immediate'>
