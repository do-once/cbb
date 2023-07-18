/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */

import { GlobalFontOptions } from '../../DoonceLayoutEngine'
import { Base, ISize, LayoutItemTypeEnum } from '../base'
import { Graph, Img } from '../img'

/** 限制占位的owner类型 */
export type Owner = Img | Graph

export class ImgPlaceHolder extends Base {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.IMG_PLACEHOLDER
  canLineBreak: boolean = false

  owner: Owner /** 拥有占位符的组件 */

  globalFontOptions: GlobalFontOptions

  constructor(owner: Owner, globalFontOptions: GlobalFontOptions) {
    super()

    this.owner = owner
    this.globalFontOptions = globalFontOptions
  }

  measureSize(): ISize {
    return {
      width: this.owner.width,
      height: this.globalFontOptions.lineHeight
    }
  }
}
