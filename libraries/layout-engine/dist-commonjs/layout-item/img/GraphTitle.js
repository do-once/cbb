'use strict'
/**
 * @author GuangHui
 * @description 图片标题类
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.GraphTitle = void 0
const base_1 = require('../base')
class GraphTitle extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.GRAPH_TITLE
  canLineBreak = false
  rawContent = ''
  content = ''
  horizontalAlign = base_1.HorizontalAlignEnum.MIDDLE
  getPos() {
    return {
      x: this.x,
      y: this.y
    }
  }
  async getSize() {
    throw new Error('Method not implemented.')
  }
}
exports.GraphTitle = GraphTitle
//# sourceMappingURL=GraphTitle.js.map
