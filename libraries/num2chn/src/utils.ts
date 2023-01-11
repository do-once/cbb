/**
 * @author GuangHui
 * @description description
 */

export interface NumberParts {
  sign: string
  interger: string
  dot: string
  decimal: string
}

/**
 * 判断数字是否在安全范围内
 *
 * @export
 * @param {number} n  数字
 * @returns {boolean} 是否是安全数字
 */
export function isSafeNumber(n: number): boolean {
  return typeof n === 'number' && !isNaN(n) && Math.abs(n) < Math.pow(2, 53)
}

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
export function padStr(str: string, padNum: number, padChar: string, before = true) {
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

/**
 * 获取浮点数各组成部分
 *
 * @export
 * @param {number} n 待解析数字
 * @returns {(NumberParts | string)} 各组成部分
 */
export function getNumParts(n: number): NumberParts {
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
