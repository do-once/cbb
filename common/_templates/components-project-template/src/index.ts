/**
 * @author GuangHui
 * @description HelloVue3Comp 入口
 */

import type { App } from 'vue'
import {{pascalPackageName}} from './{{pascalUnscopedPackageName}}.vue'

export default {
  install(app: App, options: any[]) {
    app.component('{{pascalPackageName}}', {{pascalPackageName}})
  }
}
