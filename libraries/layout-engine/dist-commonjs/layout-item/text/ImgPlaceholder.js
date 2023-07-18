'use strict'
/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImgPlaceHolder = void 0
const base_1 = require('../base')
class ImgPlaceHolder extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.IMG_PLACEHOLDER
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
exports.ImgPlaceHolder = ImgPlaceHolder
//# sourceMappingURL=ImgPlaceholder.js.map
