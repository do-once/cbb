/**
 * @author GuangHui
 * @description 图片标题类
 */

import { getCssFontDesc, measureTextMetrics } from '@doonce/utils'
import { GlobalFontOptions } from '../../DoonceLayoutEngine'

import { IContent, ISize, Base, LayoutItemTypeEnum } from '../base'

export class GraphTitle extends Base implements IContent {
  layoutItemType = LayoutItemTypeEnum.GRAPH_TITLE
  canLineBreak = false

  rawContent: string
  content: string = ''

  globalFontOptions: GlobalFontOptions

  constructor(rawContent: string, globalFontOptions: GlobalFontOptions) {
    super()

    this.rawContent = rawContent
    this.globalFontOptions = globalFontOptions
  }

  measureSize(): ISize {
    const fontDescObj = {
      ...this.globalFontOptions,
      lineHeight: `${this.globalFontOptions.lineHeight}px`
    }
    const { width } = measureTextMetrics(this.content, getCssFontDesc(fontDescObj))

    return {
      width,
      height: this.globalFontOptions.lineHeight
    }
  }
}
