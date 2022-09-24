/**
 * @author GuangHui
 * @description vite 配置
 */


import { createLibraryViteConfigFor } from '@doonce/web-rig/profiles/library/vite-config-base'
console.log('🚦 -> file: vite.config.ts -> line 7 -> createLibraryViteConfigFor', createLibraryViteConfigFor)

export default createLibraryViteConfigFor({ UMDGlobalName: '{{pascalPackageName}}' })