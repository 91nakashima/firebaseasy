import { easyConnect } from '@firebaseasy/firestore'
import { firestore } from './init'

export const dbTest = easyConnect<{ id: string; text: string }>(
  firestore,
  'Test'
)
