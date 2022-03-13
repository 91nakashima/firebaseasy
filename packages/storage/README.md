# firebaseasy(cliant side)

Nakashima Package Manager
略して【npm】で入れます。

```bash
npm i @firebaseasy/storage
```

# 使い方

```js
import { easyUpload, randomName } from '@firebaseasy/storage'
import { easyDelObject } from '@firebaseasy/storage'
import { easyDownload } from '@firebaseasy/storage'
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
```

# 機能

```js
import { easyUpload, randomName } from '@firebaseasy/storage'

const createPath = randomName(10, getFile)
// jdnajt93nd.jpg
const getURL = await easyUpload(`test/${createPath}`, file)
console.log(getURL)
// https://aaaaa.aaaa.aa/aaaaaaaaaa/aaaaaaaaa

// progress
const getURL = await easyUpload(
  `test/${createPath}`,
  file,
  (progress, status) => {
    console.log('Upload is ' + progress + '% done')
    // Upload is 100 '% done
    console.log(status)
    // "running" | "paused" | "success" | "canceled" | "error"
  }
)
```

```js
import { easyDelObject } from '@firebaseasy/storage'

easyDelObject('https://aaaaa.aaaa.aa/aaaaaaaaaa/aaaaaaaaa').then(
  d => console.log(d)
  // success
)

easyDelObject('image/jdnajt93nd.jpg').then(
  d => console.log(d)
  // success
)
```

```js
import { easyDownload } from '@firebaseasy/storage'

const url = 'https://aaaaa.aaaa.aa/aaaaaaaaaa/aaaaaaaaa'
easyDownload(url, undefined, progress => {
  console.log('Upload is ' + progress + '% done')
  // Upload is 100 '% done
}).catch(e => {
  console.log(e)
  // Cannot download from this URL
})

easyDownload(url)
```
