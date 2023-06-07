<script setup lang="ts">
/**
 * * {{pascalPackageName}}
 */

const onClick = () => {
  alert('{{pascalPackageName}}')
}
</script>

<template>
  <button class="{{scopeName}}-{{pascalUnscopedPackageName}}" type="button" @click="onClick" value="hello">
    {{ pascalUnscopedPackageName }}
  </button>
</template>

<style>
.{{scopeName}}-{{pascalUnscopedPackageName}} {
  color: red;
}
</style>
