'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.blob2File = void 0
const browser_js_1 = require('./browser.js')
/**
 * blob转File
 *
 * @export File
 * @param {Blob} blob blob
 * @param {String} name filename
 * @returns
 */
function blob2File(blob, name) {
  if (browser_js_1.isIE) {
    // IE不支持new File
    blob.lastModifiedDate = new Date()
    blob.name = name
    return blob
  } else {
    return new File([blob], name, { type: blob.type })
  }
}
exports.blob2File = blob2File
//# sourceMappingURL=file-convert.js.map
