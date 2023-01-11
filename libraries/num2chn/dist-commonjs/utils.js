'use strict'
/**
 * @author GuangHui
 * @description description
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.getNumParts = exports.padStr = exports.isSafeNumber = void 0
/**
 * 判断数字是否在安全范围内
 *
 * @export
 * @param {number} n  数字
 * @returns {boolean} 是否是安全数字
 */
function isSafeNumber(n) {
  return typeof n === 'number' && !isNaN(n) && Math.abs(n) < Math.pow(2, 53)
}
exports.isSafeNumber = isSafeNumber
/**
 * 填充字符串
 *
 * @export
 * @param {string} str 原始字符串
 * @param {number} padNum 填充数量
 * @param {string} padChar 填充字符
 * @param {boolean} [before=true] 前填充
 * @returns 填充后的字符串
 */
function padStr(str, padNum, padChar, before = true) {
  if (
    typeof str !== 'string' ||
    typeof padNum !== 'number' ||
    isNaN(padNum) ||
    padNum <= 0 ||
    typeof padChar !== 'string'
  ) {
    return str
  }
  while (padNum) {
    if (before) {
      str = padChar + str
    } else {
      str += padChar
    }
    padNum--
  }
  return str
}
exports.padStr = padStr
/**
 * 获取浮点数各组成部分
 *
 * @export
 * @param {number} n 待解析数字
 * @returns {(NumberParts | string)} 各组成部分
 */
function getNumParts(n) {
  const num = Number(n)
  const reg = /^([-+]?)(0|[1-9]\d*)(\.?)(\d*)$/
  const numStr = String(num)
  const ret = reg.exec(numStr)
  if (!isSafeNumber(num) || ret == null) throw new Error('无法解析')
  const { 1: sign, 2: interger, 3: dot, 4: decimal } = ret
  return {
    sign,
    interger,
    dot,
    decimal
  }
}
exports.getNumParts = getNumParts
//# sourceMappingURL=utils.js.map
