'use strict'
/**
 * @author GuangHui
 * @description DoonceHtmlParser 主体程序
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.isWhiteSpace =
  exports.isLetter =
  exports.extractHtmlCommentContent =
  exports.DoonceHtmlParser =
    void 0
class DoonceHtmlParser {
  static State = {
    START: 'START',
    TAG_OPEN: 'TAG_OPEN',
    TAG_NAME: 'TAG_NAME',
    TAG_ATTR_NAME: 'TAG_ATTR_NAME',
    TAG_ATTR_NAME_VALUE_SPLIT: 'TAG_ATTR_NAME_VALUE_SPLIT',
    TAG_ATTR_PRE_DOUBLE_QUOTE: 'TAG_ATTR_PRE_DOUBLE_QUOTE',
    TAG_ATTR_VALUE: 'TAG_ATTR_VALUE',
    TAG_ATTR_POST_DOUBLE_QUOTE: 'TAG_ATTR_POST_DOUBLE_QUOTE',
    TAG_ATTR_SPLIT: 'TAG_ATTR_SPLIT',
    TAG_SELF_CLOSEING: 'TAG_SELF_CLOSEING',
    POST_TAG_NAME: 'POST_TAG_NAME',
    TAG_CLOSE: 'TAG_CLOSE',
    TEXT: 'TEXT',
    COMMENT: 'COMMENT'
  }
  debug
  constructor(debug) {
    this.debug = !!debug
  }
  parse(input) {
    if (!input || typeof input !== 'string') throw new Error('Input string is need provided')
    const tokenList = []
    let curState = DoonceHtmlParser.State.START
    let curChar = ''
    let curCharIndex = 0
    while ((curChar = input[curCharIndex])) {
      this.debug && console.log('-------------------------')
      this.debug && console.log('before :>> ', curState, curCharIndex, curChar)
      switch (curState) {
        case DoonceHtmlParser.State.START:
          if (curChar === '<') {
            curState = DoonceHtmlParser.State.TAG_OPEN
          } else {
            curState = DoonceHtmlParser.State.TEXT
            /** 初始化 text Token,开始收集 text */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          }
          break
        case DoonceHtmlParser.State.TAG_OPEN:
          if (isLetter(curChar)) {
            curState = DoonceHtmlParser.State.TAG_NAME
            /** 初始化 tagName Token,开始收集 tagName */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else if (curChar === '/') {
            curState = DoonceHtmlParser.State.TAG_SELF_CLOSEING
          } else if (curChar === '!') {
            curState = DoonceHtmlParser.State.COMMENT
            /** 初始化 comment Token,开始收集 comment */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on DoonceHtmlParser.State.${curState}`)
          }
          break
        case DoonceHtmlParser.State.TAG_NAME:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
          } else if (isWhiteSpace(curChar) && input[curCharIndex + 1] !== '/') {
            curState = DoonceHtmlParser.State.TAG_ATTR_NAME
            /** 初始化 tagAttrName Token,开始收集 tagAttrName */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else if (
            /** 兼容类似<br/>情况 */
            curChar === '/' ||
            /** 兼容类似<br />情况 */
            (isWhiteSpace(curChar) && input[curCharIndex + 1] === '/')
          ) {
            curState = DoonceHtmlParser.State.TAG_SELF_CLOSEING
          } else {
            /** 收集 tagName */
            tokenList[tokenList.length - 1].content += curChar
          }
          break
        case DoonceHtmlParser.State.TAG_ATTR_NAME:
          if (curChar === '=') {
            curState = DoonceHtmlParser.State.TAG_ATTR_NAME_VALUE_SPLIT
          } else if (
            /** 兼容 tagAttrName 后无 tagAttrValue 声明场景,例如<div jjj>xxx</div>*/
            curChar === '>'
          ) {
            curState = DoonceHtmlParser.State.TAG_CLOSE
            // ! 此种特殊场景,会导致有 tagAttrName 无 tagAttrValue
            // ! 为了兼容给 attrValue 塞一个空值,保证 tagAttrName 和 tagAttrValue 是成对出现
            // ! 上面的兼容是否有意义?类似<input type="check" disabled>中的 disabled 本身没声明值,却硬塞入一个 tagAttrValue 反而容易产生混淆
            // ! 基于上面分析,此场景暂不处理
            // ! 下面代码为之前兼容代码
            // tokenList.push({
            //   type: DoonceHtmlParser.State.TAG_ATTR_VALUE,
            //   startIndex: -1,
            //   content: ''
            // })
          } else if (isWhiteSpace(curChar)) {
            curState = DoonceHtmlParser.State.TAG_ATTR_SPLIT
          } else {
            /** 收集 tagAttrName */
            tokenList[tokenList.length - 1].content += curChar
          }
          break
        case DoonceHtmlParser.State.TAG_ATTR_NAME_VALUE_SPLIT:
          if (curChar === '"') {
            curState = DoonceHtmlParser.State.TAG_ATTR_PRE_DOUBLE_QUOTE
          }
          break
        case DoonceHtmlParser.State.TAG_ATTR_PRE_DOUBLE_QUOTE:
          if (curChar !== '"') {
            curState = DoonceHtmlParser.State.TAG_ATTR_VALUE
            /** 初始化 tagAttrValue Token,开始收集 tagAttrValue */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else if (
            /** 兼容 tagAttrValue 空值场景,例如 <link mask="" xxxxx>此时的双引号要区分 pre 和 post */
            curChar === '"' &&
            input[curCharIndex - 1] === '"'
          ) {
            curState = DoonceHtmlParser.State.TAG_ATTR_POST_DOUBLE_QUOTE
            // ! 此种特殊场景,会导致有 tagAttrName 无 tagAttrValue
            // ! 其实已经声明了值,只不过值是空字符串
            // ! 为了兼容给 attrValue 塞一个空字符串
            tokenList.push({
              type: DoonceHtmlParser.State.TAG_ATTR_VALUE,
              startIndex: -1 /** 空字符串,无法确定位置,所以给个-1 */,
              content: ''
            })
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on DoonceHtmlParser.State.${curState}`)
          }
          break
        case DoonceHtmlParser.State.TAG_ATTR_VALUE:
          /** attr 值的后分隔双引号 */
          if (curChar === '"' && input[curCharIndex - 1] !== '\\') {
            curState = DoonceHtmlParser.State.TAG_ATTR_POST_DOUBLE_QUOTE
          } else {
            /** 收集 tagAttrValue */
            tokenList[tokenList.length - 1].content += curChar
          }
          break
        case DoonceHtmlParser.State.TAG_ATTR_POST_DOUBLE_QUOTE:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
          } else if (curChar === '/') {
            curState = DoonceHtmlParser.State.TAG_SELF_CLOSEING
          } else if (isWhiteSpace(curChar)) {
            curState = DoonceHtmlParser.State.TAG_ATTR_SPLIT
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on DoonceHtmlParser.State.${curState}`)
          }
          break
        case DoonceHtmlParser.State.TAG_ATTR_SPLIT:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
          } else if (curChar === '/') {
            curState = DoonceHtmlParser.State.TAG_SELF_CLOSEING
          } else if (!isWhiteSpace(curChar)) {
            curState = DoonceHtmlParser.State.TAG_ATTR_NAME
            /** 初始化 tagAttrName Token,开始收集 tagAttrName */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else {
            /** 连续空格 */
            this.debug && console.warn('Multiple consecutive spaces on DoonceHtmlParser.State.TAG_ATTR_SPLIT')
          }
          break
        case DoonceHtmlParser.State.TAG_SELF_CLOSEING:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
          } else if (isLetter(curChar)) {
            curState = DoonceHtmlParser.State.POST_TAG_NAME
            /** 初始化 postTagName Token,开始收集 postTagName */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on DoonceHtmlParser.State.${curState}`)
          }
          break
        case DoonceHtmlParser.State.POST_TAG_NAME:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
          } else {
            /** 收集postTagName */
            tokenList[tokenList.length - 1].content += curChar
          }
          break
        case DoonceHtmlParser.State.TAG_CLOSE:
          if (curChar === '<') {
            curState = DoonceHtmlParser.State.TAG_OPEN
          } else if (curChar) {
            curState = DoonceHtmlParser.State.TEXT
            /** 初始化 text Token,开始收集 text */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on DoonceHtmlParser.State.${curState}`)
          }
          break
        case DoonceHtmlParser.State.COMMENT:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
          } else {
            /** 收集 comment */
            tokenList[tokenList.length - 1].content += curChar
          }
          break
        case DoonceHtmlParser.State.TEXT:
          if (
            /** 当前为< && 后续字符中有 > && <到首个>之间无其它<,则进入 TAG_OPEN 状态 */
            curChar === '<' &&
            this._hasLessThanSymbolBetweenStartIndexAndFirstGreatThanSymbolIndex(input, curCharIndex)
          ) {
            curState = DoonceHtmlParser.State.TAG_OPEN
          } else {
            /** 收集 text */
            tokenList[tokenList.length - 1].content += curChar
          }
          break
      }
      this.debug && console.log('after :>> ', curState)
      curCharIndex++
    }
    /** 对TAG_ATTR_NAME做 trim 操作 */
    tokenList
      .filter(item => item.type === DoonceHtmlParser.State.TAG_ATTR_NAME)
      .forEach(item => {
        item._originContent = item.content
        item.content = item.content.trim()
        item._contentModifyType = 'trim'
      })
    /** 对 COMMENT 做提取 */
    tokenList
      .filter(item => item.type === DoonceHtmlParser.State.COMMENT)
      .forEach(item => {
        item._originContent = item.content
        item.content = extractHtmlCommentContent(item.content)
        item._contentModifyType = 'extractHtmlCommentContent'
      })
    this.debug && console.log('normalize after tokenList :>> ', tokenList)
    return tokenList
  }
  /**
   * 给定字符串,从给定位置到首个>符号之前,是否存在<符号
   *
   * @date 2023-07-09 01:22:43
   * @private
   * @param input 输入字符串
   * @param startIndex <字符起始索引
   * @returns {boolean} 是否从 TEXT 转换为 TAG_OPEN 状态
   * @memberof DoonceHtmlParser
   */
  _hasLessThanSymbolBetweenStartIndexAndFirstGreatThanSymbolIndex(input, startIndex) {
    const afterStartIndexStr = input.slice(startIndex + 1)
    const firstGreatThanSymbolIndex = afterStartIndexStr.indexOf('>')
    if (firstGreatThanSymbolIndex === -1) return false
    return afterStartIndexStr.slice(0, firstGreatThanSymbolIndex).indexOf('<') === -1
  }
}
exports.DoonceHtmlParser = DoonceHtmlParser
/**
 * 提取 htmlComment 中的内容
 *
 * @date 2023-07-09 04:30:03
 * @export
 * @param htmlComment html 注释
 * @returns {string} 内容
 */
function extractHtmlCommentContent(htmlComment) {
  const reg = /!--(.+?)--/
  if (!reg.test(htmlComment)) return htmlComment
  return htmlComment.match(reg)[1]
}
exports.extractHtmlCommentContent = extractHtmlCommentContent
/**
 * 是否英文字母
 *
 * @date 2023-07-09 01:19:52
 * @export
 * @param char
 * @returns {boolean} 是否英文字母
 */
function isLetter(char) {
  return /^[a-zA-Z]$/.test(char)
}
exports.isLetter = isLetter
/**
 * 是否空白字符
 *
 * @date 2023-07-09 01:19:23
 * @export
 * @param char
 * @returns {boolean} 是否空白字符
 */
function isWhiteSpace(char) {
  return /^\s$/.test(char)
}
exports.isWhiteSpace = isWhiteSpace
//# sourceMappingURL=DoonceHtmlParser.js.map
