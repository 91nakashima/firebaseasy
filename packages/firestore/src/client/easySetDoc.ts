import { doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'

import {
  Firestore,
  CollectionReference,
  DocumentReference
} from 'firebase/firestore'
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
  db: Firestore,
  collectionPath: string,
  data: T
): Promise<string> {
  const willSetData = (data as unknown) as EasySetDoc

  const collectionArray = collectionPath.split('/').filter(d => d)
  if (!collectionArray.length) throw new Error()

  let reference: CollectionReference | DocumentReference | null = null

  // const db: Firestore = getFirestore()

  const dataNum = collectionArray.length

  if (dataNum === 1 || dataNum % 2 === 1) {
    // collection
    reference = collection(db, collectionPath)

    // document
    if (willSetData.id) {
      reference = doc(db, createPath(collectionPath, willSetData.id))
    }
  } else if (dataNum % 2 === 0) {
    // document
    if (willSetData.id && collectionArray[dataNum - 1] !== willSetData.id) {
      throw new Error()
    }

    if (!willSetData.id) {
      willSetData.id = collectionArray[dataNum - 1]
    }

    reference = doc(db, collectionPath)
  }

  // idがある場合
  if (willSetData.id) {
    if (!(reference instanceof DocumentReference)) throw new Error()

    const getData = await getDoc(reference)

    if (getData.data()) {
      /**
       * 情報がある場合(updata)
       * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#update-data
       */
      willSetData.updated_at = new Date()
      await updateDoc(reference, willSetData as any)
    } else {
      /**
       * 情報がない場合(create)
       * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#set_a_document
       */
      willSetData.created_at = new Date()
      await setDoc(reference, willSetData)
    }

    console.log(
      '\u001b[32measySetDoc-> ' + createShowPath(collectionPath, willSetData.id)
    )
    console.log(JSON.parse(JSON.stringify(willSetData)))
    return willSetData.id
  }

  // idがない場合(create)
  if (!(reference instanceof CollectionReference)) throw new Error()

  willSetData.created_at = new Date()

  /**
   * addDocならidを取得できる
   * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#add_a_document
   */
  const newDoc = await addDoc(reference, willSetData)
  const getPath = createPath(collectionPath, newDoc.id)

  await updateDoc(doc(db, getPath), { id: newDoc.id })

  if (!willSetData.id) willSetData.id = newDoc.id

  console.log('\u001b[32measySetDoc-> ' + getPath)
  console.log(JSON.parse(JSON.stringify(willSetData)))
  return newDoc.id
}
