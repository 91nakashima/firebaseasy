import { getFirestore } from 'firebase/firestore'
import { doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { CollectionReference, DocumentReference } from 'firebase/firestore'
import { createPath } from '../common'

import { EasySetDoc } from '../types/EasySetDoc'

/**
 * コンソール表示用
 */
export const createShowPath = (path: string, id: string) => {
  const arr = path.split('/').filter(d => d)

  path = `${arr[0]}/${id}`

  return path
}

/**
 * set doc
 */
export async function easySetDoc<T> (
  collectionPath: string,
  data: T & EasySetDoc
): Promise<string> {
  const collectionArray = collectionPath.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: CollectionReference | DocumentReference | null = null

  const db = getFirestore()
  const dataNum = collectionArray.length

  if (dataNum === 1 || dataNum % 2 === 1) {
    // collection
    reference = collection(db, collectionPath)

    // document
    if (data.id) {
      reference = doc(db, createPath(collectionPath, data.id))
    }
  } else if (dataNum % 2 === 0) {
    // document
    if (data.id && collectionArray[dataNum - 1] !== data.id) {
      throw new Error()
    }

    if (!data.id) {
      data.id = collectionArray[dataNum - 1]
    }

    reference = doc(db, collectionPath)
  }

  // idがある場合
  if (data.id) {
    if (!(reference instanceof DocumentReference)) throw new Error()

    const getData = await getDoc(reference)

    if (getData.data()) {
      /**
       * 情報がある場合(updata)
       * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#update-data
       */
      data.updated_at = new Date()
      await updateDoc(reference, data as any)
    } else {
      /**
       * 情報がない場合(create)
       * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#set_a_document
       */
      data.created_at = new Date()
      await setDoc(reference, data)
    }

    console.log(
      '\u001b[32measySetDoc-> ' + createShowPath(collectionPath, data.id)
    )
    console.log(JSON.parse(JSON.stringify(data)))
    return data.id
  }

  // idがない場合(create)
  if (!(reference instanceof CollectionReference)) throw new Error()

  data.created_at = new Date()

  /**
   * addDocならidを取得できる
   * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#add_a_document
   */
  const newDoc = await addDoc(reference, data)
  const getPath = createPath(collectionPath, newDoc.id)

  await updateDoc(doc(db, getPath), { id: newDoc.id })

  if (!data.id) data.id = newDoc.id

  console.log('\u001b[32measySetDoc-> ' + getPath)
  console.log(JSON.parse(JSON.stringify(data)))
  return newDoc.id
}
