import { getDoc, getDocs } from 'firebase/firestore'

import { Firestore, DocumentReference } from 'firebase/firestore'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { QueryOption } from '../types/easyGetData'

import { createRef } from './createReference'
import { isTypeCollectionOrQuery } from './helpers/checkType'

// type FirebaseGetDataType<T, U> = U extends ''
// 	? never
// 	: U extends `${infer Collection}/${infer Document}/${infer Rest}/${infer RestDoc}`
// 	? T | undefined
// 	: U extends `${infer Collection}/${infer Document}/${infer Rest}`
// 	? T[]
// 	: U extends `${infer Collection}/${infer Document}`
// 	? T | undefined
// 	: U extends `${infer Collection}`
// 	? T[]
// 	: never

type GetDataType<T> = T extends any[] ? T : T | undefined

/**
 * get Doc or collection Data
 */
export async function easyGetData<T> (
  db: Firestore,
  path: string,
  option?: QueryOption
): Promise<GetDataType<T>> {
  const reference = createRef(db, path, option)

  /**
   * DocumentReferenceの場合
   */
  if (reference instanceof DocumentReference) {
    return new Promise((resolve, rejects) => {
      if (!(reference instanceof DocumentReference)) return rejects()

      getDoc(reference)
        .then(doc => {
          if (!doc.exists) return resolve(undefined as GetDataType<T>)
          resolve(doc.data() as GetDataType<T>)
        })
        .catch(() => rejects())
    })
  }

  const res = await getDocs(reference)

  /**
   * document data in Array
   */
  const arr: unknown[] = []
  res.forEach(el => {
    if (!el.exists) return
    arr.push(el.data())
  })

  return arr as GetDataType<T>
}

/**
 * get Doc Data
 */
export async function easyGetDoc<T> (
  db: Firestore,
  path: string
): Promise<T | undefined> {
  const reference = createRef(db, path)

  /**
   * DocumentReference以外の場合はエラー
   */
  if (!(reference instanceof DocumentReference)) throw new Error()

  return new Promise((resolve, rejects) => {
    if (!(reference instanceof DocumentReference)) return rejects()

    getDoc(reference)
      .then(doc => {
        if (!doc.exists) return resolve(undefined)
        resolve(doc.data() as T | undefined)
      })
      .catch(() => rejects())
  })
}

/**
 * get Collection Data
 */
export async function easyGetDocs<T> (
  db: Firestore,
  path: string,
  option?: QueryOption
): Promise<T[]> {
  const reference = createRef(db, path, option)

  if (!isTypeCollectionOrQuery(reference)) throw new Error()
  const res = await getDocs(reference)

  /**
   * document data in Array
   */
  const arr: Array<T> = []
  res.forEach((el: QueryDocumentSnapshot) => {
    if (!el.exists) return
    const obj = el.data() as unknown
    arr.push(obj as T)
  })

  return arr
}
