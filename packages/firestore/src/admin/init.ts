import { config } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const admin = initializeApp(config().firebase, 'firebaseasy')

export const firestore = getFirestore(admin)
export const auth = getAuth(admin)
