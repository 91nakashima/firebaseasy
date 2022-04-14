import serviceAccount from './security.json'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { ServiceAccount } from 'firebase-admin/app'

const admin = initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
})

export const firestore = getFirestore()
export { admin }
