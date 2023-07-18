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
  getPos() {
    throw new Error('Method not implemented.')
  }
  getSize() {
    throw new Error('Method not implemented.')
  }
}
exports.Row = Row
//# sourceMappingURL=Row.js.map
