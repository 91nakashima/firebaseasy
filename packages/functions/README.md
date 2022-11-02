# @firebaseasy/functions(server side)

Nakashima Package Manager
略して【npm】で入れます。

```bash
npm i @firebaseasy/functions
```

# 使い方

```ts
import { easySetDoc } from '@firebaseasy/functions'
import { easyGetData } from '@firebaseasy/functions'
import { easyDelDoc } from '@firebaseasy/functions'

// Type
import { EasySetDoc, QueryOption, WhereOption } from '@firebaseasy/functions'
```

# 設定

```ts
import { config } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'

const app = initializeApp(config().firebase)

export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
```

# 機能

作成したドキュメント(フィールド)に自動追加されます。

```js
{
  id: string // document id
}
```

## firestore の登録・更新

登録と更新ができます。 doc に `id` を追加すると、ドキュメント ID の指定・id が一致したドキュメントの更新を行えます。

```js
import { firestore } from './init'

// create
easySetDoc(firestore, 'anime', {
  title: 'ナルト',
  character: ['ナルト', 'サスケ', 'サクラ']
})

// update or create(add)
easySetDoc(firestore, 'anime/*****/animeDetail', {
  title: 'ナルト',
  character: ['ナルト', 'サスケ', 'サクラ'],
  id: '*****'
})
```

## firestore の取得

情報の取得ができます。

```js
import { firestore } from './init'

// get Collection data as an Array
/** @return {array<T>} */
easyGetData(firestore, 'anime', {
  where: [['title', '==', 'ナルト'], ['character', 'array-contains', 'サスケ']],
  orderBy: ['created_at']
  limit: 99,
})

// get document data as an Object
/** @return {Objects | undefined} */
easyGetData(firestore ,'anime/hugahuga')
```

## firestore の 削除

```js
import { firestore } from './init'

// delete document
easyDelete(firestore, 'anime/hogehoge')
```

# サンプルコード

```js
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { firestore } from './init'
import { easySetDoc, easyGetData, easyDelDoc } from '@firebaseasy/functions'
admin.initializeApp(functions.config().firebase)

export const funSampleCode = functions
  .region('asia-northeast1')
  .https.onCall(async (request, response) => {
    const getDocId = await easySetDoc(firestore, 'anime', {
      title: 'ナルト',
      character: ['ナルト', 'サスケ', 'サクラ']
    }).catch((e: any) => console.log(e)) // -> Error
    console.log(getDocId) // ->skjdbvkjd6svosb3dv5sdvs

    const huga = await easyGetData(firestore, 'anime', {
      where: [
        ['title', '==', 'ナルト'],
        ['character', 'array-contains', 'ナルト']
      ]
    }).catch((e: any) => console.log(e)) // -> Error
    console.log(huga) // ->
    // [{
    // title: 'ナルト',
    // character: ['ナルト', 'サスケ', 'サクラ'],
    // id: 'skjdbvkjd6svosb3dv5sdvs',
    // created_at: Timestamp { _seconds: 1646120963, _nanoseconds: 790000000 }
    // }]

    await easyDelDoc(firestore, 'anime/uaIn0lyDOmKYlXyClhyb')
      .then((d: string) => console.log(d)) // -> 'ok'
      .catch((e: any) => console.log(e)) // -> Error
  })
```
