import { initializeApp } from 'firebase/app'

import { FirebaseOptions } from 'firebase/app'

export function initFirebaseasy (
  options: FirebaseOptions,
  name?: string | undefined
) {
  return initializeApp(options, name)
}
