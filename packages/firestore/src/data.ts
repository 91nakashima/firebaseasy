import { reactive } from 'vue'

import { Unsubscribe } from 'firebase/firestore'

/**
 *
 */
export const state: {
  [key: string]: {
    data: Map<string, any>
    subscribe: Unsubscribe | null
  }
} = reactive({})

/**
 * stateを作成
 */
export const createState = (path: string) => {
  if (!state[path]) {
    state[path] = {
      data: new Map(),
      subscribe: null
    }
  }
}
