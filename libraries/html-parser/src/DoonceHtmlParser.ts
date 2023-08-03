/**
 * @author GuangHui
 * @description DoonceHtmlParser 主体程序
 */

/** <         div       id="app"      >           hello   <           /                   div             >           */
/** TAG_OPEN  TAG_NAME  TAG_ATTR_TEXT TAG_CLOSE   TEXT    TAG_OPEN    TAG_SELF_CLOSEING   POST_TAG_NAME   TAG_CLOSE   */

export enum StateEnum {
  START = 'START' /** 初始状态 */,
  TAG_OPEN = 'TAG_OPEN' /** 标签开头< */,
  TAG_NAME = 'TAG_NAME' /** 标签名 */,
  TAG_ATTR_TEXT = 'TAG_ATTR_TEXT' /** 属性文本 */,
  TAG_SELF_CLOSEING = 'TAG_SELF_CLOSEING' /** 结束标签中的/ */,
  POST_TAG_NAME = 'POST_TAG_NAME' /** 结束标签名 */,
  TAG_CLOSE = 'TAG_CLOSE' /** 标签结尾> */,
  TEXT = 'TEXT' /** 标签内容 */,
  COMMENT = 'COMMENT' /** 注释信息 */
}

export type Token = {
  type: StateEnum
  startIndex: number /** 相对输入字符串的开始索引位置 */
  content: string /** 内容 */
}

export type AstNode = {
  nodeType: 'ELEMENT' | 'COMMENT' | 'TEXT' | 'ROOT'
  nodeName: string
  content: string
  attrText: string
  attrObj: Record<string, unknown>
  children: AstNode[]
}

export class DoonceHtmlParser {
  static State = StateEnum

  debug: boolean

  constructor({ debug } = {} as { debug?: boolean }) {
    this.debug = !!debug
  }

  /**
   * 解析输入的 html 字符串,返回 tokenList
   *
   * @date 2023-07-25 19:46:40
   * @param input 输入字符串
   * @returns {Token[]} tokenList
   * @memberof DoonceHtmlParser
   */
  parse(input: string): Token[] {
    if (!input || typeof input !== 'string') throw new Error('Input string is need provided')

    const tokenList: Token[] = []
    let curState: StateEnum = StateEnum.START
    let curChar = ''
    let curCharIndex = 0

    while ((curChar = input[curCharIndex])) {
      this.debug && console.log('-------------------------')
      this.debug && console.log('before :>> ', curState, curCharIndex, curChar)

      switch (curState) {
        case StateEnum.START:
          if (curChar === '<') {
            curState = StateEnum.TAG_OPEN
          } else {
            curState = StateEnum.TEXT

            /** 初始化 text Token,开始收集 text */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          }
          break

        case StateEnum.TAG_OPEN:
          if (isLetter(curChar)) {
            curState = StateEnum.TAG_NAME

            /** 初始化 tagName Token,开始收集 tagName */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else if (curChar === '/') {
            curState = StateEnum.TAG_SELF_CLOSEING
          } else if (curChar === '!') {
            curState = StateEnum.COMMENT

            /** 初始化 comment Token,开始收集 comment */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on StateEnum.${curState}`)
          }
          break

        case StateEnum.TAG_NAME:
          if (curChar === '>') {
            curState = StateEnum.TAG_CLOSE
          } else if (isWhiteSpace(curChar) && input[curCharIndex + 1] !== '/') {
            curState = StateEnum.TAG_ATTR_TEXT

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
            curState = StateEnum.TAG_SELF_CLOSEING
          } else {
            /** 收集 tagName */
            tokenList[tokenList.length - 1].content += curChar
          }
          break

        case StateEnum.TAG_ATTR_TEXT:
          if (curChar === '>') {
            curState = StateEnum.TAG_CLOSE
          } else if (
            /** 当前为/后面为>或空格*/
            curChar === '/' &&
            (input[curCharIndex + 1] === '>' || isWhiteSpace(input[curCharIndex + 1]))
          ) {
            curState = StateEnum.TAG_SELF_CLOSEING
          } else {
            /** 收集 tagAttrText */
            tokenList[tokenList.length - 1].content += curChar
          }
          break

        case StateEnum.TAG_SELF_CLOSEING:
          if (curChar === '>') {
            curState = StateEnum.TAG_CLOSE

            /** 兼容自闭合标签场景,添加一个与最后 tagName 对应的selfCloseing 对象 */
            const lastMatchedTagNameObj = this._findLastMatchedTagNameObj(tokenList)
            if (lastMatchedTagNameObj && lastMatchedTagNameObj.content) {
              tokenList.push({
                type: StateEnum.TAG_SELF_CLOSEING,
                content: lastMatchedTagNameObj.content,
                startIndex: curCharIndex
              })
            }
          } else if (isLetter(curChar)) {
            curState = StateEnum.POST_TAG_NAME

            /** 初始化 postTagName Token,开始收集 postTagName */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on StateEnum.${curState}`)
          }
          break

        case StateEnum.POST_TAG_NAME:
          if (curChar === '>') {
            curState = StateEnum.TAG_CLOSE
          } else {
            /** 收集postTagName */
            tokenList[tokenList.length - 1].content += curChar
          }
          break

        case StateEnum.TAG_CLOSE:
          if (curChar === '<') {
            curState = StateEnum.TAG_OPEN
          } else if (curChar) {
            curState = StateEnum.TEXT

            /** 初始化 text Token,开始收集 text */
            tokenList.push({
              type: curState,
              startIndex: curCharIndex,
              content: curChar
            })
          } else {
            //! should never access
            this.debug && console.warn(`Unrecognized char:${curChar} on StateEnum.${curState}`)
          }
          break

        case StateEnum.COMMENT:
          if (curChar === '>') {
            curState = StateEnum.TAG_CLOSE
          } else {
            /** 收集 comment */
            tokenList[tokenList.length - 1].content += curChar
          }
          break

        case StateEnum.TEXT:
          if (
            /** 当前为< && 后续字符中有 > && <到首个>之间无其它<,则进入 TAG_OPEN 状态 */
            curChar === '<' &&
            this._hasLessThanSymbolBetweenStartIndexAndFirstGreatThanSymbolIndex(input, curCharIndex)
          ) {
            curState = StateEnum.TAG_OPEN
          } else {
            /** 收集 text */
            tokenList[tokenList.length - 1].content += curChar
          }
          break

        default:
          const _ec: never = curState
          throw new Error(`${_ec} should not reach here`)
      }

      this.debug && console.log('after :>> ', curState)

      curCharIndex++
    }

    this.debug && console.log('parse before input :>> ', input)
    this.debug && console.log('parse after tokenList :>> ', tokenList)

    return tokenList
  }

