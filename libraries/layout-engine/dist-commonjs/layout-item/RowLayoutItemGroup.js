'use strict'
/**
 * @author GuangHui
 * @description 将参与行排版的 item 打成一个组,当成一个 item 参与排版(实现类似标点悬挂效果)
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.RowLayoutItemGroup = void 0
const base_1 = require('./base')
class RowLayoutItemGroup extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.ROW_LAYOUT_ITEM_GROUP
  canLineBreak = false
  childs
  rowNo
  constructor({ childs, rowNo }) {
    super()
    if (!childs || !childs.length) throw new Error('childs is required')
    /** child 的坐标是相对 group 的 */
    this.childs = childs
    this.rowNo = rowNo
  }
  async init(force = false) {
    /** 已经初始化,并不是强制初始化,则跳过 */
    if (this.initialized && !force) return
    /** 初始化所有 child 后,才能拿到尺寸信息 */
    await this._initChilds()
    const { width, height } = this.measureSize()
    this.width = width
    this.height = height
    this.initialized = true
  }
  async _initChilds() {
    await Promise.all(this.childs.map(instance => instance.init()))
  }
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
exports.RowLayoutItemGroup = RowLayoutItemGroup
//# sourceMappingURL=RowLayoutItemGroup.js.map
