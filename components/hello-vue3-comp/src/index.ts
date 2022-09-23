/**
 * @author GuangHui
 * @description HelloVue3Comp 入口
 */

import type { App } from 'vue'
import HelloVue3Comp from './HelloVue3Comp.vue'

export default {
  install(app: App, options: any[]) {
    app.component('HelloVue3Comp', HelloVue3Comp)
  }
}
