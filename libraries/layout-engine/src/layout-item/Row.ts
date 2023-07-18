/**
 * @author GuangHui
 * @description 行
 */

import { GlobalFontOptions } from '../DoonceLayoutEngine'
import { Base, IChild, IRow, ISize, LayoutItemTypeEnum } from './base'
import { Char, Formula, ImgPlaceHolder, TextGroup } from './text'

/** 限制行的 child 类型 */
export type RowChild = Char | Formula | ImgPlaceHolder | TextGroup

export class Row extends Base implements IRow, IChild {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.ROW
  canLineBreak: boolean = false

  rowNo: number = -1
  indent: number = 0

  childs: RowChild[] = []
  globalFontOptions: GlobalFontOptions

  constructor(globalFontOptions: GlobalFontOptions) {
    super()

    this.globalFontOptions = globalFontOptions
  }

  addChild(child: RowChild) {
    this.childs.push(child)
  }

  measureSize(): ISize {
    return this.childs.reduce<ISize>(
      (acc, cur) => {
        acc.width += cur.width
        acc.height = Math.max(this.globalFontOptions.lineHeight, cur.height)

        return acc
      },
      { width: 0, height: 0 }
    )
  }
}
