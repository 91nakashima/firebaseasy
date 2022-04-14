import { firestore } from './init'
import {
  CollectionReference,
  DocumentReference
} from 'firebase-admin/firestore'

import { EasySetDoc } from '../types/EasySetDoc'

/**
 * set doc
 */
export async function easySetDoc<T> (
  path: string,
  data: EasySetDoc & T
): Promise<string> {
  const collectionArray = path.split('/').filter(d => d)
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

  if (!(reference instanceof CollectionReference)) throw new Error()

  // idがある場合
  if (data.id) {
    const getData = await reference.doc(data.id).get()
    if (getData.data()) {
      // 情報がある場合(updata)
      data.updated_at = new Date()
      await reference.doc(data.id).update(data)
    } else {
      // 情報がない場合(create)
      data.created_at = new Date()
      await reference.doc(data.id).set(data)
    }
    return data.id
  }

  // idがない場合(create)
  data.created_at = new Date()
  const newDoc = await reference.add(data)
  await reference.doc(newDoc.id).update({ id: newDoc.id })
  return newDoc.id
}
