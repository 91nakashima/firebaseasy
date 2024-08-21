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
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
```

# 機能

## Upload

```js
import { easyUpload, randomName } from '@firebaseasy/storage'
import { storage } from './initfirebase'

const createPath = randomName(10, getFile)
// jdnajt93nd.jpg
const getURL = await easyUpload(storage, `test/${createPath}`, file)
console.log(getURL)
// https://aaaaa.aaaa.aa/aaaaaaaaaa/aaaaaaaaa

// progress
const getURL = await easyUpload(
  storage,
  `test/${createPath}`,
  file,
  (progress, status) => {
    console.log('Upload is ' + progress + '% done')
    // Upload is 100 '% done
    console.log(status)
    // "running" | "paused" | "success" | "canceled" | "error"
  }
)

// add metadata
const metadata = {
  contentType: 'image/jpeg'
}
const res = await easyUpload(storage, 'img/car.jpeg', [buffer, metadata])
```

## Delete

```js
import { easyDelObject } from '@firebaseasy/storage'
import { storage } from './initfirebase'

easyDelObject(storage, 'https://aaaaa.aaaa.aa/aaaaaaaaaa/aaaaaaaaa').then(
  d => console.log(d)
  // success
)

easyDelObject(storage, 'image/jdnajt93nd.jpg').then(
  d => console.log(d)
  // success
)
```

## Download to Device

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

## Download File

```js
import { easyGetFileFromUrl } from '@firebaseasy/storage'
import { storage } from './initfirebase'

const url = 'https://aaaaa.aaaa.aa/aaaaaaaaaa/aaaaaaaaa'

const res = await easyGetFileFromUrl(url, storage)
console.log(res) // File

const res2 = await easyGetFileFromUrl(url)
console.log(res2) // File
```
