'use strict'
/**
 * @author GuangHui
 * @description 手动换行
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.CRLF = void 0
const base_1 = require('../base')
class CRLF extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.CRLF
  canLineBreak = false
  debug = false
  because
  rowNo
  constructor({ debug, because, rowNo }) {
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
  measureSize() {
    return {
      width: 0,
      height: 0
    }
  }
}
exports.CRLF = CRLF
//# sourceMappingURL=CRLF.js.map
