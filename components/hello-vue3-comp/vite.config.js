/**
 * @author GuangHui
 * @description vite 配置
 */

import { createViteConfigForVue } from '@doonce/web-rig/profiles/library/vite-config-base.js'
console.log('🚦 -> file: vite.config.ts -> line 7 -> createViteConfigForVue', createViteConfigForVue)

export default createViteConfigForVue({ UMDGlobalName: 'DoonceHelloVue3Comp' })
