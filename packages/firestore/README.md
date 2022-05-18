# firebaseasy(You can use browser and server)

Nakashima Package Manager
略して【npm】で入れます。

```bash
npm i @firebaseasy/firestore
```

# 使い方

```js
import { easySetDoc } from '@firebaseasy/firestore'
import { easyGetData, easyGetDoc, easyGetDocs } from '@firebaseasy/firestore'
import { easyDelDoc } from '@firebaseasy/firestore'

// Type
import { EasySetDoc, QueryOption, WhereOption } from '@firebaseasy/firestore'

// ↓only browser
import { easyConnect, easyUnConnect } from '@firebaseasy/firestore'
import { createRef } from '@firebaseasy/firestore'
export { isTypeCollectionOrQuery } from './helpers/checkType'
```

# 設定

```js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { easyConnect } from '@firebaseasy/firestore'

const app = initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
})

export const firestore = getFirestore(app)

export const userEasy = easyConnect(firestore, 'User')
// userEasy.set({name: 'naruto'})
// userEasy.sbscribe()
// userEasy.unsbscribe()
```

# 機能

作成したドキュメント(フィールド)に自動追加されます。

```js
// set
{
  id: string // document id
}
```

登録と更新ができます。 doc に `id` を追加すると、ドキュメント ID の指定・id が一致したドキュメントの更新を行えます。

```js
import { firestore } from 'initfirebase'
import { easySetDoc } from '@firebaseasy/firestore'

// create
easySetDoc(firestore, 'anime', {
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura']
})

// update or create(add)
easySetDoc(firestore, 'anime/abcde/animeDetail', {
  id: 'fghijklmno'
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura'],
})
// ↑ same ↓
easySetDoc(firestore, 'anime/abcde/animeDetail/fghijklmno', {
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura'],
})

// Error()
easySetDoc(firestore, 'anime/abcdefghijklmnopqrstuvwxyz', {
  id: 'zyxwvutsrqponmlkjihgfedcba'
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura']
})

// If you only want to use a setDoc().
easySetDoc(firestore, 'anime/abcdefghijklmnopqrstuvwxyz', {
  id: 'zyxwvutsrqponmlkjihgfedcba'
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura']
}, { marge: false })
```

情報の取得ができます。

```js
import { firestore } from 'initfirebase'

// get Collection data as an Array
/** @return {array<T>} */
easyGetData(firestore, 'anime', {
  where: [['title', '==', 'NARUTO'], ['character', 'array-contains', 'Sasuke']],
  orderBy: ['created_at']
  limit: 99,
})

// get document data as an Object
/** @return {Objrct | undefined} */
easyGetData(firestore, 'anime/abcdefghijklmnopqrstuvwxyz')

/** @return {Promise<T[] | T | undefined>} */
easyGetData(firestore, 'anime/abcdefghijklmnopqrstuvwxyz')

/** @return {Promise<T | undefined>} */
easyGetDoc(firestore, 'anime/abcdefg')

/** @return {Promise<T[]>} */
easyGetDocs(firestore, 'anime')
```

情報の削除

```js
import { firestore } from 'initfirebase'

// delete document
easyDelDoc(firestore, 'anime/abcdefghijklmnopqrstuvwxyz')
```

use easyConnect Sample Code

```js
import { easyConnect } from '@firebaseasy/firestore'
import { firestore } from 'initfirebase'
export const showUserData = easyConnect(firestore, 'D_ShowUser')
// export const showUserData = easyConnect('D_ShowUser/xxxxxxxxxx')

// ↓different file↓
import { showUserData } from './index'
const showUserArray = computed(() => {
  return Array.from(showUserData.data.values())
})
```

Vuex Sample Code

```js
import { easyConnect } from '@firebaseasy/firestore'
import { CollectionReference } from 'firebase/firestore'
import { firestore } from 'initfirebase'

const collectionName = 'ShowUser'

function initialState () {
  return {
    data: {} // firestore data
  }
}

export default {
  namespaced: true,
  state: initialState(),

  getters: {
    getShowUser: (state: any) => state.data
  },

  mutations: {
    initData<T> (state: any, value: T) {
      state.data = value
    }
  },

  actions: {
    async getDocs ({ dispatch, rootState, state, commit }: any): Promise<void> {
      easyConnect(firestore, collectionName).subscribe(snapshot => {
        commit('initData', snapshot)
      })
    }
  }
}
```
