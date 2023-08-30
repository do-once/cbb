/**
 * @author GuangHui
 * @description DoonceKatexWrapper 主体程序
 */

import { loadCss, loadJs } from '@doonce/utils'

declare global {
  interface Window {
    katex: any
  }
}

/**
 * 特殊字符过滤正则映射表
 * @example
 * new Map([
  [/\\\(/g, ''],
  [/\\\)/g, ''],
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/，/g, ', '],
  [//g, ''],
  [/&times;/g, '×'],
  [/&divide;/g, '÷'],
  [/&nbsp;/g, ' '],
  [/&middot;/g, '.'],
  [/①/g, '(1)'],
  [/②/g, '(2)'],
  [/③/g, '(3)'],
  [/④/g, '(4)'],
  [/′/g, "'"],
  [/﹡/g, '*'],
  [/～/g, '~'],
  [/&quot;/g, '"'],
  [/&amp;/g, '&']
])
 */
export const filterMap = new Map([
  [/\\\(/g, ''],
  [/\\\)/g, ''],
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/，/g, ', '],
  [//g, ''],
  [/&times;/g, '×'],
  [/&divide;/g, '÷'],
  [/&nbsp;/g, ' '],
  [/&middot;/g, '.'],
  [/①/g, '(1)'],
  [/②/g, '(2)'],
  [/③/g, '(3)'],
  [/④/g, '(4)'],
  [/′/g, "'"],
  [/﹡/g, '*'],
  [/～/g, '~'],
  [/&quot;/g, '"'],
  [/&amp;/g, '&']
])

type DoonceKatexWrapperOptions = {
  css: string
  js: string
}

/**
 * katex包装器，支持按需加载katex
 *
 * @date 2023-08-30 14:30:02
 * @export
 * @class DoonceKatexWrapper
 */
export class DoonceKatexWrapper {
  /**
   * 特殊字符过滤正则映射表
   *
   * @date 2023-05-19 14:43:02
   * @static
   * @memberof DoonceKatexWrapper
   * @example
   * 自定义过滤映射表
   * DoonceKatexWrapper.filterMap = new Map([[/\s/,'\n']])
   */
  static filterMap = filterMap

  /**
   * 使用katex.renderTostring渲染一个字符串
   *
   * @date 2023-05-19 14:43:11
   * @static
   * @param {string} str 输入字符串
   * @return {string}  渲染后的字符串
   * @memberof DoonceKatexWrapper
   */
  static renderToString(str: string): string {
    if (!window.katex) throw new Error('window.katex can not access')

    return window.katex.renderToString(str, {
      throwOnError: true,
      unicodeTextInMathMode: true
    })
  }

  /** 单例用 */
  static _instance = null as unknown as DoonceKatexWrapper

  css: string = ''
  js: string = ''
  isLoading = false
  pendingQueue: { resolve: (value: any) => void; reject: (reason?: any) => void; str: string }[] = []

  /**
   * DoonceKatexWrapper构造函数
   * @date 2023-05-19 14:35:58
   * @constructor
   * @param {Object} options 参数对象，参数对象包含字段css、js，为远程katex CDN地址；
   * @property css 默认值：'//www.jsdelivr.com/package/npm/common/libs/katex-2.4.0-custom/katex.css'
   * @property js 默认值：'//www.jsdelivr.com/package/npm/common/libs/katex-2.4.0-custom/katex.min.js'
   * @memberof DoonceKatexWrapper
   * @example
   * 自定义资源cdn地址
   * new DoonceKatexWrapper({
   *   css:'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
   *   js:'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.js'
   * })
   */
  constructor(
    {
      css = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
      js = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js'
    } = {} as DoonceKatexWrapperOptions
  ) {
    if (DoonceKatexWrapper._instance) return DoonceKatexWrapper._instance

    if (typeof css !== 'string' || typeof js !== 'string') throw new Error('css、js can not be empty')

    this.css = css
    this.js = js
    this.isLoading = false
    this.pendingQueue = []

    return (DoonceKatexWrapper._instance = this)
  }

  /**
   * 加载js、css
   *
   * @date 2023-05-19 15:03:01
   * @private
   * @return {Promise} promise实例
   * @memberof DoonceKatexWrapper
   */
  _load() {
    return Promise.all([loadCss(this.css), loadJs(this.js)])
  }

  /**
   * 转义正则组
   *
   * @date 2023-05-19 15:14:00
   * @private
   * @param {string} group 正则字符串组
   * @return {string} 转义后的字符串
   * @memberof DoonceKatexWrapper
   */
  _escapeGroup(group: string) {
    return Array.from(DoonceKatexWrapper.filterMap.entries()).reduce(
      (acc, [reg, replacement]) => (reg.test(acc) ? acc.replace(reg, replacement) : acc),
      group
    )
  }

  /**
   * 内部渲染方法
   *
   * @date 2023-05-19 15:16:22
   * @private
   * @param {string} str 待渲染的字符串
   * @return {string} katex渲染后的字符串
   * @memberof DoonceKatexWrapper
   */
  _render(str: string): string {
    if (typeof str !== 'string') throw new Error('str must be a string')
    // * 2023-1222-未经过标准化服务的字符串不再直接返回，而是尝试用katex直接渲染
    // if (!/\\\(.*?\\\)/.test(str)) return str

    return /\\\(.*?\\\)/.test(str)
      ? str.replace(
          /\\\(.*?\\\)/g,
          group => ` ${DoonceKatexWrapper.renderToString(this._escapeGroup(group))} `
        )
      : DoonceKatexWrapper.renderToString(str)
  }

  /**
   * 执行等待队列
   *
   * @date 2023-05-19 15:15:29
   * @private
   * @param {Object} opt 立即reject对象，包含immediateReject、immediateRejectErr字段
   * @property immediateReject 默认为false
   * @property immediateRejectErr 自定义injected错误
   * @return {void} 无返回
   * @memberof DoonceKatexWrapper
   */
  _run(
    { immediateReject = false, immediateRejectErr } = {} as {
      immediateReject: boolean
      immediateRejectErr: unknown
    }
  ) {
    if (!this.pendingQueue || !this.pendingQueue.length) return Promise.resolve()

    while (this.pendingQueue.length) {
      const { resolve, reject, str } = this.pendingQueue.shift()!
      if (immediateReject) {
        reject(immediateRejectErr)
      } else {
        try {
          resolve(this._render(str))
        } catch (error) {
          reject(error)
        }
      }
    }
  }

  /**
   * 包装过的渲染函数
   *
   * @date 2023-05-19 15:15:54
   * @public
   * @instance
   * @param {string} str 待渲染的字符串
   * @return {Promise} Promise实例
   * @fulfil katex渲染后的字符串
   * @reject error
   * @memberof DoonceKatexWrapper
   * @example
   * const katex = new DoonceKatexWrapper()
   * katex.render('\frac{AC}{DF}').then(katexedStr =>console.log(katexedStr))
   */
  render(str: string) {
    return new Promise<string>((resolve, reject) => {
      if (typeof str !== 'string') return reject(new Error('str can not be empty'))

      if (window.katex) {
        return resolve(this._render(str))
      } else {
        this.pendingQueue.push({ resolve, reject, str })

        if (!this.isLoading) {
          this.isLoading = true

          this._load()
            .then(() => {
              this.isLoading = false

              this._run()
            })
            .catch(err => {
              console.log('load katex err', err)
              this.isLoading = false

              // load失败，需要触发等待队列中的reject，以执行后续流程
              this._run({
                immediateReject: true,
                immediateRejectErr: err
              })
            })
        }
      }
    })
  }
}
