import { getDoc, getDocs } from "firebase/firestore"

import { Firestore, DocumentReference } from "firebase/firestore"
import { QueryDocumentSnapshot } from "firebase/firestore"
import { QueryOption } from "../types/easyGetData"

import { createRef } from "./createReference"
import { isTypeCollectionOrQuery } from "./helpers/checkType"

/**
 * get Doc Data
 */
export async function easyGetDoc<T>(
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
      .then((doc) => {
        if (!doc.exists) return resolve(undefined)
        resolve(doc.data() as T | undefined)
      })
      .catch(() => rejects())
  })
}

/**
 * get Collection Data
 */
export async function easyGetDocs<T>(
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
  const arr: T[] = []
  res.forEach((el: QueryDocumentSnapshot) => {
    if (!el.exists) return
    const obj = el.data() as unknown
    arr.push(obj as T)
  })

  return arr
}
