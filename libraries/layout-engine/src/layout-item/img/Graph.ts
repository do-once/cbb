/**
 * @author GuangHui
 * @description 图片类
 */

import { measureImgSize } from '@doonce/utils'

import { Base, IImgSurround, ImgSurrounTypeEnum, IPos, ISize, LayoutItemTypeEnum } from '../base'

export type GraphOptions = {
  src: string
  imgSurroundType?: ImgSurrounTypeEnum
}

export class Graph extends Base implements IImgSurround {
  layoutItemType = LayoutItemTypeEnum.GRAPH
  canLineBreak = false

  src: string

  imgSurroundType: ImgSurrounTypeEnum

  constructor({ src, imgSurroundType }: GraphOptions) {
    super()

    if (!src) throw new Error('src is required')

    this.src = src
    this.imgSurroundType = imgSurroundType ?? ImgSurrounTypeEnum.NONE
  }

  async init() {
    const { width, height } = await this.measureSize()
    this.width = width
    this.height = height
  }

  async measureSize(): Promise<ISize> {
    return await measureImgSize(this.src)
  }
}
