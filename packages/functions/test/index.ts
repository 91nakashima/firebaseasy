import serviceAccount from './security.json'
import { initializeApp, cert } from 'firebase-admin/app'
import { ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
// import { initializeEasyApp } from '../src'

export const admin = initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
})

export const firestore = getFirestore(admin)

// import { initializeEasyApp } from '../src'
// initializeEasyApp({
//   bucket: 'yapo-b3e1d.appspot.com'
// })
