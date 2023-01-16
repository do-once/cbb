import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'

/* router实例 */
export const routerInstance = createRouter({
  history: createWebHashHistory(),
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
    },
    {
      path: '/wujie-sub-react18',
      name: 'WuJieSubReact18',
      component: () => import('./views/WuJieSubReact18.vue')
    }
  ]
})
