/**
 * @author GuangHui
 * @description 手动换行
 */

import { Base, IRow, ISize, LayoutItemTypeEnum } from '../base'

export type CRLFCtrOptions = {
  debug?: boolean
  because: string /** 手动换行原因 */
  rowNo: IRow['rowNo']
}

export class CRLF extends Base implements IRow {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.CRLF
  canLineBreak: boolean = false

  debug = false

  because: string

  rowNo: IRow['rowNo']

  constructor({ debug, because, rowNo }: CRLFCtrOptions) {
    super()

    this.debug = !!debug
    this.because = because

    this.rowNo = rowNo
  }

  async init(force = false) {
    /** 已经初始化,并不是强制初始化,则跳过 */
    if (this.initialized && !force) return

    this.initialized = true
  }

  measureSize(): ISize {
    return {
      width: 0,
      height: 0
    }
  }
}
