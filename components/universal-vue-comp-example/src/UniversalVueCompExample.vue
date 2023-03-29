<script setup lang="ts">
/**
 * * DoonceUniversalVueCompExample
 */

import { ref, onMounted } from 'vue-demi'

onMounted(() => {
  console.log('mounted')
})

let isClicked = ref(false)

const onClick = () => {
  isClicked.value = !isClicked.value
}
</script>

<template>
  <button class="doonce-UniversalVueCompExample" type="button" @click="onClick" value="hello">
    UniversalVueCompExample
  </button>
  isClicked:{{ isClicked }}
</template>

<style>
.doonce-UniversalVueCompExample {
  color: red;
}
</style>
