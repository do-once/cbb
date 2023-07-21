/**
 * @author GuangHui
 * @description 单字符
 */

import { getCssFontDesc, measureTextMetrics } from '@doonce/utils'
import { GlobalFontOptions } from '../../DoonceLayoutEngine'
import { Base, LayoutItemTypeEnum, IContent, IPos, ISize, ICache } from '../base'

export type CharCtrParams = {
  rawContent: string /** 原始内容 */
  globalFontOptions: GlobalFontOptions /** 字体设置项 */
  debug?: boolean /** 调试 */
}

export class Char extends Base implements IContent {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.CHAR
  canLineBreak: boolean = false

  rawContent: string
  content: string = ''

  globalFontOptions: GlobalFontOptions
  debug = false

  constructor({ rawContent, globalFontOptions, debug }: CharCtrParams) {
    super()

    this.rawContent = rawContent

    this.globalFontOptions = globalFontOptions
    this.debug = !!debug
  }

  async init() {
    this.content = this.rawContent /** 单个字符的渲染内容和原始内容应该保持一致 */

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
