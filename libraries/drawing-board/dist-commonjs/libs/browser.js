'use strict'
/**
 * @author GuangHui
 * @description 浏览器判断
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.isIE = exports.UA = exports.inBrowser = void 0
exports.inBrowser = typeof window !== 'undefined'
exports.UA = exports.inBrowser ? window.navigator.userAgent.toLowerCase() : ''
exports.isIE = exports.UA ? /msie|trident/.test(exports.UA) : false
//# sourceMappingURL=browser.js.map
