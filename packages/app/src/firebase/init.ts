import { initializeApp } from 'firebase/app'

const config = {
  apiKey: 'AIzaSyDLqCaS5enYj11Jata5WC2TpGXx_Y3xSXE',
  authDomain: 'yapoyapo.com',
  projectId: 'yapo-b3e1d',
  storageBucket: 'yapo-b3e1d.appspot.com',
  messagingSenderId: '553598338231',
  appId: '1:553598338231:web:3ad71813c648801019f932',
  measurementId: 'G-2DBWHNEZ5B'
}

const app = initializeApp(config)

export { app }
