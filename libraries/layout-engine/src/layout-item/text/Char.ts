/**
 * @author GuangHui
 * @description 单字符
 */

import { getCssFontDesc, measureTextMetrics } from '@doonce/utils'
import { GlobalFontOptions } from '../../DoonceLayoutEngine'
import { Base, LayoutItemTypeEnum, IContent, IPos, ISize } from '../base'

export class Char extends Base implements IContent {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.CHAR
  canLineBreak: boolean = false

  rawContent: string
  content: string

  globalFontOptions: GlobalFontOptions

  constructor(rawContent: string, globalFontOptions: GlobalFontOptions) {
    super()

    this.rawContent = rawContent
    this.content = rawContent /** 单个字符的渲染内容和原始内容应该保持一致 */

    this.globalFontOptions = globalFontOptions
  }

  async init() {
    const { width, height } = this.measureSize()
    this.width = width
    this.height = height
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
