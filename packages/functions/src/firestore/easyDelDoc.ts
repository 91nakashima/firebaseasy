import { Firestore } from 'firebase-admin/firestore'
// import { DocumentReference } from 'firebase-admin/firestore'
// import { CollectionReference } from 'firebase-admin/firestore'

/**
 * delete Doc
 * @params 'cities/LA'
 */
export async function easyDelDoc (
  firestore: Firestore,
  path: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    firestore
      .doc(path)
      .delete()
      .then(() => resolve(path))
      .catch(e => reject(e))
  })
}
