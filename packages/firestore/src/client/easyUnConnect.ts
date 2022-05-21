import { state } from './data'

import { Unsubscribe } from 'firebase/firestore'

/**
 * Stop Firestore Real Time synchronization
 */
export const easyUnConnect = (path: string) => {
  if (!state[path].subscribe) return

  const unsbscribe = state[path].subscribe as Unsubscribe
  unsbscribe()

  state[path].data.clear()
  state[path].subscribe = null

  console.log(`easyUnConnect-> ${path}`)
}
