/**
 * @author GuangHui
 * @description vite 基础配置
 */

/* 注意 */
/* 项目中vite.config.js or vite.config.ts 可以直接使用esm语法编写*/
/* 这是因为vite在load配置前会将前转换为cjs */
/* https://cn.vitejs.dev/config/#config-file */
/* 若从项目配置中，继承三方pkg包中的配置，可能会出现找到对应包及不能在module外使用import的错误 */
/* 解决： */
/* 1. 三方包配置改为使用cjs格式，项目vite仍然使用esm（自动转换）  */
/* 2. 若三方包依然想用esm格式，则项目 和 三方包同时在package.json中声明type="module" ,并在import时指定后缀名 */

const { createViteConfig } = require('../../shared/vite-config-base.js')

function createLibraryViteConfigFor({ UMDGlobalName }) {
  return createViteConfig({ UMDGlobalName })
}

module.exports = {
  createLibraryViteConfigFor
}
