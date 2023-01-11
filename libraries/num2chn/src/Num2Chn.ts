/**
 * @author GuangHui
 * @description description
 */

import { isSafeNumber, padStr, getNumParts } from './utils'

export interface Options {
  unitChars?: string[]
  sectionUnitChars?: string[]
  numChars?: string[]
  dotChar?: string
  signChar?: string
}

export default class DoonceNum2chn {
  private unitChars: string[]
  private sectionUnitChars: string[]
  private numChars: string[]
  private dotChar: string
  private signChar: string

  constructor(options: Options = {}) {
    const { unitChars, sectionUnitChars, numChars, dotChar, signChar } = options

    this.unitChars = unitChars || ['', '十', '百', '千'] // 节内权位
    this.sectionUnitChars = sectionUnitChars || ['', '万', '亿', '万亿', '亿亿'] // 节权位
    this.numChars = numChars || ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // 数字映射表
    this.dotChar = dotChar || '点'
    this.signChar = signChar || '负'
  }

  /**
   * 获取数字对应中文
   *
   * @param {number} n 数字
   * @returns {string} 数字对应中文
   * @memberof Num2Chn
   */
  getNumChar(n: number): string {
    if (typeof n !== 'number' || isNaN(n)) return ''

    return this.numChars[n]
  }

  /**
   * 获取节内权位
   *
   * @param {number} i 索引
   * @returns {string} 对应中文
   * @memberof Num2Chn
   */
  getUnitChar(i: number): string {
    return this.unitChars[i]
  }

  /**
   * 获取节权位
   *
   * @param {number} i 索引
   * @returns {string} 对应中文
   * @memberof Num2Chn
   */
  getSectionUnitChar(i: number): string {
    return this.sectionUnitChars[i]
  }

  /**
   * 获取点号对应中文
   *
   * @param {string} dotPart 点号部分
   * @returns {string} 点号对应中文
   * @memberof Num2Chn
   */
  getDotPartChn(dotPart: string): string {
    if (typeof dotPart !== 'string') return '无法解析'
    return dotPart === '.' ? this.dotChar : ''
  }

  /**
   * 获取符号对应中文
   *
   * @param {string} signPart 符号部分
   * @returns {string} 符号对应中文
   * @memberof Num2Chn
   */
  getSignPartChn(signPart: string): string {
    if (typeof signPart !== 'string') return '无法解析'
    return signPart === '-' ? this.signChar : ''
  }

  /**
   * 获取小数部分的中文表示
   *
   * @param {(number | string)} n 小数部分
   * @returns {string} 小数部分的中文表示
   * @memberof Num2Chn
   */
  getDecimalPartChn(n: number | string): string {
    if (!isSafeNumber(Number(n)) || typeof n !== 'string') {
      return '参数为无法解析'
    }

    return String(n)
      .split('')
      .map(item => this.getNumChar(Number(item)))
      .join('')
  }

  /**
   * 获取整数部分小节
   *
   * @param {(number | string)} n 整数
   * @returns {number[]} 小节数组
   * @memberof Num2Chn
   */
  getIntergerSections(n: number | string): number[] {
    let num = Number(n)

    if (!isSafeNumber(num) || num < 0) throw new Error('参数无法解析或小于0')

    if (num === 0) return [0]

    let temp = []

    while (num > 0) {
      temp.push(num % 10000)
      num = Math.floor(num / 10000)
    }
    return temp.reverse()
  }

  /**
   * 翻译小节
   *
   * @param {(number|string)} section 4位长度的小节
   * @returns {string} 小节对应中文
   * @memberof Num2Chn
   */
  getSectionsChn(section: number | string): string {
    let num = Number(section)
    if (!isSafeNumber(num) || num >= 10000 || num < 0) {
      return '节无法解析成数字或位数超过4位或小于0'
    }

    let str = ''
    let needPadStartZero = false
    let unitCount = 0

    while (num > 0) {
      let g = num % 10 // 取个位数
      if (g === 0) {
        if (needPadStartZero) {
          needPadStartZero = false // 当前为0，已经补过零，下次若还为0则不需补
          str = padStr(str, 1, this.getNumChar(0))
        }
      } else {
        // 当前数不为0，默认下次为0，需要进行补零操作。
        needPadStartZero = true
        str = this.getNumChar(g) + this.getUnitChar(unitCount) + str
      }

      unitCount++
      num = Math.floor(num / 10)
    }

    return str
  }

  /**
   * 获取整数部分对应中文
   *
   * @param {(number|string)} intergerPart 整数部分
   * @returns {string} 整数部分对应中文
   * @memberof Num2Chn
   */
  getIntergetPartChn(intergerPart: number | string): string {
    const originNum = Number(intergerPart)
    if (!isSafeNumber(originNum) || originNum < 0) {
      return '无法解析成数字或超出范围或不是正数'
    }

    if (originNum === 0) return this.getNumChar(0)

    const sectionsArr = this.getIntergerSections(originNum)

    const transformedSectionsArr = sectionsArr
      .reverse() // 翻转小节，从最后一个小节开始翻译
      .reduce((acc: any[], cur, index, arr) => {
        if (cur === 0) return acc

        // 非首小节并小于1000的需要前补零
        let sectionChn =
          index !== arr.length - 1 && cur < 1000
            ? padStr(this.getSectionsChn(cur), 1, this.getNumChar(0))
            : this.getSectionsChn(cur)

        // 处理首小节为10~19的特殊场景
        // 一十一，需要转换成十一
        if (index === arr.length - 1 && cur >= 10 && cur < 20) {
          sectionChn = sectionChn.replace(/^一/, '')
        }

        sectionChn += this.getSectionUnitChar(index)

        return acc.concat(sectionChn)
      }, [])

    return transformedSectionsArr.reverse().join('')
  }

  /**
   * 浮点数转中文数字
   *
   * @export
   * @param {(number | string)} n 需要转换的数字
   * @returns {string} 数字对应中文
   */
  transform(n: number | string): string {
    const num = Number(n)

    if (!isSafeNumber(num)) return '无法解析成数字或超出范围'

    const { sign, interger, dot, decimal } = getNumParts(num)

    const signChn = sign ? this.getSignPartChn(sign) : ''

    const intergerChn = this.getIntergetPartChn(interger)

    const dotChn = dot ? this.getDotPartChn(dot) : ''

    const decimalChn = decimal ? this.getDecimalPartChn(decimal) : ''

    return `${signChn}${intergerChn}${dotChn}${decimalChn}`
  }
}
