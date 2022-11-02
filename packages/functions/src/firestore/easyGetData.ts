import { Firestore } from 'firebase-admin/firestore'
import { DocumentReference } from 'firebase-admin/firestore'
import { CollectionReference, Query } from 'firebase-admin/firestore'

import { QueryOption, WhereOption } from '../../types/easyGetData'

type GetDataType<T> = T extends any[] ? T : T | undefined

/**
 * get Doc or Collection Data
 * @returns Array | Object | undefind
 */
export async function easyGetData<T> (
  firestore: Firestore,
  path: string,
  option?: QueryOption
): Promise<GetDataType<T>> {
  const collectionArray = path.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: Query | CollectionReference | DocumentReference =
    collectionArray.length % 2 === 0
      ? firestore.doc(path)
      : firestore.collection(path)

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
  if (option?.where) {
    option.where.map((w: WhereOption) => {
      reference = (reference as CollectionReference).where(w[0], w[1], w[2])
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option?.orderBy) {
    option.orderBy.map(w => {
      if (!w) return w
      if (typeof w === 'string') {
        reference = (reference as CollectionReference).orderBy(w)
      } else {
        reference = (reference as CollectionReference).orderBy(w[0], w[1])
      }
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option?.limit) {
    reference = (reference as CollectionReference).limit(option.limit)
  }

  const res = await (reference as CollectionReference).get()

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
