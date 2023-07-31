/**
 * @author GuangHui
 * @description 字符
 */

import { getCssFontDesc, measureTextMetrics } from '@doonce/utils'
import { GlobalFontConfig } from '../../DoonceLayoutEngine'
import { Base, LayoutItemTypeEnum, IContent, ISize } from '../base'

export type CharOptions = {
  rawContent: string /** 原始内容 */
  globalFontConfig: GlobalFontConfig /** 字体设置项 */
  debug?: boolean /** 调试 */
}

export class Char extends Base implements IContent {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.CHAR
  canLineBreak: boolean = false

  rawContent: string
  content: string = ''

  globalFontConfig: GlobalFontConfig
  debug = false

  constructor({ rawContent, globalFontConfig, debug }: CharOptions) {
    super()

    this.rawContent = rawContent

    this.globalFontConfig = globalFontConfig
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
      ...this.globalFontConfig,
      lineHeight: `${this.globalFontConfig.lineHeight}px`
    }

    const { width } = measureTextMetrics(this.content, getCssFontDesc(fontDescObj))

    return {
      width,
      height: this.globalFontConfig.lineHeight
    }
  }
}
