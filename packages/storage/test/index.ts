import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import config from './config.json'

export const app = initializeApp(config)
// export const firestore = getFirestore()
export const storage = getStorage()
