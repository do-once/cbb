<script setup lang="ts">
/**
 * * DoonceHelloVue3Comp
 */

const onClick = () => {
  alert('Hello Vue3 Comp')
}
</script>

<template>
  <button class="doonce-HelloVue3Comp" type="button" @click="onClick" value="hello">hello vue3 comp</button>
</template>

<style>
.doonce-HelloVue3Comp {
  color: red;
}
</style>
