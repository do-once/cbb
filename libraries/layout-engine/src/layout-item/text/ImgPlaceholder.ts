/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */

import { GlobalFontOptions } from '../../DoonceLayoutEngine'
import { Base, IContent, ISize, LayoutItemTypeEnum } from '../base'
import { Graph, Img } from '../img'

/** 限制占位的owner类型 */
export type Owner = Img | Graph

export type ImgPlaceHolderCtrOptions = {
  owner: Owner
  height: number
}

export class ImgPlaceHolder extends Base implements IContent {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.IMG_PLACEHOLDER
  canLineBreak: boolean = false

  owner: Owner /** 拥有占位符的图形组件 */

  rawContent: string = ''
  content: string = ''
  height = 0

  constructor({ owner, height }: ImgPlaceHolderCtrOptions) {
    if (!owner) throw new Error('owner is required')

    super()

    this.owner = owner
    this.height = height
    this.width = this.owner.width
  }

  measureSize(): ISize {
    // TODO 似乎不需要实现
    return {
      width: this.width,
      height: this.height
    }
  }
}
