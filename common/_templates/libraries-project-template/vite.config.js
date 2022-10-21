/**
 * @author GuangHui
 * @description vite 配置
 */

import { createViteConfigForLibrary } from '@doonce/web-rig/profiles/library/vite-config-base.js'
console.log('🚦 -> file: vite.config.ts -> line 7 -> createViteConfigForLibrary', createViteConfigForLibrary)

export default createViteConfigForLibrary({ UMDGlobalName: '{{pascalPackageName}}' })
