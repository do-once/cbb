import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { peerDependencies } from './package.json'
import { pascalCase } from 'change-case'

/* 不需要打包的dep */
const external = Object.keys(peerDependencies ?? [])

/* 根据peerDeps生成global定义 */
const genGlobals = external =>
  (external ?? []).reduce((acc, depPkgName) => {
    acc[depPkgName] = pascalCase(depPkgName)
    return acc
  }, {})

export default defineConfig({
  resolve: {
    alias: {
      /* example中使用了template语法，所以无法使用runtime版本 */
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '{{pascalUnscopedPackageName}}',
      // the proper extensions will be added
      fileName: format => {
        return `index.${format}.js`
      }
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external,
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: genGlobals(external)
      }
    }
  },
  plugins: [vue()]
})
