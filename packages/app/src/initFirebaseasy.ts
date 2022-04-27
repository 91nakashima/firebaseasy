import { Firestore } from 'firebase/firestore'
import { FirebaseStorage } from 'firebase/storage'

type Data = {
  firestore: Firestore | null
  storage: FirebaseStorage | null
}

export const firebaseRefarenceData: Data = {
  firestore: null,
  storage: null
}

export function initFirebaseasy (
  firestore: Firestore | null = null,
  storage: FirebaseStorage | null = null
) {
  firebaseRefarenceData.firestore = firestore
  firebaseRefarenceData.storage = storage
}
