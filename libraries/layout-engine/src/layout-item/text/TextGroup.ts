/**
 * @author GuangHui
 * @description 文本组
 */

import { Base, IContent, IChild, ISize, LayoutItemTypeEnum } from '../base'
import { ImgPlaceHolder, Char, Formula } from './'

/** 限制下TextGroup的child 类型 */
export type TextGroupChild = Char | Formula | ImgPlaceHolder

export class TextGroup extends Base implements IChild, IContent {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.TEXT_GROUP
  canLineBreak: boolean = false

  childs: TextGroupChild[] = []

  rawContent: string = ''
  content: string = ''

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
