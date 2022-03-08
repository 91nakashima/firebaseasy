<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { initEasyFirestore } from '../../../firestore/src/index'
import { createRef, easyConnect } from '../../../firestore/src/index'
import { CollectionReference } from 'firebase/firestore'

defineComponent({
  HelloWorld
})

initEasyFirestore(true)
const ref = createRef('D_ShowUser') as CollectionReference
easyConnect(ref, 'D_ShowUser')
</script>
