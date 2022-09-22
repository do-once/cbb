<script setup lang="ts">
/**
 * * HelloVue3Comp
 */

const onClick = () => {
  alert('Hello Vue3 Comp')
}
</script>

<template>
  <button class="c-HelloVue3Comp" type="button" @click="onClick" value="hello">hello vue3 comp</button>
</template>

<style>
.c-HelloVue3Comp {
  color: red;
}
</style>
