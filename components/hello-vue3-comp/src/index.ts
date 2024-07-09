/**
 * @author GuangHui
 * @description DoonceHelloVue3Comp 入口
 */

import type { App } from 'vue'
import DoonceHelloVue3Comp from './HelloVue3Comp.vue'

export { DoonceHelloVue3Comp }
export * from './composables'

export default {
  install(app: App, options: any[]) {
    app.component('DoonceHelloVue3Comp', DoonceHelloVue3Comp)
  }
}
