/**
 * @author GuangHui
 * @description 公式
 */

import { getCssFontDesc, measureTextMetrics } from '@doonce/utils/*'
import { GlobalFontOptions } from '../../DoonceLayoutEngine'
import { Base, IContent, IPos, ISize, LayoutItemTypeEnum } from '../base'

export class Formula extends Base implements IContent {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.FORMULA
  canLineBreak: boolean = false

  rawContent: string
  content: string = ''

  globalFontOptions: GlobalFontOptions

  constructor(rawContent: string, globalFontOptions: GlobalFontOptions) {
    super()

    this.rawContent = rawContent
    this.content = '123' /** 需要获取公式的渲染内容 */

    this.globalFontOptions = globalFontOptions
  }

  measureSize(): ISize {
    // TODO 需要获取完 content 后,再对 content 进行测量
    return {
      width: 0,
      height: 0
    }
  }
}
