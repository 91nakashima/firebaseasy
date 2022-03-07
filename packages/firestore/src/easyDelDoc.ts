import { getFirestore } from 'firebase/firestore'
import { doc, deleteDoc, collection } from 'firebase/firestore'
import { CollectionReference, DocumentReference } from 'firebase/firestore'

/**
 * delete Doc
 * @params 'cities/LA'
 */
export async function easyDelDoc (path: string): Promise<string> {
  const collectionArray = path.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: CollectionReference | DocumentReference | null = null
  const db = getFirestore()

  const dataNum = collectionArray.length

  if (dataNum === 1 || dataNum % 2 === 1) {
    // collection
    reference = collection(db, path)
  } else if (dataNum % 2 === 0) {
    // document
    reference = doc(db, path)
  }

  return new Promise((resolve, reject): void => {
    /**
     * ドキュメントを削除
     * https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
     */
    if (!reference) return reject()
    if (!(reference instanceof DocumentReference)) return reject()

    deleteDoc(reference)
      .then(() => resolve('ok'))
      .catch(() => reject())
  })
}
