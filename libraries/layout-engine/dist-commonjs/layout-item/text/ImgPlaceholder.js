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
  owner /** 拥有占位符的图形组件 */
  rawContent = ''
  content = ''
  height
  constructor({ owner, height }) {
    if (!owner) throw new Error('owner is required')
    super()
    this.owner = owner
    this.height = height
    this.width = this.owner.width
    this.x = this.owner.x
  }
  measureSize() {
    // TODO 似乎不需要实现
    return {
      width: this.width,
      height: this.height
    }
  }
}
exports.ImgPlaceholder = ImgPlaceholder
//# sourceMappingURL=ImgPlaceholder.js.map
