<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref, computed, watch } from 'vue'
import { dbTest } from './firebase'

const showUserArray = computed(() => {
  // return Array.from(dbTest.data.values())
  // return [...dbTest.data.values()]
  return dbTest.arr
})

const funhi = () => {
  dbTest.sbscribe()
}

const funbey = () => {
  dbTest.unsbscribe()
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button type="button" @click="funhi">sbscribeクリック</button>
  <button type="button" @click="funbey">unsbscribeクリック</button>

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
