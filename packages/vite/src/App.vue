<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref, computed, watch } from 'vue'
import { createRef, easyConnect } from '@firebaseasy/firestore'
import { CollectionReference } from 'firebase/firestore'

const showUserData = easyConnect('D_ShowUser')

const showUserArray = computed(() => {
  return Array.from(showUserData.data.values())
})

const funbey = () => {
  showUserData.unsbscribe()
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div @click="funbey">クリック</div>

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
