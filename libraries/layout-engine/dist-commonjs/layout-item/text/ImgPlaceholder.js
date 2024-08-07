'use strict'
/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImgPlaceholder = void 0
const base_1 = require('../base')
class ImgPlaceholder extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.IMG_PLACEHOLDER
  canLineBreak = false
  ownerImg /** 拥有占位符的图形组件 */
  rawContent = ''
  content = ''
  height
  rowNo
  constructor({ ownerImg, height, rowNo, y }) {
    if (!ownerImg) throw new Error('ownerImg is required')
    super()
    this.ownerImg = ownerImg
    this.x = ownerImg.x
    this.y = y
    this.width = ownerImg.width
    this.height = height
    this.rowNo = rowNo
  }
  init(force = false) {
    /** 不需要 init */
    console.log('ImgPlaceholder.inited')
  }
  measureSize() {
    return {
      width: this.width,
      height: this.height
    }
  }
}
exports.ImgPlaceholder = ImgPlaceholder
//# sourceMappingURL=ImgPlaceholder.js.map
