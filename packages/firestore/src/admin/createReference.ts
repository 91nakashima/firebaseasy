import { firestore } from './init'
import { isTypeCollectionOrQuery } from './helpers/checkType'

import {
  CollectionReference,
  DocumentReference,
  Query
} from 'firebase-admin/firestore'
import { QueryOption, WhereOption } from '../../types/easyGetData'

/**
 * Create Reference
 */
export const createRef = (
  path: string,
  option?: QueryOption
): Query | CollectionReference | DocumentReference => {
  const collectionArray = path.split('/').filter(d => d)
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

  if (!reference) throw new Error()

  if (reference instanceof DocumentReference) return reference

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/queries?hl=ja#simple_queries
   */
  if (option?.where) {
    option.where.map((w: WhereOption) => {
      if (!isTypeCollectionOrQuery(reference)) return w
      reference = reference.where(w[0], w[1], w[2])
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option?.orderBy) {
    option.orderBy.map((w: string) => {
      if (!isTypeCollectionOrQuery(reference) || !w) return w
      reference = reference.orderBy(w)
      return w
    })
  }

  /**
   * document
   * https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ja#order_and_limit_data
   */
  if (option?.limit) {
    if (!isTypeCollectionOrQuery(reference)) throw new Error()
    reference = reference.limit(option.limit)
  }

  return reference
}
