/**
 * @author GuangHui
 * @description DoonceUniversalVueCompExample 打包入口
 */

import type { App } from 'vue'
import DoonceUniversalVueCompExample from './UniversalVueCompExample.vue'

export default {
  install(app: App, options: any[]) {
    app.component('DoonceUniversalVueCompExample', DoonceUniversalVueCompExample)
  }
}
