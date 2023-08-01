/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */

import { Base, IContent, IRow, ISize, LayoutItemTypeEnum } from '../base'
import { Img } from '../img'

/** 限制占位的owner类型 */
export type Owner = Img

export type ImgPlaceholderCtrOptions = {
  ownerImg: Owner
  height: number
  y: number
  rowNo: IRow['rowNo']
}

export class ImgPlaceholder extends Base implements IContent, IRow {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.IMG_PLACEHOLDER
  canLineBreak: boolean = false

  ownerImg: Owner /** 拥有占位符的图形组件 */

  rawContent: IContent['rawContent'] = ''
  content: IContent['content'] = ''
  height: number

  rowNo: IRow['rowNo']

  constructor({ ownerImg, height, rowNo, y }: ImgPlaceholderCtrOptions) {
    if (!ownerImg) throw new Error('ownerImg is required')

    super()

    this.ownerImg = ownerImg

    this.x = ownerImg.x
    this.y = y
    this.width = ownerImg.width
    this.height = height

    this.rowNo = rowNo
  }

  init(force = false) {
    /** 不需要 init */
    console.log('ImgPlaceholder.inited')
  }

  measureSize(): ISize {
    return {
      width: this.width,
      height: this.height
    }
  }
}
