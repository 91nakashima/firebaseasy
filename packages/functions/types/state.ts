import { App } from 'firebase-admin/app'

export type State = {
  app?: App | null
  bucket?: string
}
