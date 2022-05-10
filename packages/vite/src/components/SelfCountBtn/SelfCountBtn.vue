<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">
    SelfCountBtn is: {{ count }}
  </button></template
>
