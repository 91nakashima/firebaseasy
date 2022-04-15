import { firestore } from './init'
import {
  CollectionReference,
  DocumentReference
} from 'firebase-admin/firestore'

/**
 * delete Doc
 * @params 'cities/LA'
 */
export async function easyDelDoc (data: string): Promise<string> {
  const collectionArray = data.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: CollectionReference | DocumentReference | null = null
  for (let i = 0; i < collectionArray.length; i++) {
    if (i === 0) {
      reference = firestore.collection(collectionArray[i])
    } else if (i % 2 === 1 && reference instanceof CollectionReference) {
      reference = reference.doc(collectionArray[i])
    } else if (i % 2 === 0 && reference instanceof DocumentReference) {
      reference = reference.collection(collectionArray[i])
    }
  }

  return new Promise((resolve, reject): void => {
    if (!reference) return reject()
    if (!(reference instanceof DocumentReference)) return reject()
    reference
      .delete()
      .then(() => resolve('ok'))
      .catch(() => reject())
  })
}
