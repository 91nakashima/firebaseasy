import { onSnapshot } from 'firebase/firestore'
import { createRef } from '.'
import { easyUnConnect } from './easyUnConnect'
import { easySetDoc } from './easySetDoc'
import { state, createState } from './data'
import { randamString } from '../common'

import { QueryOption } from '.'
import { DocumentReference } from 'firebase/firestore'
import { Firestore } from 'firebase/firestore'

/**
 * idを持っているかどうか
 */
const isHaveId = (d: any): d is { id: string } => {
  return !!d?.id
}

type OptionFun = () => QueryOption

/**
 * Firestore Real Time synchronization
 */
export const easyConnect = <T>(
  db: Firestore,
  path: string,
  option?: QueryOption | OptionFun
): {
  data: Map<string, T>
  set: (data: T) => Promise<string>
  sbscribe: (fun?: ((e: Map<string, T>) => void) | undefined) => void
  unsbscribe: Function
} => {
  // stateを作成
  // ここが少し甘い
  createState(path)

  /**
   * sync
   */
  const sbscribe = async (fun?: (e: Map<string, T>) => void) => {
    console.log(typeof option === 'function' ? option() : option)
    // refarenceを作成
    const reference = createRef(
      db,
      path,
      typeof option === 'function' ? option() : option
    )

    // DocumentReference<DocumentData>
    if (reference instanceof DocumentReference) {
      state[path].subscribe = onSnapshot(reference, doc => {
        const setData: unknown = doc.data()

        if (doc.exists()) {
          state[path]?.data.set(doc.id, setData as T)
        }

        if (!fun) return
        fun(state[path]?.data)
      })
    }

    // Query<DocumentData> | CollectionReference<DocumentData>
    if (!(reference instanceof DocumentReference)) {
      state[path].subscribe = onSnapshot(reference, snapshot => {
        snapshot.docChanges().map(change => {
          const setData: unknown = change.doc.data()

          if (change.type === 'added') {
            state[path]?.data.set(change.doc.id, setData as T)
          } else if (change.type === 'modified') {
            state[path]?.data.set(change.doc.id, setData as T)
          } else if (change.type === 'removed') {
            state[path]?.data.delete(change.doc.id)
          }
        })

        if (!fun) return
        fun(state[path]?.data)
      })
    }

    console.log('\u001b[32measyConnect-> ' + path)
  }

  /**
   * create or update
   */
  const set = async (data: T): Promise<string> => {
    if (typeof data !== 'object') {
      throw new Error('only object')
    }

    // if (isHaveId(data)) {
    //   state[path]?.data.set(data.id, data)
    //   return await easySetDoc(db, path, data)
    // } else {
    //   const createId = randamString()
    //   const setData = { ...{ id: createId }, ...data }
    //   state[path]?.data.set(createId, setData)
    //   return await easySetDoc(db, path, setData)
    // }

    return await easySetDoc(db, path, data)
  }

  return {
    data: state[path].data,
    set: set,
    sbscribe: sbscribe,
    unsbscribe: () => easyUnConnect(path)
  }
}
