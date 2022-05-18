import { doc, setDoc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { createPath, randamString } from '../common'

import { Firestore, SetOptions } from 'firebase/firestore'
import { CollectionReference, DocumentReference } from 'firebase/firestore'

/**
 * コンソール表示用
 */
export const createShowPath = (path: string, id: string) => {
  const arr = path.split('/').filter(d => d)

  path = `${arr[0]}/${id}`

  return path
}

/**
 * idを持っているかを判断する
 */
export const isHaveId = (d: any): d is { id: string } => {
  return !!d?.id
}

/**
 * set doc
 */
export async function easySetDoc<T> (
  db: Firestore,
  collectionPath: string,
  data: T,
  setOptions: SetOptions = { merge: true }
): Promise<string> {
  const collectionArray = collectionPath.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: CollectionReference | DocumentReference | null = null

  const dataNum = collectionArray.length

  if (dataNum === 1 || dataNum % 2 === 1) {
    // collection
    reference = collection(db, collectionPath)

    // document
    if (isHaveId(data)) {
      reference = doc(db, createPath(collectionPath, data.id))
    }
  } else if (dataNum % 2 === 0) {
    // document
    if (isHaveId(data) && collectionArray[dataNum - 1] !== data.id) {
      throw new Error()
    }

    if (!isHaveId(data)) {
      data = { ...data, ...{ id: collectionArray[dataNum - 1] } }
    }
    reference = doc(db, collectionPath)
  }

  // idがある場合
  if (isHaveId(data)) {
    if (!(reference instanceof DocumentReference)) throw new Error()

    await setDoc(reference, data, setOptions)

    console.log(
      '\u001b[32measySetDoc -> ' + createShowPath(collectionPath, data.id)
    )

    return data.id
  }

  // idがない場合(create)
  if (!(reference instanceof CollectionReference)) throw new Error()

  if (!isHaveId(data)) data = { ...data, ...{ id: randamString() } }
  if (!isHaveId(data)) throw new Error()

  const docPath: string = createPath(collectionPath, data.id)
  const docref = doc(db, docPath)

  await setDoc(docref, data, setOptions)

  console.log('\u001b[32measySetDoc -> ' + docPath)

  return data.id
}
