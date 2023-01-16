import { createApp } from 'vue'
import WujieVue from 'wujie-vue3'

import './style.css'
import App from './App.vue'
import { routerInstance } from './router.js'

const { bus, setupApp, preloadApp, destroyApp } = WujieVue

const app = createApp(App)

setupApp({ name: 'wujie-sub-vue2', url: '//localhost:5174', alive: true, sync: true })
setupApp({ name: 'wujie-sub-react18', url: '//localhost:3000', alive: true, sync: true })

app.use(routerInstance).use(WujieVue).mount('#app')
