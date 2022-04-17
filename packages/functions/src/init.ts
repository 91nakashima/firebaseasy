import { config } from 'firebase-functions'
import { initializeApp, getApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'
import { state } from './setup'

/**
 * init
 */
export const funAdmin = () => {
  if (!getApps().length) {
    return initializeApp(config().firebase, 'easy-firebase-functions')
  }
  return state.app ?? getApp()
}

/**
 * プロジェクトIDを取得
 */
export const funGebucket = (): string => {
  if (state.bucket) return state.bucket

  if (funAdmin().options.projectId) {
    return `${funAdmin().options.projectId}.appspot.com`
  }

  return ''
}

export const firestore = getFirestore(funAdmin())
export const auth = getAuth(funAdmin())
export const storage = getStorage(funAdmin())
