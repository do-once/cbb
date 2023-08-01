'use strict'
/**
 * @author GuangHui
 * @description 字符
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Char = void 0
const utils_1 = require('@doonce/utils')
const base_1 = require('../base')
class Char extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.CHAR
  canLineBreak = false
  rawContent
  content = ''
  globalFontConfig
  debug = false
  rowNo
  constructor({ rawContent, globalFontConfig, debug, rowNo }) {
    super()
    this.rawContent = rawContent
    this.globalFontConfig = globalFontConfig
    this.debug = !!debug
    this.rowNo = rowNo
  }
  async init(force = false) {
    /** 已经初始化,并不是强制初始化,则跳过 */
    if (this.initialized && !force) return
    this.content = this.rawContent /** 单个字符的渲染内容和原始内容应该保持一致 */
    const { width, height } = this.measureSize()
    this.width = width
    this.height = height
    this.initialized = true
  }
  measureSize() {
    const fontDescObj = {
      ...this.globalFontConfig,
      lineHeight: `${this.globalFontConfig.lineHeight}px`
    }
    const { width } = (0, utils_1.measureTextMetrics)(this.content, (0, utils_1.getCssFontDesc)(fontDescObj))
    return {
      width,
      height: this.globalFontConfig.lineHeight
    }
  }
}
exports.Char = Char
//# sourceMappingURL=Char.js.map
