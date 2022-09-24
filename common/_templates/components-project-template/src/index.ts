/**
 * @author GuangHui
 * @description {{pascalPackageName}} 打包入口
 */

import type { App } from 'vue'
import {{pascalPackageName}} from './{{pascalUnscopedPackageName}}.vue'

export default {
  install(app: App, options: any[]) {
    app.component('{{pascalPackageName}}', {{pascalPackageName}})
  }
}
