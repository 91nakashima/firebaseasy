import { easyConnect } from '@firebaseasy/firestore'
import { firestore, auth } from './init'

export const dbTest = easyConnect<{ id: string; text: string }>(
  firestore,
  'Test',
  () => {
    return {
      where: [['id', '==', auth.currentUser?.uid ?? '']]
    }
  }
)
