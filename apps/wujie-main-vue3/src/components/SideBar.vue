<script setup lang="ts">
/**
 * * SideBar
 */
</script>

<template>
  <div class="c-SideBar">
    <h2 class="c-SideBar-info" title="power by wujie + vite + vue3">wujie-main-vue3</h2>
    <ul class="c-SideBar-list">
      <li class="c-SideBar-item">
        <router-link class="c-SideBar-item" to="/">Home</router-link>
      </li>
      <li class="c-SideBar-item">
        <router-link class="c-SideBar-item" to="/wujie-sub-vue2">Vue2 + Vite</router-link>
      </li>
    </ul>
  </div>
</template>
