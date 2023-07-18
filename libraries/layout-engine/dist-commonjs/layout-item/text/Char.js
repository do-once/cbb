'use strict'
/**
 * @author GuangHui
 * @description 单字符
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Char = void 0
const base_1 = require('../base')
class Char extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.CHAR
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
exports.Char = Char
//# sourceMappingURL=Char.js.map
