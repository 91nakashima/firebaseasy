import { onSnapshot } from 'firebase/firestore'
import { createRef } from '.'
import { easyUnConnect } from './easyUnConnect'
import { state, createState } from './data'

import { QueryOption } from '.'
import { DocumentReference } from 'firebase/firestore'

/**
 * Firestore Real Time synchronization
 */
export const easyConnect = <T>(
  path: string,
  option?: QueryOption,
  fun?: (e: Map<string, T>) => void
) => {
  // refarenceを作成
  const reference = createRef(path, option)

  // stateを作成
  createState(path)

  // DocumentReference<DocumentData>
  if (reference instanceof DocumentReference) {
    state[path].subscribe = onSnapshot(reference, doc => {
      const setData: unknown = doc.data()

      if (doc.exists()) {
        state[path]?.data.set(doc.id, setData as T)
      }
      // else {
      //   state[path]?.data.delete(doc.id as any)
      // }

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

  return {
    data: state[path].data,
    unsbscribe: () => easyUnConnect(path)
  }
}
