import { CollectionReference, Query } from 'firebase-admin/firestore'

/**
 * check type(CollectionReference | Query)
 */
export const isTypeCollectionOrQuery = (
  r: any
): r is CollectionReference | Query => {
  if (r instanceof CollectionReference) return true
  if (r instanceof Query) return true
  return false
}
