/**
 * @author GuangHui
 * @description 行
 */

import { GlobalFontConfig } from '../DoonceLayoutEngine'
import { Base, IChild, IRow, ISize, LayoutItemTypeEnum } from './base'
import { Char, Formula, ImgPlaceholder, CRLF } from './text'

import { RowLayoutItemGroup } from './RowLayoutItemGroup'
import { Img } from './img'

/** 限制行的 child 类型 */
export type RowChild = Char | Formula | ImgPlaceholder | RowLayoutItemGroup | CRLF | Img

export type RowCtrOptions = {
  globalFontConfig: GlobalFontConfig
  rowNo: IRow['rowNo']
}

export class Row extends Base implements IRow, IChild {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.ROW
  canLineBreak: boolean = false

  rowNo: IRow['rowNo']

  childs: RowChild[] = []
  globalFontConfig: GlobalFontConfig

  constructor({ globalFontConfig, rowNo }: RowCtrOptions) {
    super()

    if (!globalFontConfig || !rowNo) throw new Error('globalFontConfig and rowNo is required')

    this.globalFontConfig = globalFontConfig
    this.rowNo = rowNo
  }

  init(force: boolean): void {
    /** 已经初始化,并不是强制初始化,则跳过 */
    if (this.initialized && !force) return

    // TODO 需要优化实现
    console.log('force :>> ', force)
    this.initialized = true
  }

  addChild(child: RowChild) {
    this.childs.push(child)
  }

  measureSize(): ISize {
    return this.childs.reduce<ISize>(
      (acc, cur) => {
        acc.width += cur.width
        acc.height = Math.max(this.globalFontConfig.lineHeight, cur.height)

        return acc
      },
      { width: 0, height: 0 }
    )
  }
}
