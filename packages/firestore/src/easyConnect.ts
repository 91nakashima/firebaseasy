import { onSnapshot, Unsubscribe } from 'firebase/firestore'
import { Query, CollectionReference, DocumentData } from 'firebase/firestore'
import { reactive } from 'vue'

const state: any = {}

const config = {
  reactive: false
}

/**
 *
 */
const easyConnect = (
  reference: Query | CollectionReference,
  key: string,
  fun?: (e: object) => void
) => {
  const Unsubscribe = onSnapshot(reference, snapshot => {
    if (!state[key]) {
      state[key] = {
        data: [],
        subscribe: null
      }
    }

    let copyHaveData = state[key]?.data

    snapshot.docChanges().map(change => {
      const setData = config.reactive
        ? reactive(change.doc.data())
        : change.doc.data()

      if (change.type === 'added') {
        copyHaveData[change.doc.id] = setData
      } else if (change.type === 'modified') {
        copyHaveData[change.doc.id] = setData
      } else if (change.type === 'removed') {
        delete copyHaveData[change.doc.id]
      }
    })

    state[key].subscribe = Unsubscribe
    state[key].data = copyHaveData

    if (!fun) return
    fun(copyHaveData)
  })
}

/**
 *
 */
const easyUnConnect = (key: string) => {
  const unsbscribe = state[key].subscribe as Unsubscribe
  unsbscribe()
  delete state[key]
}

export { easyConnect, easyUnConnect }
