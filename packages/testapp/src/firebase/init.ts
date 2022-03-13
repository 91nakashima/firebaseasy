import firebase from 'firebase/app'

import { initFirebaseasy } from '../../../app/src/index'

const config = {}

const app = firebase.initializeApp(config)
const easyApp = initFirebaseasy(config)

export { app, easyApp }
