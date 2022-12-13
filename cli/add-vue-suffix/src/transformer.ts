/**
 * @author GuangHui
 * @description 转换
 */

import t from '@babel/types'

import { parse } from '@babel/parser'
import type { ParserOptions } from '@babel/parser'

import traverse from '@babel/traverse'
import generate from '@babel/generator'

import { warn, err, info } from './log'

import { normalizePath } from './normalize'
import { createMyResolver } from './resolver'
import { create } from 'enhanced-resolve'

export default class Transformer {
  static MODULE_REG =
    /(?:(?:(?:im|ex)port[\s{}\w,\-*]*?from\s*?(?<SQUOTE>['"]+?)(?<SMODULE>[^'"\s]+)\k<SQUOTE>)|(?:import\s*?\(\s*?(?:\/\*[^*/]*?\*\/)?\s*?(?<DQUOTE>['"])(?<DMODULE>[^'"\s]+)\k<DQUOTE>\s*?\);?));??/g

  resolveConfig: {
    resolve?: unknown
    mainFiles?: string[]
    [k: string]: unknown
  }
  vueFiles: string[]
  resolver: ReturnType<typeof create.sync>

  constructor(vueFiles: string[] = [], resolveConfig: any = {}) {
    this.resolveConfig = resolveConfig
    this.vueFiles = vueFiles
    this.resolver = createMyResolver(this.resolveConfig)
  }

  /**
   * 路径是否命中
   * @param {string} p 待检测路径
   * @returns {boolean} 是否命中
   */
  isHitted(p: string) {
    return this.vueFiles.includes(p)
  }

  transform({
    code,
    fileDir,
    withAST = false,
    debug = false
  }: {
    code: string
    fileDir: string
    withAST: boolean
    debug: boolean
  }) {
    return withAST ? this.transformWithAST(code) : this.transformWithReg(code, fileDir, debug)
  }

  transformWithAST(
    code: string,
    options: ParserOptions = {
      sourceType: 'module',
      plugins: [
        // enable jsx
        'jsx'
      ]
    }
  ) {
    // const testCode = `export * from 'test'; // ExportAllDeclaration
    // import "test.css"; // ImportDeclaration
    // import Test from 'test'; // ImportDeclaration
    // export { aa } from 'test2'; // ExportNamedDeclaration
    // export * as TT from 'test3'; // ExportNamedDeclaration
    // import(
    //     /* webpackChunkName:'AiClassReport' */ 'Views/AiClassReport/AiClassReport'
    //   ); // 动态导入
    // export default {test:3}; // ExportDefaultDeclaration，无source
    // `

    const ast = parse(code, options)

    const that = this
    traverse(ast, {
      enter: function (path, state) {
        // 动态导入import('xxx')
        if (
          t.isImport(path.node) &&
          path.parentPath &&
          path.parentPath.node &&
          // @ts-ignore
          path.parentPath.node.arguments &&
          // @ts-ignore
          path.parentPath.node.arguments.length
        ) {
          if (
            // @ts-ignore
            path.parentPath.node.arguments[0] &&
            // @ts-ignore
            typeof path.parentPath.node.arguments[0].vaule === 'string' &&
            // @ts-ignore
            path.parentPath.node.arguments[0].vaule.indexOf('.vue') < 0
          ) {
            try {
              // @ts-ignore
              const resolvedModulePath = that.resolver(process.cwd(), path.parentPath.node.arguments[0].value)
              const normalizedPath = normalizePath(resolvedModulePath as string)

              if (that.isHitted(normalizedPath)) {
                // @ts-ignore
                path.node.source.value += '.vue'
              }
            } catch (error) {}
          }
        }

        // 覆盖ExportAllDeclaration、ExportNamedDeclaration、ImportDeclaration
        if (
          t.isExportAllDeclaration(path.node) ||
          t.isExportNamedDeclaration(path.node) ||
          t.isImportDeclaration(path.node)
        ) {
          if (
            path.node &&
            path.node.source &&
            path.node.source.value &&
            path.node.source.value.indexOf('.vue') < 0
          ) {
            try {
              const resolvedModulePath = that.resolver(process.cwd(), path.node.source.value)

              const normalizedPath = normalizePath(resolvedModulePath as string)

              if (that.isHitted(normalizedPath)) {
                path.node.source.value += '.vue'
              }
            } catch (error) {}
          }
        }
      }
    })

    return generate(ast, { retainLines: true, comments: true }, code).code
  }

  transformWithReg(code: string, fileDir: string, debug: boolean) {
    if (typeof code !== 'string') return

    return code.replace(Transformer.MODULE_REG, (...args) => {
      const { SMODULE, DMODULE } = args[7]
      const input = args[0]

      const modulePath = SMODULE || DMODULE || ''
      if (!modulePath) {
        debug && warn('modulePath did not matched')
        return input
      }

      // 已经添加了.vue，则不替换
      if (/\.vue$/.test(modulePath)) {
        debug && warn(`Skip: ${modulePath}, cause already has \`.vue\` suffix`)
        return input
      }

      try {
        const resolvedModulePath = this.resolver(
          /^\./.test(modulePath) ? fileDir : process.cwd(), // 相对路径，需要基于文件路径解析
          modulePath
        )

        const normalizedPath = normalizePath(resolvedModulePath as string)

        debug && info(`this.isHitted(${normalizedPath})`, this.isHitted(normalizedPath))

        if (!this.isHitted(normalizedPath)) return input

        const output = this.normalizeTransPath(input, normalizedPath, modulePath, debug)

        debug && info('Transformed ESModule expression', output)

        return output
      } catch (error) {
        debug && err(error)
        return input
      }
    })
  }

  normalizeTransPath(input: string, normalizedPath: string, modulePath: string, debug: boolean) {
    // 单独处理/Dir这种会被解释为/Dir/index.vue的路径
    const { mainFiles } = this.resolveConfig

    // /Dir被解析成/Dir/index.js还是/Dir/main.js，取决于mainFiles
    const mainFilesStr = mainFiles && mainFiles.length ? mainFiles.join('|') : 'index'

    const reg = new RegExp(`\/((?:${mainFilesStr}).vue)$`)

    const matched = reg.exec(normalizedPath)

    debug && info(`Filename matched:`, JSON.stringify(matched))

    // 解析出来的不是/Dir/index.vue路径(/Dir/test)，直接在其后添加.vue即可
    if (!matched) return input.replace(modulePath, modulePath + '.vue')

    const fileName = matched[1]
    return input.replace(
      modulePath,
      /\/$/.test(modulePath) // ./Test/
        ? modulePath + fileName
        : new RegExp(`\/${mainFilesStr}$`).test(modulePath) // ./Test/index
        ? modulePath + '.vue'
        : modulePath + '/' + fileName // ./Test
    )
  }
}
