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
  childs = []
  rawContent = ''
  content = ''
  measureSize() {
    return this.childs.reduce(
      (acc, cur) => {
        acc.width += cur.width
        acc.height = Math.max(acc.height, cur.height)
        return acc
      },
      { width: 0, height: 0 }
    )
  }
}
exports.TextGroup = TextGroup
//# sourceMappingURL=TextGroup.js.map
