/**
 * @author GuangHui
 * @description 图片类
 */

import { measureImgSize } from '@doonce/utils'

import { Base, ISize, LayoutItemTypeEnum } from '../base'

export class Graph extends Base {
  layoutItemType = LayoutItemTypeEnum.GRAPH
  canLineBreak = false

  src: string

  constructor(src: string) {
    super()

    if (!src) throw new Error('src is required')

    this.src = src
  }

  async measureSize(): Promise<ISize> {
    return await measureImgSize(this.src)
  }
}
