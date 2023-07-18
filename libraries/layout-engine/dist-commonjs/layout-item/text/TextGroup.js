'use strict'
/**
 * @author GuangHui
 * @description 文本组
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.TextGroup = void 0
const base_1 = require('../base')
class TextGroup extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.TEXT_GROUP
  canLineBreak = false
  groups = []
  rawContent = ''
  content = ''
  getPos() {
    throw new Error('Method not implemented.')
  }
  getSize() {
    throw new Error('Method not implemented.')
  }
}
exports.TextGroup = TextGroup
//# sourceMappingURL=TextGroup.js.map
