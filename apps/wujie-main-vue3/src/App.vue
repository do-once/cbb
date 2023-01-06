<script setup>
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div class="c-Container">
    <div class="c-Container-side">
      <SideBar></SideBar>
    </div>
    <div class="c-Container-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.c-Container {
  display: flex;
  align-items: flex-start;
}

.c-Container-side {
  flex: 0 0 auto;
  width: 10vw;
}

.c-Container-main {
  flex: 1 1 auto;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
