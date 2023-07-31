/**
 * @author GuangHui
 * @description 行
 */

import { GlobalFontConfig } from '../DoonceLayoutEngine'
import { Base, IChild, IRow, ISize, LayoutItemTypeEnum } from './base'
import { Graph } from './img'
import { Char, Formula, ImgPlaceholder, CRLF } from './text'

import { RowLayoutItemGroup } from './RowLayoutItemGroup'

/** 限制行的 child 类型 */
export type RowChild = Char | Formula | ImgPlaceholder | RowLayoutItemGroup | CRLF | Graph

export type RowCtrOptions = {
  globalFontConfig: GlobalFontConfig
  rowNo: number
  indent?: number
}

export class Row extends Base implements IRow, IChild {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.ROW
  canLineBreak: boolean = false

  rowNo: number = -1

  childs: RowChild[] = []
  globalFontConfig: GlobalFontConfig

  constructor({ globalFontConfig, rowNo, indent }: RowCtrOptions) {
    super()

    if (!globalFontConfig || !rowNo) throw new Error('globalFontConfig and rowNo is required')

    this.globalFontConfig = globalFontConfig
    this.rowNo = rowNo
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
