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
  rawContent = ''
  content = ''
  getPos() {
    throw new Error('Method not implemented.')
  }
  getSize() {
    throw new Error('Method not implemented.')
  }
}
exports.Formula = Formula
//# sourceMappingURL=Formula.js.map
