'use strict'
/**
 * @author GuangHui
 * @description 图片类,应包含图片本身 Graph+图片的标题GraphTitle
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Img = void 0
const base_1 = require('../base')
class Img extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.IMG
  canLineBreak = false
  childs = []
  surroundType = base_1.SurrounTypeEnum.NONE
  getPos() {
    throw new Error('Method not implemented.')
  }
  getSize() {
    throw new Error('Method not implemented.')
  }
  haveTitle() {
    return this.childs.length > 1
  }
}
exports.Img = Img
//# sourceMappingURL=Img.js.map
