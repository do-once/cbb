/**
 * @author GuangHui
 * @description 图片类,应包含图片本身 Graph+图片的标题GraphTitle,GraphTitle总是在Graph 下方
 */

import { Base, IChild, ISize, IImgSurround, LayoutItemTypeEnum, ImgSurrounTypeEnum } from '../base'
import { Graph, GraphTitle } from './'

/** 限制 Img 的 child 类型 */
export type ImgChildsTuple = [Graph, GraphTitle] | [Graph]

export class Img extends Base implements IChild, IImgSurround {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.IMG
  canLineBreak: boolean = false

  childs: ImgChildsTuple

  imgSurroundType: ImgSurrounTypeEnum = ImgSurrounTypeEnum.NONE

  constructor(childs: ImgChildsTuple) {
    super()

    this.childs = childs
  }

  haveTitle() {
    return this.childs.length > 1
  }

  measureSize(): ISize {
    const [graph, graphTitle] = this.childs

    const width = graphTitle ? Math.max(graph.width, graphTitle.width) : graph.width
    const height = graphTitle ? graph.height + graphTitle.height : graph.height

    return {
      width,
      height
    }
  }
}
