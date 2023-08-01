/**
 * @author GuangHui
 * @description 字符
 */

import { getCssFontDesc, measureTextMetrics } from '@doonce/utils'
import { GlobalFontConfig } from '../../DoonceLayoutEngine'
import { Base, LayoutItemTypeEnum, IContent, ISize, IRow } from '../base'

export type CharCtrOptions = {
  rawContent: IContent['rawContent'] /** 原始内容 */
  globalFontConfig: GlobalFontConfig /** 字体设置项 */
  debug?: boolean /** 调试 */
  rowNo: IRow['rowNo']
}

export class Char extends Base implements IContent, IRow {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.CHAR
  canLineBreak: boolean = false

  rawContent: IContent['rawContent']
  content: IContent['content'] = ''

  globalFontConfig: GlobalFontConfig
  debug = false

  rowNo: IRow['rowNo']

  constructor({ rawContent, globalFontConfig, debug, rowNo }: CharCtrOptions) {
    super()

    this.rawContent = rawContent

    this.globalFontConfig = globalFontConfig
    this.debug = !!debug

    this.rowNo = rowNo
  }

  async init(force = false) {
    /** 已经初始化,并不是强制初始化,则跳过 */
    if (this.initialized && !force) return

    this.content = this.rawContent /** 单个字符的渲染内容和原始内容应该保持一致 */

    const { width, height } = this.measureSize()
    this.width = width
    this.height = height

    this.initialized = true
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
