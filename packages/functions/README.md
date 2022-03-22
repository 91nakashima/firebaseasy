# easy-firebase-functions(server side)

Nakashima Package Manager
略して【npm】で入れます。

```bash
npm i @firebaseasy/functions
```

# 使い方

```js
// js
const { easySetDoc } = require('easy-firebase-functions')
const { easyGetData } = require('easy-firebase-functions')
const { easyGetDoc, easyGetDocs } = require('easy-firebase-functions')
const { easyDelDoc } = require('easy-firebase-functions')

// ts
import { easySetDoc } from 'easy-firebase-functions'
import { easyGetData, easyGetDoc, easyGetDocs } from 'easy-firebase-functions'
import { easyDelDoc } from 'easy-firebase-functions'

// Type
import { EasySetDoc, QueryOption, WhereOption } from 'easy-firebase-functions'
```

# 機能

作成したドキュメント(フィールド)に自動追加されます。

```js
{
  id: string // document id
  created_at: Date
  updated_at?: Date // If it was an update
}
```

登録と更新ができます。 doc に `id` を追加すると、ドキュメント ID の指定・id が一致したドキュメントの更新を行えます。

```js
// create
easySetDoc('anime', {
  title: 'ナルト',
  character: ['ナルト', 'サスケ', 'サクラ']
})

// update or create(add)
easySetDoc('anime/*****/animeDetail', {
  title: 'ナルト',
  character: ['ナルト', 'サスケ', 'サクラ'],
  id: '*****'
})
```

情報の取得ができます。

```js
// get Collection data as an Array
/** @return {array<T>} */
easyGetData('anime', {
  where: [['title', '==', 'ナルト'], ['character', 'array-contains', 'サスケ']],
  orderBy: ['created_at']
  limit: 99,
})

// get document data as an Object
/** @return {Objects | undefined} */
easyGetData('anime/hugahuga')
```

情報の削除

```js
// delete document
easyDelete('anime/hogehoge')
```

# サンプルコード

```js
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { easySetDoc, easyGetData, easyDelDoc } from '@firebaseasy/functions'
admin.initializeApp(functions.config().firebase)

export const funSampleCode = functions
  .region('asia-northeast1')
  .https.onCall(async (request, response) => {
    const getDocId = await easySetDoc('anime', {
      title: 'ナルト',
      character: ['ナルト', 'サスケ', 'サクラ']
    }).catch((e: any) => console.log(e)) // -> Error
    console.log(getDocId) // ->skjdbvkjd6svosb3dv5sdvs

    const huga = await easyGetData('anime', {
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

    await easyDelDoc('anime/uaIn0lyDOmKYlXyClhyb')
      .then((d: string) => console.log(d)) // -> 'ok'
      .catch((e: any) => console.log(e)) // -> Error
  })
```
