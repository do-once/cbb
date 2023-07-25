'use strict'
/**
 * @author GuangHui
 * @description 图片类
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Graph = void 0
const utils_1 = require('@doonce/utils')
const base_1 = require('../base')
class Graph extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.GRAPH
  canLineBreak = false
  src
  imgSurroundType
  constructor({ src, imgSurroundType }) {
    super()
    if (!src) throw new Error('src is required')
    this.src = src
    this.imgSurroundType = imgSurroundType
  }
  async init() {
    const { width, height } = await this.measureSize()
    this.width = width
    this.height = height
  }
  async measureSize() {
    return await (0, utils_1.measureImgSize)(this.src)
  }
}
exports.Graph = Graph
//# sourceMappingURL=Graph.js.map
