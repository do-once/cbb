/**
 * @author GuangHui
 * @description 带标题的图片类(不应该用在题干中)
 */

import { getCssFontDesc, measureTextMetrics } from '@doonce/utils'
import { GlobalFontConfig } from '../../DoonceLayoutEngine'

import { ISize, Base, LayoutItemTypeEnum, ImgSurrounTypeEnum } from '../base'
import { Graph } from './Graph'

export type GraphWithTitleOptions = {
  title: string
  globalFontConfig: GlobalFontConfig
  graphInstance: Graph
  imgSurroundType?: ImgSurrounTypeEnum
}

export class GraphWithTitle extends Base {
  layoutItemType = LayoutItemTypeEnum.GRAPH_WITH_TITLE
  canLineBreak = false

  globalFontConfig: GlobalFontConfig
  title: string
  imgSurroundType: ImgSurrounTypeEnum
  graphInstance: Graph = null as unknown as Graph

  constructor({ title, globalFontConfig, graphInstance, imgSurroundType }: GraphWithTitleOptions) {
    super()

    if (!title) throw new Error('title and src is required')

    this.title = title
    this.globalFontConfig = globalFontConfig
    this.graphInstance = graphInstance
    this.imgSurroundType = imgSurroundType ?? ImgSurrounTypeEnum.NONE
  }

  async init() {
    /** graph实例初始化后可获取到尺寸信息 */
    await this.graphInstance.init()

    const { width, height } = await this.measureSize()
    this.width = width
    this.height = height
  }

  async measureSize(): Promise<ISize> {
    const { width: titleWidth, height: titleHeight } = this.measureTitleSize()

    return {
      width: Math.max(titleWidth, this.graphInstance.width),
      height: titleHeight + this.graphInstance.height
    }
  }

  measureTitleSize() {
    const fontDescObj = {
      ...this.globalFontConfig,
      lineHeight: `${this.globalFontConfig.lineHeight}px`
    }
    const { width } = measureTextMetrics(this.title, getCssFontDesc(fontDescObj))

    return {
      width,
      height: this.globalFontConfig.lineHeight
    }
  }
}
