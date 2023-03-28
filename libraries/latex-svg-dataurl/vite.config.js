/**
 * @author GuangHui
 * @description vite 配置；2022-1113构建、测试交给heft，vite仅做开发服务器使用
 */

import { createViteConfigForLibrary } from '@doonce/web-rig/profiles/library/vite-config-base.js'
console.log('🚦 -> file: vite.config.ts -> line 7 -> createViteConfigForLibrary', createViteConfigForLibrary)

export default createViteConfigForLibrary({ UMDGlobalName: 'DoonceCanvasLatex' })
