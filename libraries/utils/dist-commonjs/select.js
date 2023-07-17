'use strict'
// @ts-nocheck
Object.defineProperty(exports, '__esModule', { value: true })
exports.clearSelected = exports.select = void 0
/**
 * @author GuangHui
 * @description 选中
 */
/**
 * 选中html元素中的文本
 *
 * @export
 * @param {HTMLElement} element 需要选中文本的元素节点
 * @returns
 */
function select(element) {
  if (!element) throw new Error('element为必填项')
  let selectedText
  if (element.nodeName === 'SELECT') {
    element.focus()
    selectedText = element.value
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    const isReadOnly = element.hasAttribute('readonly')
    if (!isReadOnly) element.setAttribute('readonly', '')
    element.select()
    element.setSelectionRange(0, element.value.length)
    if (!isReadOnly) {
      element.removeAttribute('readonly')
    }
    selectedText = element.value
  } else {
    if (element.hasAttribute('contenteditable')) element.focus()
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
    selectedText = selection.toString()
  }
  return selectedText
}
exports.select = select
/**
 * 清除所有选中
 *
 * @export
 */
function clearSelected() {
  window.getSelection() && window.getSelection().removeAllRanges()
}
exports.clearSelected = clearSelected
//# sourceMappingURL=select.js.map
