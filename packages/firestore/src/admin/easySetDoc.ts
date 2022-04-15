import { firestore } from './init'
import { randamString } from '../common/randamString'

import {
  DocumentReference,
  CollectionReference
} from 'firebase-admin/firestore'
import { EasySetDoc } from '../../types/EasySetDoc'

/**
 * set doc
 */
export const easySetDoc = async <T>(
  path: string,
  data: EasySetDoc & T
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
        if (collectionArray[i] !== data.id) throw new Error() // エラー
        if (!data.id) data.id = collectionArray[i] // 代入
      }

      // DocumentReference
      reference = reference.doc(collectionArray[i])
    } else if (i % 2 === 0 && reference instanceof DocumentReference) {
      // 最後
      if (i === collectionArray.length - 1) {
        // DocumentReference
        if (collectionArray[i] !== data.id) throw new Error()
        if (data.id) reference = reference.doc(data.id)
      }

      // CollectionReference
      reference = reference.collection(collectionArray[i])
    }
  }

  // idがある場合
  if (data.id && reference instanceof DocumentReference) {
    const getData = await (reference as DocumentReference).get()

    if (getData.data()) {
      // 情報がある場合(updata)
      data.updated_at = new Date()
      await reference.update(data)
    } else {
      // 情報がない場合(create)
      data.created_at = new Date()
      await reference.set(data)
    }

    return data.id
  }

  // idがない場合(create)
  const createId = randamString()
  data.created_at = new Date()
  data.id = createId

  if (!(reference instanceof CollectionReference)) throw new Error()
  await reference.doc(createId).set(data)
  return createId
}
