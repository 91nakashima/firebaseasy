<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <input type="file" accept="image/*" ref="getRef" @change="funFile" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { createRef, easyConnect } from '../../../firestore/src/index'
// import { CollectionReference } from 'firebase/firestore'
import { randomName, easyUpload } from '../../../storage/src/index'
import { easyDelObject } from '../../../storage/src/index'

const getRef = ref()
const funFile = async () => {
  const getFile = getRef.value.files[0]
  console.log(getFile)
  const getURL = await easyUpload(`test/${randomName(20, getFile)}`, getFile)
  console.log(getURL)
  // easyDelObject('')
}

defineComponent({
  HelloWorld
})

// const ref = createRef('D_ShowUser') as CollectionReference
// easyConnect(ref, 'D_ShowUser')
</script>
