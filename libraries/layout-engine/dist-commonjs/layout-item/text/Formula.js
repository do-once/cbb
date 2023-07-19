'use strict'
/**
 * @author GuangHui
 * @description 公式
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Formula = void 0
const base_1 = require('../base')
class Formula extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.FORMULA
  canLineBreak = false
  rawContent
  content = ''
  globalFontOptions
  constructor(rawContent, globalFontOptions) {
    super()
    this.rawContent = rawContent
    this.content = '123' /** 需要获取公式的渲染内容 */
    this.globalFontOptions = globalFontOptions
  }
  measureSize() {
    // TODO 需要获取完 content 后,再对 content 进行测量
    return {
      width: 0,
      height: 0
    }
  }
}
exports.Formula = Formula
//# sourceMappingURL=Formula.js.map
