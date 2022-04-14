import { config } from 'firebase-functions'
// import { getApps } from 'firebase-admin/app'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

// if (!getApps().length) {
//  initializeApp(config().firebase, 'easy-firebase-functions')
// }

const admin = initializeApp(config().firebase, 'easy-firebase-functions')
export const firestore = getFirestore(admin)
export const auth = getAuth(admin)
