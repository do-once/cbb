'use strict'
/**
 * @author GuangHui
 * @description 图片类,应包含图片本身 Graph+图片的标题GraphTitle,GraphTitle总是在Graph 下方
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Img = void 0
const base_1 = require('../base')
class Img extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.IMG
  canLineBreak = false
  childs
  imgSurroundType = base_1.ImgSurrounTypeEnum.NONE
  constructor(childs) {
    super()
    this.childs = childs
  }
  haveTitle() {
    return this.childs.length > 1
  }
  measureSize() {
    const [graph, graphTitle] = this.childs
    const width = graphTitle ? Math.max(graph.width, graphTitle.width) : graph.width
    const height = graphTitle ? graph.height + graphTitle.height : graph.height
    return {
      width,
      height
    }
  }
}
exports.Img = Img
//# sourceMappingURL=Img.js.map
