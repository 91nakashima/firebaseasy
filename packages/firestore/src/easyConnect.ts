import { onSnapshot, Unsubscribe } from 'firebase/firestore'
import { DocumentReference } from 'firebase/firestore'
import { reactive } from 'vue'
import { createRef } from '.'
import { QueryOption } from '.'

/**
 *
 */
const state: {
  [key: string]: {
    data: Map<string, any>
    subscribe: Unsubscribe | null
  }
} = reactive({})

/**
 * Stop Firestore Real Time synchronization
 */
const easyUnConnect = (path: string) => {
  if (!state[path].subscribe) return

  const unsbscribe = state[path].subscribe as Unsubscribe
  unsbscribe()

  state[path].data = new Map()
  state[path].subscribe = null

  console.log(`easyUnConnect-> ${path}`)
}

/**
 * Firestore Real Time synchronization
 */
const easyConnect = <T>(
  path: string,
  option?: QueryOption,
  fun?: (e: Map<string, T>) => void
) => {
  const reference = createRef(path, option)

  if (!state[path]) {
    state[path] = {
      data: new Map(),
      subscribe: null
    }
  }

  let copyHaveData = state[path]?.data as Map<string, T>

  // DocumentReference<DocumentData>
  if (reference instanceof DocumentReference) {
    state[path].subscribe = onSnapshot(reference, doc => {
      const setData: unknown = doc.data()
      if (doc.exists()) {
        copyHaveData.set(doc.id, setData as T)
        return
      }
      copyHaveData.delete(doc.id)
    })
  }

  // Query<DocumentData> | CollectionReference<DocumentData>
  if (!(reference instanceof DocumentReference)) {
    state[path].subscribe = onSnapshot(reference, snapshot => {
      snapshot.docChanges().map(change => {
        const setData: unknown = change.doc.data()

        if (change.type === 'added') {
          // [change.doc.id] = setData
          copyHaveData.set(change.doc.id, setData as T)
        } else if (change.type === 'modified') {
          // copyHaveData[change.doc.id] = setData
          copyHaveData.set(change.doc.id, setData as T)
        } else if (change.type === 'removed') {
          // delete copyHaveData[change.doc.id]
          copyHaveData.delete(change.doc.id)
        }
      })

      state[path].data = copyHaveData

      if (!fun) return
      fun(copyHaveData)
    })
  }

  console.log('\u001b[32measyConnect-> ' + path)

  return {
    data: state[path].data,
    unsbscribe: () => easyUnConnect(path)
  }
}

export { easyConnect, easyUnConnect }
