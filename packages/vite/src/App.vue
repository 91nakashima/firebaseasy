<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import CountBtn from './components/CountBtn/CountBtn.vue'
import SelfCountBtn from './components/SelfCountBtn/SelfCountBtn.vue'
import { ref, computed, watch } from 'vue'
import { dbTest } from './firebase'
import { firestore } from './firebase'
import { easySetDoc, easyDelDoc } from '@firebaseasy/firestore'

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
  //   id: '',
  //   text: 'こんにち'
  // })
  easyDelDoc(firestore, 'Test/huga')
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button type="button" @click="funhi">sbscribeクリック</button>
  <div></div>
  <button type="button" @click="funbey">unsbscribeクリック</button>
  <div></div>
  <button type="button" @click="funSet()">登録テスト</button>

  <div>
    <CountBtn />
    <CountBtn />
    <CountBtn />
    <CountBtn />
  </div>

  <div>
    <SelfCountBtn />
    <SelfCountBtn />
    <SelfCountBtn />
    <SelfCountBtn />
  </div>

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
