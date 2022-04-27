import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import config from './config.json'

export const app = initializeApp(config)

export const firestore = getFirestore(app)
