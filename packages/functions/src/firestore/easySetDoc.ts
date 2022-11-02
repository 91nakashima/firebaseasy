import { randamString } from '../common'

import { Firestore } from 'firebase-admin/firestore'
import { DocumentReference } from 'firebase-admin/firestore'
import { CollectionReference } from 'firebase-admin/firestore'

/**
 * idを持っているかを判断する
 */
export const isHaveId = (d: any): d is { id: string } => {
  return !!d?.id
}

/**
 * set doc
 */
export const easySetDoc = async <T>(
  firestore: Firestore,
  path: string,
  data: T
): Promise<string> => {
  const collectionArray = path.split('/').filter(d => d)

  if (!collectionArray.length) throw new Error()

  let reference: CollectionReference | DocumentReference | null = null

  for (let i = 0; i < collectionArray.length; i++) {
    if (i === 0) {
      // CollectionReference
      reference = firestore.collection(collectionArray[i])
    } else if (i % 2 === 1 && reference instanceof CollectionReference) {
      // 最後
      if (i === collectionArray.length - 1) {
        if (!isHaveId(data)) {
          data = { ...data, ...{ id: collectionArray[i] } } // 代入
        } else if (collectionArray[i] !== data.id) {
          throw new Error() // エラー
        }
      }

      // DocumentReference
      reference = reference.doc(collectionArray[i])
    } else if (i % 2 === 0 && reference instanceof DocumentReference) {
      // 最後
      if (i === collectionArray.length - 1) {
        // DocumentReference
        if (isHaveId(data) && collectionArray[i] !== data.id) throw new Error()

        if (isHaveId(data) && reference instanceof CollectionReference) {
          reference = reference.doc(data.id)
        }
      }

      // CollectionReference
      reference = reference.collection(collectionArray[i])
    }
  }

  // idがない場合(create)
  if (!isHaveId(data)) {
    const createId = randamString()
    data = { ...data, ...{ id: createId } }
  }

  if (!isHaveId(data)) throw new Error()

  await (reference as CollectionReference).doc(data.id).set(data as Object)
  return data.id
}