  /**
   * 将 tokenList 解析为 ast
   *
   * @date 2023-07-25 19:45:49
   * @private
   * @param tokenList
   * @returns {AstNode} ast对象
   * @memberof DoonceHtmlParser
   */
  parseTokenListToAst(tokenList: Token[]) {
    const nodeStack: AstNode[] = [
      {
        nodeType: 'ROOT',
        nodeName: '',
        content: '',
        attrText: '',
        attrObj: {},
        children: []
      }
    ]

    for (let i = 0; i < tokenList.length; i++) {
      const { type, content } = tokenList[i]

      if (type === StateEnum.TAG_NAME) {
        nodeStack.push({
          nodeType: 'ELEMENT',
          nodeName: content,
          content: '',
          attrText: '',
          attrObj: {},
          children: []
        })
      } else if (type === StateEnum.TEXT) {
        nodeStack[nodeStack.length - 1].children.push({
          nodeType: 'TEXT',
          nodeName: '',
          content,
          attrText: '',
          attrObj: {},
          children: []
        })
      } else if (type === StateEnum.TAG_ATTR_TEXT) {
        const node = nodeStack[nodeStack.length - 1]
        node.attrText = content

        node.attrObj = parseAttrTextToObj(content)
      } else if (type === StateEnum.COMMENT) {
        nodeStack[nodeStack.length - 1].children.push({
          nodeType: 'COMMENT',
          nodeName: '',
          content,
          attrText: '',
          attrObj: {},
          children: []
        })
      } else if (type === StateEnum.POST_TAG_NAME || type === StateEnum.TAG_SELF_CLOSEING) {
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
   * @returns {Token} TAG_NAME 对象
   * @memberof DoonceHtmlParser
   */
  private _findLastMatchedTagNameObj(tokenList: Token[]) {
    return tokenList
      .slice()
      .reverse()
      .find(token => token.type === StateEnum.TAG_NAME)
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
  private _hasLessThanSymbolBetweenStartIndexAndFirstGreatThanSymbolIndex(input: string, startIndex: number) {
    const afterStartIndexStr = input.slice(startIndex + 1)
    const firstGreatThanSymbolIndex = afterStartIndexStr.indexOf('>')

    if (firstGreatThanSymbolIndex === -1) return false

    return afterStartIndexStr.slice(0, firstGreatThanSymbolIndex).indexOf('<') === -1
  }
}

/**
 * 将 attrText 解析为对象
 *
 * @date 2023-07-26 10:08:25
 * @export
 * @param attrText
 * @returns {Record<string,string>}
 */
export function parseAttrTextToObj(attrText: string): Record<string, string> {
  if (typeof attrText !== 'string') return {}

  const attributeRegex = /(\S+)=["']?([^"'\s]+(?:\s+[^"'\s]+)*)["']?/g
  const attributes: Record<string, string> = {}

  let match
  while ((match = attributeRegex.exec(attrText)) !== null) {
    const attributeName = match[1]
    const attributeValue = match[2]

    attributes[attributeName] = attributeValue
  }

  return attributes
}

/**
 * 提取 htmlComment 中的内容
 *
 * @date 2023-07-09 04:30:03
 * @export
 * @param htmlComment html 注释
 * @returns {string} 内容
 */
export function extractHtmlCommentContent(htmlComment: string) {
  const reg = /!--(.+?)--/

  if (!reg.test(htmlComment)) return htmlComment

  return htmlComment.match(reg)![1]
}

/**
 * 是否英文字母
 *
 * @date 2023-07-09 01:19:52
 * @export
 * @param char
 * @returns {boolean} 是否英文字母
 */
export function isLetter(char: string) {
  return /^[a-zA-Z]$/.test(char)
}

/**
 * 是否空白字符
 *
 * @date 2023-07-09 01:19:23
 * @export
 * @param char
 * @returns {boolean} 是否空白字符
 */
export function isWhiteSpace(char: string) {
  return /^\s+$/.test(char)
}
