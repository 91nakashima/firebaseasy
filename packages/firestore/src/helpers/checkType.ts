import { CollectionReference } from 'firebase/firestore'
import { Query } from 'firebase/firestore'

/**
 * check type
 */
export const isTypeCollectionOrQuery = (
  r: any
): r is CollectionReference | Query => {
  if (r instanceof CollectionReference) return true
  if (r instanceof Query) return true
  return false
}
