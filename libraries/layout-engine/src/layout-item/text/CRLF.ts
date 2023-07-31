/**
 * @author GuangHui
 * @description 手动换行
 */

import { Base, ISize, LayoutItemTypeEnum } from '../base'

export type CRLFCtrOptions = {
  debug?: boolean
}

export class CRLF extends Base {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.CRLF
  canLineBreak: boolean = false

  debug = false

  constructor({ debug } = {} as CRLFCtrOptions) {
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
