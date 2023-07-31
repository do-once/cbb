/**
 * @author GuangHui
 * @description 可以将参与行排版的 item 打成一个组,当成一个 item 参与排版(实现类似标点悬挂效果)
 */

import { Base, IChild, ISize, LayoutItemTypeEnum } from './base'
import { Graph } from './img'
import { Char, Formula } from './text'

/** 限制下RowLayoutItemGroup的child 类型 */
export type RowLayoutItemGroupChild = Char | Formula | Graph

export type RowLayoutItemGroupOptions = {
  childs: RowLayoutItemGroupChild[]
}

export class RowLayoutItemGroup extends Base implements IChild {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.ROW_LAYOUT_ITEM_GROUP
  canLineBreak: boolean = false

  childs: RowLayoutItemGroupChild[]

  constructor({ childs }: RowLayoutItemGroupOptions) {
    super()

    if (!childs || !childs.length) throw new Error('childs is required')
    this.childs = childs
  }

  async init() {
    /** 初始化所有 child 后,才能拿到尺寸信息 */
    await this._initChilds()

    this.measureSize()
  }

  private async _initChilds() {
    await Promise.all(this.childs.map(instance => instance.init()))
  }

  addChild(child: RowLayoutItemGroupChild) {
    this.childs.push(child)
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
