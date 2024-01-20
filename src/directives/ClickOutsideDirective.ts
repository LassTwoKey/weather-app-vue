import { DirectiveBinding } from 'vue'

interface HTMLElementWithClickOutsideEvent extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void
  windowClickOutsideEvent?: (event: KeyboardEvent) => void
}

const ClickOutsideDirective = {
  beforeMount(el: HTMLElementWithClickOutsideEvent, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    el.windowClickOutsideEvent = function (event) {
      if (event.defaultPrevented) return

      let handled = false
      if (event.key !== undefined) {
        handled = true
      }

      if (handled) {
        if (event.key === 'Escape') {
          binding.value(null)
        }
      }
    }
    document.addEventListener('click', el.clickOutsideEvent!)
    window.addEventListener('keydown', el.windowClickOutsideEvent!)
  },
  unmounted(el: HTMLElementWithClickOutsideEvent) {
    document.removeEventListener('click', el.clickOutsideEvent!)
    window.removeEventListener('keydown', el.windowClickOutsideEvent!)
  },
}

export default ClickOutsideDirective
