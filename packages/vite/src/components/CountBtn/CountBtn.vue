<script lang="ts" setup>
// import { count } from './'
import { useCountBtn } from './'

const { count } = useCountBtn()
</script>

<template>
  <button type="button" @click="count++">
    CountBtn is: {{ count }}
  </button></template
>
