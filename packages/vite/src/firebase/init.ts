import { initializeApp } from 'firebase/app'
import config from './config.json'

const app = initializeApp(config)

export { app }
