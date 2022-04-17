import { State } from '../types/state'

export const state: State = {
  app: null,
  bucket: ''
}

/**
 * setup App
 */
export const initializeEasyApp = (setApp: State): void => {
  if (setApp.app) state.app = setApp.app
  if (setApp.bucket) state.bucket = setApp.bucket
}
