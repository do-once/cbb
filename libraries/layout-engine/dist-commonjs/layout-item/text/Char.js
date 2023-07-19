'use strict'
/**
 * @author GuangHui
 * @description 单字符
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Char = void 0
const _1 = require('@doonce/utils/*')
const base_1 = require('../base')
class Char extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.CHAR
  canLineBreak = false
  rawContent
  content
  globalFontOptions
  constructor(rawContent, globalFontOptions) {
    super()
    this.rawContent = rawContent
    this.content = rawContent /** 单个字符的渲染内容和原始内容应该保持一致 */
    this.globalFontOptions = globalFontOptions
  }
  measureSize() {
    const fontDescObj = {
      ...this.globalFontOptions,
      lineHeight: `${this.globalFontOptions.lineHeight}px`
    }
    const { width } = (0, _1.measureTextMetrics)(this.content, (0, _1.getCssFontDesc)(fontDescObj))
    return {
      width,
      height: this.globalFontOptions.lineHeight
    }
  }
}
exports.Char = Char
//# sourceMappingURL=Char.js.map
