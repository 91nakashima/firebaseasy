import serviceAccount from './security.json'
import { initializeApp, cert } from 'firebase-admin/app'
import { ServiceAccount } from 'firebase-admin/app'
// import { initializeEasyApp } from '../src'

const admin = initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
})

// import { initializeEasyApp } from '../src'
// initializeEasyApp({
//   bucket: 'yapo-b3e1d.appspot.com'
// })

export { admin }
