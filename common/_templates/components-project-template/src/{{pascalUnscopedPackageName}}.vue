<script setup lang="ts">
/**
 * * {{pascalUnscopedPackageName}}
 */

const onClick = () => {
  alert('{{pascalUnscopedPackageName}}')
}
</script>

<template>
  <button class="c-{{pascalUnscopedPackageName}}" type="button" @click="onClick" value="hello">
    {{ pascalUnscopedPackageName }}
  </button>
</template>

<style>
.c-{{pascalUnscopedPackageName}} {
  color: red;
}
</style>
