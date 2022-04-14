# firebaseasy(cliant side)

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

import { initEasyFirestore } from '@firebaseasy/firestore'
import { easyConnect, easyUnConnect } from '@firebaseasy/firestore'
import { createRef } from '@firebaseasy/firestore'

// Type
import { EasySetDoc, QueryOption, WhereOption } from '@firebaseasy/firestore'
```

# 設定

```js
import { initializeApp } from 'firebase/app'
const firebaseApp = initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
})
```

# 機能

作成したドキュメント(フィールド)に自動追加されます。

```js
// set
{
  id: string // document id
  created_at: Date
  updated_at?: Date // If it was an update
}

// get(Not prepared)
{
  id: string // document id
  created_at: Timestamp
  updated_at?: Timestamp
}
```

登録と更新ができます。 doc に `id` を追加すると、ドキュメント ID の指定・id が一致したドキュメントの更新を行えます。

```js
// create
easySetDoc('anime', {
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura']
})

// update or create(add)
easySetDoc('anime/abcde/animeDetail', {
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura'],
  id: 'fghijklmno'
})
// ↑ same ↓
easySetDoc('anime/abcde/animeDetail/fghijklmno', {
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura'],
})

/**
 * update or create(add)
 * pathとidが一致しなかった場合エラーを返します
 * Error!
 */
easySetDoc('anime/abcdefghijklmnopqrstuvwxyz', {
  id: 'zyxwvutsrqponmlkjihgfedcba'
  title: 'NARUTO',
  character: ['Naruto', 'Sasuke', 'Sakura']
})
```

情報の取得ができます。

```js
// get Collection data as an Array
/** @return {array<T>} */
easyGetData('anime', {
  where: [['title', '==', 'NARUTO'], ['character', 'array-contains', 'Sasuke']],
  orderBy: ['created_at']
  limit: 99,
})

// get document data as an Object
/** @return {Objrct | undefined} */
easyGetData('anime/abcdefghijklmnopqrstuvwxyz')

/** @return {Promise<T[] | T | undefined>} */
easyGetData('anime/abcdefghijklmnopqrstuvwxyz')

/** @return {Promise<T | undefined>} */
easyGetDoc('anime/abcdefg')

/** @return {Promise<T[]>} */
easyGetDocs('anime')
```

情報の削除

```js
// delete document
easyDelDoc('anime/abcdefghijklmnopqrstuvwxyz')
```

use easyConnect Sample Code

```js
import { easyConnect } from '@firebaseasy/firestore'
export const showUserData = easyConnect('D_ShowUser')
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
      const ref = createRef(collectionName) as CollectionReference
      easyConnect(ref, collectionName, snapshot => {
        commit('initData', snapshot)
      })
    }
  }
}
```
