/**
 * @author GuangHui
 * @description vite 共用基础配置
 */

/* 注意 */
/* 项目中vite.config.js or vite.config.ts 可以直接使用esm语法编写*/
/* 这是因为vite在load配置前会将前转换为cjs */
/* https://cn.vitejs.dev/config/#config-file */
/* 若从项目配置中，继承三方pkg包中的配置，可能会出现找到对应包及不能在module外使用import的错误 */
/* 解决： */
/* 1. 三方包配置改为使用cjs格式，项目vite仍然使用esm（自动转换）  */
/* 2. 若三方包依然想用esm格式，则项目 和 三方包同时在package.json中声明type="module" ,并在import时指定后缀名 */

const { resolve } = require('path')
const vue = require('@vitejs/plugin-vue')
const { pascalCase } = require('change-case')

/* 不需要打包的dep */
const genExternal = pkgJson => Object.keys(pkgJson?.peerDependencies ?? [])

/* 根据peerDeps生成global定义 */
const genGlobals = external =>
  (external ?? []).reduce((acc, depPkgName) => {
    acc[depPkgName] = pascalCase(depPkgName)
    return acc
  }, {})

function createViteConfig({ UMDGlobalName = '' } = {}) {
  if (!UMDGlobalName) throw new Error('UMDGlobalName is required')

  const external = genExternal(resolve(process.cwd(), 'package.json'))
  console.log('🚦 -> file: vite-config-base.ts -> line 63 -> createBaseViteConfig -> external', external)

  return {
    resolve: {
      alias: {
        /* example中使用了template语法，所以无法使用runtime版本 */
        vue: 'vue/dist/vue.esm-bundler.js'
      }
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: UMDGlobalName,
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
  }
}

module.exports = {
  createViteConfig
}
