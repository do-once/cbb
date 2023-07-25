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
    TAG_ATTR_TEXT: 'TAG_ATTR_TEXT',
    TAG_SELF_CLOSEING: 'TAG_SELF_CLOSEING',
    POST_TAG_NAME: 'POST_TAG_NAME',
    TAG_CLOSE: 'TAG_CLOSE',
    TEXT: 'TEXT',
    COMMENT: 'COMMENT'
  }
  debug
  constructor({ debug }) {
    this.debug = !!debug
  }
  /**
   * 解析输入的 html 字符串,返回 tokenList
   *
   * @date 2023-07-25 19:46:40
   * @param input
   * @returns {IToken[]} tokenList
   * @memberof DoonceHtmlParser
   */
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
            curState = DoonceHtmlParser.State.TAG_ATTR_TEXT
            /** 初始化 tagAttrText Token,开始收集 tagAttrText */
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
        case DoonceHtmlParser.State.TAG_ATTR_TEXT:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
          } else if (
            /** 当前为/后面为>或空格*/
            curChar === '/' &&
            (input[curCharIndex + 1] === '>' || isWhiteSpace(input[curCharIndex + 1]))
          ) {
            curState = DoonceHtmlParser.State.TAG_SELF_CLOSEING
          } else {
            /** 收集 tagAttrText */
            tokenList[tokenList.length - 1].content += curChar
          }
          break
        case DoonceHtmlParser.State.TAG_SELF_CLOSEING:
          if (curChar === '>') {
            curState = DoonceHtmlParser.State.TAG_CLOSE
            /** 兼容自闭合标签场景,添加一个与最后 tagName 对应的selfCloseing 对象 */
            const lastMatchedTagNameObj = this._findLastMatchedTagNameObj(tokenList)
            if (lastMatchedTagNameObj && lastMatchedTagNameObj.content) {
              tokenList.push({
                type: DoonceHtmlParser.State.TAG_SELF_CLOSEING,
                content: lastMatchedTagNameObj.content,
                startIndex: curCharIndex
              })
            }
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
    this.debug && console.log('normalize before input :>> ', input)
    this.debug && console.log('normalize after tokenList :>> ', tokenList)
    return tokenList
  }
  /**
   * 将 tokenList 解析为 ast
   *
   * @date 2023-07-25 19:45:49
   * @private
   * @param tokenList
   * @returns {IAstNode} ast对象
   * @memberof DoonceHtmlParser
   */
  parseTokenListToAst(tokenList) {
    const nodeStack = [
      {
        nodeType: 'ROOT',
        nodeName: '',
        content: '',
        attrText: '',
        children: []
      }
    ]
    for (let i = 0; i < tokenList.length; i++) {
      const { type, content } = tokenList[i]
      if (type === DoonceHtmlParser.State.TAG_NAME) {
        nodeStack.push({
          nodeType: 'ELEMENT',
          nodeName: content,
          content: '',
          attrText: '',
          children: []
        })
      } else if (type === DoonceHtmlParser.State.TEXT) {
        nodeStack[nodeStack.length - 1].children.push({
          nodeType: 'TEXT',
          nodeName: '',
          content,
          attrText: '',
          children: []
        })
      } else if (type === DoonceHtmlParser.State.TAG_ATTR_TEXT) {
        nodeStack[nodeStack.length - 1].attrText = content
      } else if (type === DoonceHtmlParser.State.COMMENT) {
        nodeStack[nodeStack.length - 1].children.push({
          nodeType: 'COMMENT',
          nodeName: '',
          content,
          attrText: '',
          children: []
        })
      } else if (
        type === DoonceHtmlParser.State.POST_TAG_NAME ||
        type === DoonceHtmlParser.State.TAG_SELF_CLOSEING
      ) {
        if (content === nodeStack[nodeStack.length - 1].nodeName) {
          const obj = nodeStack.pop()
          obj && nodeStack[nodeStack.length - 1].children.push(obj)
        }
      } else {
        // ! should never access
        this.debug && console.warn('should never access')
      }
    }
    this.debug && console.log('nodeStack :>> ', JSON.stringify(nodeStack, null, 2))
    return nodeStack[0]
  }
  /**
   * 找到 tokenList 中最后一个 TAG_NAME 对象
   *
   * @date 2023-07-25 19:40:18
   * @private
   * @param tokenList
   * @returns {IToken} TAG_NAME 对象
   * @memberof DoonceHtmlParser
   */
  _findLastMatchedTagNameObj(tokenList) {
    return tokenList
      .slice()
      .reverse()
      .find(token => token.type === DoonceHtmlParser.State.TAG_NAME)
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
  return /^\s+$/.test(char)
}
exports.isWhiteSpace = isWhiteSpace
//# sourceMappingURL=DoonceHtmlParser.js.map
