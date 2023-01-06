import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'

/* router实例 */
export const routerInstance = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/wujie-sub-vue2',
      name: 'WuJieSubVue2',
      component: () => import('./views/WuJieSubVue2.vue')
    }
  ]
})
