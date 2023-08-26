/**
 * @author GuangHui
 * @description DoonceThemeService 主体程序
 */

import { canSupportCssVar, uuid, loadJs } from '@doonce/utils'

export type ThemeTuple = [string, string][]

/**
 * 主题服务
 *
 * @date 2021-06-24 10:28:29
 * @export
 * @class ThemeService
 */
export class DoonceThemeService {
  private styleEl: HTMLStyleElement | null = null
  private styleElId: string = ''

  /**
   * 应用主题
   *
   * @date 2021-06-24 10:30:20
   * @public
   * @instance
   * @param {Array} themeTuple  主题配置数组(二元数组)，参照上面使用demo
   * @memberof ThemeService
   */
  applyTheme(themeTuple: ThemeTuple): void {
    if (!Array.isArray(themeTuple) || !themeTuple.length) return

    if (typeof MutationObserver === 'function') {
      if (canSupportCssVar()) {
        this._apply(themeTuple)
      } else {
        this._loadCssVarsPonyfill().then(res => {
          this._apply(themeTuple)
        })
      }
    } else {
      this._loadMutationObserverPolyfill().then(() => {
        if (canSupportCssVar()) {
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
  _apply(themeTuple: ThemeTuple) {
    const cssText = this._genCssText(themeTuple)

    if (!this.styleEl) {
      this.styleEl = document.createElement('style')
      this.styleEl.innerText = `:root{${cssText}}`
      this.styleElId = uuid()
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
    return import(/* webpackChunkName:'mutationobserver-shim' */ 'mutationobserver-shim').catch(err => {
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
    return import(/* webpackChunkName:'css-vars-ponyfill' */ 'css-vars-ponyfill')
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
  _genCssText(themeTuple: ThemeTuple) {
    return themeTuple.map(([prop, val]) => `${prop.startsWith('--') ? '' : '--'}${prop}:${val};`).join('')
  }
}
