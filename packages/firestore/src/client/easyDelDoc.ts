import { deleteDoc } from 'firebase/firestore'
import { Firestore, DocumentReference } from 'firebase/firestore'

import { createRef } from './createReference'

/**
 * delete Doc
 * @params 'cities/LA'
 */
export async function easyDelDoc (
  db: Firestore,
  path: string
): Promise<string> {
  let reference = createRef(db, path)

  return new Promise((resolve, reject): void => {
    /**
     * ドキュメントを削除
     * https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
     */
    if (!reference) return reject()
    if (!(reference instanceof DocumentReference)) return reject()

    deleteDoc(reference)
      .then(() => {
        console.log('\u001b[32measyDelDoc\n' + path)
        resolve('ok')
      })
      .catch(() => reject())
  })
}
