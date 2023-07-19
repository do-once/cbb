'use strict'
/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.DoonceLayoutEngine = void 0
const utils_1 = require('@doonce/utils')
class DoonceLayoutEngine {
  globalFontOptions
  font = null
  constructor({ globalFontOptions } = {}) {
    if (!globalFontOptions) throw new Error('globalFontOptions is required')
    this.globalFontOptions = globalFontOptions
    this._init()
  }
  async _init() {
    /** 字体不存在,则先加载 */
    !this.font &&
      (this.font = await (0, utils_1.loadFont)(
        this.globalFontOptions.fontFamily,
        this.globalFontOptions.source
      ))
    /** 字体加载失败,阻塞流程 */
    if (!this.isFontLoaded()) throw new Error(`font ${this.globalFontOptions.fontFamily} load faild`)
  }
  layout(layoutParams) {
    if (!layoutParams) throw new Error('layoutParams is required')
  }
  /**
   * 检查字体是否加载完成
   * 参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#fonts_that_have_loaded
   * 使用document.fonts.check()存在误检测,参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#nonexistent_fonts
   *
   * @date 2023-07-18 00:33:12
   * @returns {boolean} 是否加载
   * @memberof DoonceLayoutEngine
   */
  isFontLoaded() {
    return this.font.status === 'loaded'
  }
}
exports.DoonceLayoutEngine = DoonceLayoutEngine
//# sourceMappingURL=DoonceLayoutEngine.js.map
