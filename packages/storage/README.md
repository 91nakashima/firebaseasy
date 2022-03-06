# firebaseasy(cliant side)

Nakashima Package Manager
略して【npm】で入れます。

```bash
npm i @firebaseasy/storage
```

# 使い方

```js
import { easySetDoc, easyGetData, easyDelete } from '@firebaseasy/storage'

// Type
import { EasySetDoc, QueryOption, WhereOption } from '@firebaseasy/storage'
```

# 設定

```js
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket-url>'
}
const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)
```

# 機能
