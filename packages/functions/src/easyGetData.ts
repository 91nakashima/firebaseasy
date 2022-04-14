import { firestore } from './init'
import {
  CollectionReference,
  DocumentReference,
  Query
} from 'firebase-admin/firestore'

import { QueryOption, WhereOption } from '../types/easyGetData'

type GetDataType<T> = T extends any[] ? T : T | undefined

/**
 * check type
 */
const isUseType = (r: any): r is CollectionReference | Query => {
  if (r instanceof CollectionReference) return true
  if (r instanceof Query) return true
  return false
}

/**
 * get Doc or Collection Data
 */
export async function easyGetData<T> (
  data: string,
  option: QueryOption = {}
): Promise<GetDataType<T>> {
  const collectionArray = data.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: Query | CollectionReference | DocumentReference | null = null

  for (let i = 0; i < collectionArray.length; i++) {
    if (i === 0) {
      reference = firestore.collection(collectionArray[i])
    } else if (i % 2 === 1 && reference instanceof CollectionReference) {
      reference = reference.doc(collectionArray[i])
    } else if (i % 2 === 0 && reference instanceof DocumentReference) {
      reference = reference.collection(collectionArray[i])
    }
  }

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

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
   */
  if (option.where) {
    option.where.map((w: WhereOption) => {
      if (!isUseType(reference)) return w
      reference = reference.where(w[0], w[1], w[2])
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option.orderBy) {
    option.orderBy.map((w: string) => {
      if (!isUseType(reference) || !w) return w
      reference = reference.orderBy(w)
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option.limit) {
    if (!isUseType(reference)) throw new Error()
    reference = reference.limit(option.limit)
  }

  if (!isUseType(reference)) throw new Error()
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
export async function easyGetDoc<T> (
  data: string,
  option: QueryOption = {}
): Promise<T | undefined> {
  const collectionArray = data.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: Query | CollectionReference | DocumentReference | null = null

  for (let i = 0; i < collectionArray.length; i++) {
    if (i === 0) {
      reference = firestore.collection(collectionArray[i])
    } else if (i % 2 === 1 && reference instanceof CollectionReference) {
      reference = reference.doc(collectionArray[i])
    } else if (i % 2 === 0 && reference instanceof DocumentReference) {
      reference = reference.collection(collectionArray[i])
    }
  }

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
  data: string,
  option: QueryOption = {}
): Promise<T[]> {
  const collectionArray = data.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: Query | CollectionReference | DocumentReference | null = null

  for (let i = 0; i < collectionArray.length; i++) {
    if (i === 0) {
      reference = firestore.collection(collectionArray[i])
    } else if (i % 2 === 1 && reference instanceof CollectionReference) {
      reference = reference.doc(collectionArray[i])
    } else if (i % 2 === 0 && reference instanceof DocumentReference) {
      reference = reference.collection(collectionArray[i])
    }
  }

  /**
   * CollectionReference以外はエラー
   */
  if (!(reference instanceof CollectionReference)) throw new Error()

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
   */
  if (option.where) {
    option.where.map((w: WhereOption) => {
      if (!isUseType(reference)) return w
      reference = reference.where(w[0], w[1], w[2])
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option.orderBy) {
    option.orderBy.map((w: string) => {
      if (!isUseType(reference) || !w) return w
      reference = reference.orderBy(w)
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option.limit) {
    if (!isUseType(reference)) throw new Error()
    reference = reference.limit(option.limit)
  }

  if (!isUseType(reference)) throw new Error()
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
