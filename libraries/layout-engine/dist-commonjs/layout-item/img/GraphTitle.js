'use strict'
/**
 * @author GuangHui
 * @description 图片标题类
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.GraphTitle = void 0
const utils_1 = require('@doonce/utils')
const base_1 = require('../base')
class GraphTitle extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.GRAPH_TITLE
  canLineBreak = false
  rawContent
  content = ''
  globalFontOptions
  constructor(rawContent, globalFontOptions) {
    super()
    this.rawContent = rawContent
    this.globalFontOptions = globalFontOptions
  }
  measureSize() {
    const fontDescObj = {
      ...this.globalFontOptions,
      lineHeight: `${this.globalFontOptions.lineHeight}px`
    }
    const { width } = (0, utils_1.measureTextMetrics)(this.content, (0, utils_1.getCssFontDesc)(fontDescObj))
    return {
      width,
      height: this.globalFontOptions.lineHeight
    }
  }
}
exports.GraphTitle = GraphTitle
//# sourceMappingURL=GraphTitle.js.map
