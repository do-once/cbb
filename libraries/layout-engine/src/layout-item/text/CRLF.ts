/**
 * @author GuangHui
 * @description 手动换行
 */

import { Base, IContent, ISize, LayoutItemTypeEnum } from '../base'

export type CRLFCtrParams = {
  debug?: boolean
  rawContent?: string
}

export class CRLF extends Base {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.CRLF
  canLineBreak: boolean = false

  debug = false

  constructor({ debug } = {} as CRLFCtrParams) {
    super()

    this.debug = !!debug
  }

  async init() {}

  measureSize(): ISize {
    return {
      width: 0,
      height: 0
    }
  }
}
