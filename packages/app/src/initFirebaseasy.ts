import { initializeApp } from 'firebase/app'
import { FirebaseApp, FirebaseOptions } from 'firebase/app'

let easyApp: FirebaseApp | undefined = undefined

export function initFirebaseasy (
  options: FirebaseOptions,
  name?: string | undefined
) {
  easyApp = initializeApp(options, name)
  return easyApp
}

export function getEasyApp (): FirebaseApp | undefined {
  return easyApp
}
