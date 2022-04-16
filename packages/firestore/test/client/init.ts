import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import config from './config.json'

export const app = initializeApp({
  apiKey: 'AIzaSyDLqCaS5enYj11Jata5WC2TpGXx_Y3xSXE',
  authDomain: 'yapo-b3e1d.firebaseapp.com',
  projectId: 'yapo-b3e1d',
  storageBucket: 'yapo-b3e1d.appspot.com',
  messagingSenderId: '553598338231',
  appId: '1:553598338231:web:617aade26877dafe19f932',
  measurementId: 'G-NHRHYY6R0V'
})
export const firestore = getFirestore(app)
// export const storage = getStorage()
