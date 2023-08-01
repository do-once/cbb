/**
 * @author GuangHui
 * @description 将参与行排版的 item 打成一个组,当成一个 item 参与排版(实现类似标点悬挂效果)
 */

import { Base, IChild, IRow, ISize, LayoutItemTypeEnum } from './base'
import { Img } from './img/Img'
import { Char, Formula } from './text'

/** 限制下RowLayoutItemGroup的child 类型 */
export type RowLayoutItemGroupChild = Char | Formula | Img

export type RowLayoutItemGroupOptions = {
  childs: [RowLayoutItemGroupChild, RowLayoutItemGroupChild]
  rowNo: IRow['rowNo']
}

export class RowLayoutItemGroup extends Base implements IChild, IRow {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.ROW_LAYOUT_ITEM_GROUP
  canLineBreak: boolean = false

  childs: [RowLayoutItemGroupChild, RowLayoutItemGroupChild]

  rowNo: IRow['rowNo']

  constructor({ childs, rowNo }: RowLayoutItemGroupOptions) {
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

  private async _initChilds() {
    await Promise.all(this.childs.map(instance => instance.init()))
  }

  measureSize(): ISize {
    return this.childs.reduce<ISize>(
      (acc, cur) => {
        acc.width += cur.width
        acc.height = Math.max(acc.height, cur.height)

        return acc
      },
      { width: 0, height: 0 }
    )
  }
}
