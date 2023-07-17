'use strict'
/**
 * @author GuangHui
 * @description 获取scrollbar 宽度
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.getScrollbarWidth = void 0
const getScrollbarWidth = () => {
  if (exports.getScrollbarWidth.scrollBarWidth != null) return exports.getScrollbarWidth.scrollBarWidth
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  const scrollBarWidth = widthNoScroll - widthWithScroll
  exports.getScrollbarWidth.scrollBarWidth = scrollBarWidth
  return scrollBarWidth
}
exports.getScrollbarWidth = getScrollbarWidth
//# sourceMappingURL=scrollbar-width.js.map
