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
  rowNo
  childs = []
  globalFontConfig
  constructor({ globalFontConfig, rowNo }) {
    super()
    if (!globalFontConfig || !rowNo) throw new Error('globalFontConfig and rowNo is required')
    this.globalFontConfig = globalFontConfig
    this.rowNo = rowNo
  }
  init(force) {
    /** 已经初始化,并不是强制初始化,则跳过 */
    if (this.initialized && !force) return
    // TODO 需要优化实现
    console.log('force :>> ', force)
    this.initialized = true
  }
  addChild(child) {
    this.childs.push(child)
  }
  measureSize() {
    return this.childs.reduce(
      (acc, cur) => {
        acc.width += cur.width
        acc.height = Math.max(this.globalFontConfig.lineHeight, cur.height)
        return acc
      },
      { width: 0, height: 0 }
    )
  }
}
exports.Row = Row
//# sourceMappingURL=Row.js.map
