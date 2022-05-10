import { ref } from 'vue'

export const count = ref(0)

export const useCountBtn = () => {
  return {
    count: ref(0)
  }
}
