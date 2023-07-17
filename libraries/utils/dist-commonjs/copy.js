'use strict'
/**
 * @author GuangHui
 * @description 拷贝文本到剪切板
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.copyTextToClipboard = void 0
const select_1 = require('./select')
/**
 * 拷贝文本到剪切板中
 *
 * @export
 * @param {string} text 需要复制的文本
 * @returns
 */
function copyTextToClipboard(text) {
  return new Promise((resolve, reject) => {
    if (typeof text !== 'string') throw new Error('text必须为string类型')
    let fakeEl = _genFakeCopyEl(text)
    document.body.appendChild(fakeEl)
    // eslint-disable-next-line
    const selectedText = (0, select_1.select)(fakeEl)
    try {
      document.execCommand('copy')
    } catch (err) {
      return reject(err)
    }
    document.body.removeChild(fakeEl)
    fakeEl = null
    resolve(selectedText)
  })
}
exports.copyTextToClipboard = copyTextToClipboard
/**
 * 生成辅助拷贝文本的textarea
 *
 * @param {String} text 需要拷贝的文本
 */
function _genFakeCopyEl(text) {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl'
  const fakeEl = document.createElement('textarea')
  // Prevent zooming on iOS
  fakeEl.style.fontSize = '12pt'
  // Reset box model
  fakeEl.style.border = '0'
  fakeEl.style.padding = '0'
  fakeEl.style.margin = '0'
  // Move element out of screen horizontally
  fakeEl.style.position = 'absolute'
  fakeEl.style[isRTL ? 'right' : 'left'] = '-9999px'
  // Move element to the same position vertically
  const yPosition = window.pageYOffset || document.documentElement.scrollTop
  fakeEl.style.top = `${yPosition}px`
  fakeEl.setAttribute('readonly', '')
  fakeEl.value = text
  return fakeEl
}
//# sourceMappingURL=copy.js.map
