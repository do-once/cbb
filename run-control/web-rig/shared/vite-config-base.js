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
const { pascalCase } = require('change-case')
const vue = require('@vitejs/plugin-vue')
const dts = require('vite-plugin-dts')

/* 不需要打包的dep */
const genExternal = pkgJson => Object.keys(pkgJson?.peerDependencies ?? [])

/* 根据peerDeps生成global定义 */
const genGlobals = external =>
  (external ?? []).reduce((acc, depPkgName) => {
    acc[depPkgName] = pascalCase(depPkgName)
    return acc
  }, {})

function createViteConfig({ UMDGlobalName = '', type = 'vue', debug = false } = {}) {
  if (!UMDGlobalName) throw new Error('UMDGlobalName is required')

  const external = genExternal(require(resolve(process.cwd(), 'package.json')))

  let conf = {
    resolve: {
      alias: {
        /* vite启动本地服务时使用的index.html，其中使用了template语法，所以无法使用runtime版本 */
        vue: 'vue/dist/vue.esm-bundler.js'
      }
    },
    build: {
      lib: {
        entry: resolve(process.cwd(), 'src/index.ts'),
        name: UMDGlobalName,
        // the proper extensions will be added
        fileName: format => {
          return `index.${format}.js`
        },
        formats: ['es', 'umd']
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
    plugins: [
      /* 生成声明文件 */
      /* package.json中声明文件声明最佳实践 */
      /*   
      "types": "./dist/index.d.ts", # 回退
      "typesVersions": { # 优先根据这个查询
        "*": {
          "*": [
            "./dist/*"
          ]
        }
      }, 
      */
      /* 参考： */
      /* https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions */
      /* https://github.com/microsoft/TypeScript/issues/33079#issuecomment-702617758 */
      dts({
        /* 显示声明include，否则会读取到rig中ts配置的include，出现无法生成声明文件的问题 */
        include: ['src/**/*.(ts|vue)'],
        /* 开启log */
        skipDiagnostics: false,
        logDiagnostics: true,
        afterDiagnostic(diagnostics) {
          console.log(
            '🚦 -> file: vite-config-base.js -> line 67 -> afterDiagnostic -> diagnostics',
            diagnostics
          )
        },
        beforeWriteFile(filePath, content) {
          console.log('🚦 -> file: vite-config-base.js -> line 67 -> beforeWriteFile -> filePath', filePath)
        },
        afterBuild() {
          console.log('🚦 -> file: vite-config-base.js -> line 75 -> afterBuild')
        }
      })
    ]
  }

  if (type === 'vue') conf.plugins.push(vue())

  debug && console.log('🚦 -> file: vite-config-base.js -> line 83 -> createViteConfig -> conf', conf)
  return conf
}

function createViteConfigForVue(opts) {
  return createViteConfig({
    ...opts,
    type: 'vue'
  })
}

function createViteConfigForLibrary(opts) {
  return createViteConfig({
    ...opts,
    type: 'library'
  })
}

module.exports = {
  createViteConfig,
  createViteConfigForVue,
  createViteConfigForLibrary
}
