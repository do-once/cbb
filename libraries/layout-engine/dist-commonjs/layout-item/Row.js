'use strict'
/**
 * @author GuangHui
 * @description 行
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Row = void 0
const base_1 = require('./base')
class Row extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.ROW
  canLineBreak = false
  rowNo = -1
  indent = 0
  childs = []
  globalFontOptions
  constructor(globalFontOptions) {
    super()
    this.globalFontOptions = globalFontOptions
  }
  addChild(child) {
    this.childs.push(child)
  }
  measureSize() {
    return this.childs.reduce(
      (acc, cur) => {
        acc.width += cur.width
        acc.height = Math.max(this.globalFontOptions.lineHeight, cur.height)
        return acc
      },
      { width: 0, height: 0 }
    )
  }
}
exports.Row = Row
//# sourceMappingURL=Row.js.map
