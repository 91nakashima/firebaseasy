import { createRef } from './createReference'
import { isTypeCollectionOrQuery } from './helpers/checkType'
import { DocumentReference } from 'firebase-admin/firestore'
import { QueryOption } from '../../types/easyGetData'

type GetDataType<T> = T extends any[] ? T : T | undefined

/**
 * get Doc or Collection Data
 */
export async function easyGetData<T> (
  path: string,
  option?: QueryOption
): Promise<GetDataType<T>> {
  const reference = createRef(path, option)

  /**
   * DocumentReferenceの場合
   */
  if (reference instanceof DocumentReference) {
    return new Promise((resolve, rejects) => {
      if (!(reference instanceof DocumentReference)) return rejects()
      reference
        .get()
        .then(doc => {
          if (!doc.exists) return resolve(undefined as GetDataType<T>)
          resolve(doc.data() as GetDataType<T>)
        })
        .catch(() => rejects())
    })
  }

  if (!isTypeCollectionOrQuery(reference)) throw new Error()
  const res = await reference.get()

  /**
   * document data in Array
   */
  const arr: Array<T> = []
  res.forEach(el => {
    if (!el.exists) return
    arr.push((el.data() as unknown) as T)
  })

  return arr as GetDataType<T>
}

/**
 * get Doc Data
 */
export async function easyGetDoc<T> (path: string): Promise<T | undefined> {
  const reference = createRef(path)

  /**
   * DocumentReferenceの場合
   */
  if (!(reference instanceof DocumentReference)) throw new Error()

  return new Promise((resolve, rejects) => {
    if (!(reference instanceof DocumentReference)) return rejects()
    reference
      .get()
      .then(doc => {
        if (!doc.exists) return resolve(undefined)
        resolve((doc.data() as unknown) as T)
      })
      .catch(() => rejects())
  })
}

/**
 * get Collection Data
 */
export async function easyGetDocs<T> (
  path: string,
  option?: QueryOption
): Promise<T[]> {
  const reference = createRef(path, option)

  if (!isTypeCollectionOrQuery(reference)) throw new Error()
  const res = await reference.get()

  /**
   * document data in Array
   */
  const arr: T[] = []
  res.forEach(el => {
    if (!el.exists) return
    arr.push((el.data() as unknown) as T)
  })

  return arr as T[]
}
