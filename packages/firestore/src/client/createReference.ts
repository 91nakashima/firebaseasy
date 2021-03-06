import { doc, collection } from 'firebase/firestore'
import { query, where, orderBy, limit } from 'firebase/firestore'

import { Firestore } from 'firebase/firestore'
import { CollectionReference, DocumentReference } from 'firebase/firestore'
import { Query } from 'firebase/firestore'
import { QueryOption, WhereOption } from './index'

import { isTypeCollectionOrQuery } from './helpers/checkType'

/**
 * Create Reference
 */
export const createRef = (
  db: Firestore,
  path: string,
  option?: QueryOption
): Query | CollectionReference | DocumentReference => {
  const collectionArray = path.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: Query | CollectionReference | DocumentReference | null = null

  const dataNum = collectionArray.length

  if (dataNum === 1 || dataNum % 2 === 1) {
    // collection
    reference = collection(db, path)
  } else if (dataNum % 2 === 0) {
    // document
    reference = doc(db, path)
  }

  if (!reference) throw new Error()

  if (reference instanceof DocumentReference) return reference

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
   */
  if (option?.where) {
    option.where.map((w: WhereOption) => {
      if (!isTypeCollectionOrQuery(reference)) return w
      reference = query(reference, where(w[0], w[1], w[2]))
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option?.orderBy) {
    option.orderBy.map(w => {
      if (!isTypeCollectionOrQuery(reference) || !w) return w

      if (typeof w === 'string') {
        reference = query(reference, orderBy(w))
      } else {
        reference = query(reference, orderBy(w[0], w[1]))
      }

      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option?.limit) {
    if (!isTypeCollectionOrQuery(reference)) throw new Error()
    reference = query(reference, limit(option.limit))
  }

  return reference
}
