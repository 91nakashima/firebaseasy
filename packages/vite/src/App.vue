<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import CountBtn from './components/CountBtn/CountBtn.vue'
import SelfCountBtn from './components/SelfCountBtn/SelfCountBtn.vue'
import { ref, computed, watch } from 'vue'
import { dbTest, firestore, auth, storage } from './firebase'

import { easySetDoc, easyDelDoc } from '@firebaseasy/firestore'
import { signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { selectFile } from 'fileasy'
import {
  easyUpload,
  randomName,
  easyGetFileFromUrl as _easyGetFileFromUrl
} from '@firebaseasy/storage'

const uploadImage = async () => {
  const file = await selectFile()
  if (!file?.length) return
  const url = await easyUpload(storage, randomName(20, file[0]), file[0])
  console.log(url)
}

const showUserArray = computed(() => {
  // return Array.from(dbTest.data.values())
  return [...dbTest.data.values()]
  // return dbTest.arr
})

const funhi = () => {
  dbTest.sbscribe()
}

const funbey = () => {
  dbTest.unsbscribe()
}

const funSet = () => {
  // dbTest.set({
  //   id: 'huga',
  //   text: 'こんにち',
  //   note: 'こん'
  // })
  easySetDoc(firestore, 'Test', {
    id: 'huga',
    note: 'こんにち'
  })
  // easyDelDoc(firestore, 'Test/huga')
}

const funlogin = () => {
  signInWithEmailAndPassword(auth, '', '').then(d => {
    console.log(d)
  })
}

const easyGetFileFromUrl = async () => {
  const file = await selectFile()
  if (!file?.length) return
  const url = await easyUpload(
    storage,
    `test/${randomName(20, file[0])}`,
    file[0]
  )
  console.log(url)

  const resfile = await _easyGetFileFromUrl(url, storage)
  console.log(resfile)

  const _url = await easyUpload(
    storage,
    `test/${randomName(20, resfile)}`,
    resfile
  )
  console.log(_url)
}

const hugahuga = (s: Event) => {
  // console.log(s.target.files[0])
  const el = s.target as HTMLInputElement
  console.log(el.files)
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div>
    <button type="button" @click="uploadImage">画像をアップロード</button>
  </div>

  <div>
    <button type="button" @click="easyGetFileFromUrl">
      画像をアップロードとダウンロード
    </button>
  </div>

  <button type="button" @click="funhi">sbscribeクリック</button>
  <div></div>
  <button type="button" @click="funbey">unsbscribeクリック</button>
  <div></div>
  <button type="button" @click="funSet()">登録テスト</button>
  <div></div>
  <button type="button" @click="funlogin">ログイン</button>
  <div></div>
  <button type="button" @click="signOut(auth)">ログアウト</button>

  <div></div>
  <input type="file" accept="image/png, image/jpeg" @change="hugahuga" />

  <pre>{{ showUserArray }}</pre>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

pre {
  text-align: left;
}
</style>
