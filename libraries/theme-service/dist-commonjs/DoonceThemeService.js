'use strict'
/**
 * @author GuangHui
 * @description DoonceThemeService 主体程序
 */
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            }
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.DoonceThemeService = void 0
const utils_1 = require('@doonce/utils')
/**
 * 主题服务
 *
 * @date 2021-06-24 10:28:29
 * @export
 * @class ThemeService
 */
class DoonceThemeService {
  styleEl = null
  styleElId = ''
  /**
   * 应用主题
   *
   * @date 2021-06-24 10:30:20
   * @public
   * @instance
   * @param {Array} themeTuple  主题配置数组(二元数组)，参照上面使用demo
   * @memberof ThemeService
   */
  applyTheme(themeTuple) {
    if (!Array.isArray(themeTuple) || !themeTuple.length) return
    if (typeof MutationObserver === 'function') {
      if ((0, utils_1.canSupportCssVar)()) {
        this._apply(themeTuple)
      } else {
        this._loadCssVarsPonyfill().then(res => {
          this._apply(themeTuple)
        })
      }
    } else {
      this._loadMutationObserverPolyfill().then(() => {
        if ((0, utils_1.canSupportCssVar)()) {
          this._apply(themeTuple)
        } else {
          this._loadCssVarsPonyfill().then(res => {
            this._apply(themeTuple)
          })
        }
      })
    }
  }
  /**
   * 销毁
   *
   * @date 2021-06-24 10:30:34
   * @public
   * @instance
   * @memberof ThemeService
   */
  destroy() {
    if (this.styleEl) {
      document.head.removeChild(this.styleEl)
      this.styleEl = null
    }
    this.styleElId && (this.styleElId = '')
  }
  /**
   * 应用主题数组
   *
   * @date 2021-06-24 10:30:51
   * @private
   * @param {Array} themeTuple 主题配置数组
   * @memberof ThemeService
   */
  _apply(themeTuple) {
    const cssText = this._genCssText(themeTuple)
    if (!this.styleEl) {
      this.styleEl = document.createElement('style')
      this.styleEl.innerText = `:root{${cssText}}`
      this.styleElId = (0, utils_1.uuid)()
      this.styleEl.setAttribute('data-theme-id', this.styleElId)
      document.head.appendChild(this.styleEl)
    } else {
      this.styleEl.innerText = `:root{${cssText}}`
    }
  }
  /**
   * 加载MutationObserverPolyfill
   *
   * @date 2021-06-24 10:31:03
   * @private
   * @return {Promise} promise实例
   * @memberof ThemeService
   */
  _loadMutationObserverPolyfill() {
    return Promise.resolve()
      .then(() =>
        __importStar(require(/* webpackChunkName:'mutationobserver-shim' */ 'mutationobserver-shim'))
      )
      .catch(err => {
        console.log('加载mutationobserver-shim失败', err)
      })
  }
  /**
   * 加载CssVarsPonyfill
   *
   * @date 2021-06-24 10:31:22
   * @private
   * @return {Promise} promise实例
   * @memberof ThemeService
   */
  _loadCssVarsPonyfill() {
    return Promise.resolve()
      .then(() => __importStar(require(/* webpackChunkName:'css-vars-ponyfill' */ 'css-vars-ponyfill')))
      .then(({ default: cssVars }) => {
        // https://jhildenbiddle.github.io/css-vars-ponyfill/#/
        const config = {
          watch: true,
          preserveVars: true,
          silent: false /* 若为静默模式不会输出log */
        }
        cssVars(config)
        return true
      })
      .catch(err => {
        console.log('加载css-vars-ponyfill失败', err)
      })
  }
  /**
   * 生成样式字符串
   *
   * @date 2021-06-24 10:31:36
   * @private
   * @param {ThemeTuple} themeTuple  主题配置数组
   * @return {String} css var 样式字符串
   * @memberof ThemeService
   */
  _genCssText(themeTuple) {
    return themeTuple.map(([prop, val]) => `${prop.startsWith('--') ? '' : '--'}${prop}:${val};`).join('')
  }
}
exports.DoonceThemeService = DoonceThemeService
//# sourceMappingURL=DoonceThemeService.js.map
