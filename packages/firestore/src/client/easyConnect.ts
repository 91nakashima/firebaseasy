import { onSnapshot } from 'firebase/firestore'
import { createRef } from '.'
import { easyUnConnect } from './easyUnConnect'
import { easySetDoc } from './easySetDoc'
import { state, createState } from './data'

import { QueryOption } from '.'
import { DocumentReference } from 'firebase/firestore'
import { Firestore, SetOptions } from 'firebase/firestore'

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
  set: (data: T, setOptions?: SetOptions) => Promise<string>
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
  const set = async (data: T, setOptions?: SetOptions): Promise<string> => {
    if (typeof data !== 'object') {
      throw new Error('only object')
    }

    return await easySetDoc(db, path, data, setOptions)
  }

  return {
    data: state[path].data,
    set: set,
    sbscribe: sbscribe,
    unsbscribe: () => easyUnConnect(path)
  }
}
