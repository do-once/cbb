'use strict'
/**
 * @author GuangHui
 * @description 浏览器判断
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.openInNewTabWithNoopenerInSafari =
  exports.openInNewTabWithoutOpener =
  exports.isFF =
  exports.isPhantomJS =
  exports.isChrome =
  exports.isIOS =
  exports.isAndroid =
  exports.isEdge =
  exports.isIE9 =
  exports.isIE =
  exports.inBrowser =
    void 0
exports.inBrowser = typeof window !== 'undefined'
const UA = exports.inBrowser && window.navigator.userAgent.toLowerCase()
exports.isIE = UA && /msie|trident/.test(UA)
exports.isIE9 = UA && UA.indexOf('msie 9.0') > 0
exports.isEdge = UA && UA.indexOf('edge/') > 0
exports.isAndroid = UA && UA.indexOf('android') > 0
exports.isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
exports.isChrome = UA && /chrome\/\d+/.test(UA) && !exports.isEdge
exports.isPhantomJS = UA && /phantomjs/.test(UA)
exports.isFF = UA && UA.match(/firefox\/(\d+)/)
/**
 * 使用noopener打开一个新标签页
 * https://juejin.im/post/5ecfc6b5f265da76d53c0c91
 */
function openInNewTabWithoutOpener(href) {
  if (typeof href !== 'string') return
  var newTab = window.open()
  newTab.opener = null
  newTab.location = href
}
exports.openInNewTabWithoutOpener = openInNewTabWithoutOpener
/**
 * 旧版本的Safari中,使用noopener打开一个新标签页
 * https://juejin.im/post/5ecfc6b5f265da76d53c0c91
 */
function openInNewTabWithNoopenerInSafari(href) {
  if (typeof href !== 'string') return
  const aTag = document.createElement('a')
  aTag.rel = 'noopener'
  aTag.target = '_blank'
  aTag.href = href
  aTag.click()
}
exports.openInNewTabWithNoopenerInSafari = openInNewTabWithNoopenerInSafari
//# sourceMappingURL=browser.js.map
