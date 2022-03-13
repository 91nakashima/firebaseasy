# firebaseasy(cliant side)

Nakashima Package Manager
略して【npm】で入れます。

```bash
npm i @firebaseasy/app
```

# 使い方

```js
import { initFirebaseasy } from '@firebaseasy/app'
```

# 設定

if you use firebase@8

```js
import { initFirebaseasy } from '@firebaseasy/app'
const firebaseApp = initFirebaseasy({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
})
```
