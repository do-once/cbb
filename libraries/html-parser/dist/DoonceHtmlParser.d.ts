/**
 * @author GuangHui
 * @description DoonceHtmlParser 主体程序
 */
/** <         div       id="app"      >           hello   <           /                   div             >           */
/** TAG_OPEN  TAG_NAME  TAG_ATTR_TEXT TAG_CLOSE   TEXT    TAG_OPEN    TAG_SELF_CLOSEING   POST_TAG_NAME   TAG_CLOSE   */
export declare enum StateEnum {
    START = "START" /** 初始状态 */,
    TAG_OPEN = "TAG_OPEN" /** 标签开头< */,
    TAG_NAME = "TAG_NAME" /** 标签名 */,
    TAG_ATTR_TEXT = "TAG_ATTR_TEXT" /** 属性文本 */,
    TAG_SELF_CLOSEING = "TAG_SELF_CLOSEING" /** 结束标签中的/ */,
    POST_TAG_NAME = "POST_TAG_NAME" /** 结束标签名 */,
    TAG_CLOSE = "TAG_CLOSE" /** 标签结尾> */,
    TEXT = "TEXT" /** 标签内容 */,
    COMMENT = "COMMENT" /** 注释信息 */
}
export declare type Token = {
    type: StateEnum;
    startIndex: number; /** 相对输入字符串的开始索引位置 */
    content: string; /** 内容 */
};
export declare type AstNode = {
    nodeType: 'ELEMENT' | 'COMMENT' | 'TEXT' | 'ROOT';
    nodeName: string;
    content: string;
    attrText: string;
    attrObj: Record<string, unknown>;
    children: AstNode[];
};
export declare class DoonceHtmlParser {
    static State: typeof StateEnum;
    debug: boolean;
    constructor({ debug }?: {
        debug?: boolean | undefined;
    });
    /**
     * 解析输入的 html 字符串,返回 tokenList
     *
     * @date 2023-07-25 19:46:40
     * @param input 输入字符串
     * @returns {Token[]} tokenList
     * @memberof DoonceHtmlParser
     */
    parse(input: string): Token[];
    /**
     * 将 tokenList 解析为 ast
     *
     * @date 2023-07-25 19:45:49
     * @private
     * @param tokenList
     * @returns {AstNode} ast对象
     * @memberof DoonceHtmlParser
     */
    parseTokenListToAst(tokenList: Token[]): AstNode;
    /**
     * 找到 tokenList 中最后一个 TAG_NAME 对象
     *
     * @date 2023-07-25 19:40:18
     * @private
     * @param tokenList
     * @returns {Token} TAG_NAME 对象
     * @memberof DoonceHtmlParser
     */
    private _findLastMatchedTagNameObj;
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
    private _hasLessThanSymbolBetweenStartIndexAndFirstGreatThanSymbolIndex;
}
/**
 * 将 attrText 解析为对象
 *
 * @date 2023-07-26 10:08:25
 * @export
 * @param attrText
 * @returns {Record<string,string>}
 */
export declare function parseAttrTextToObj(attrText: string): Record<string, string>;
/**
 * 提取 htmlComment 中的内容
 *
 * @date 2023-07-09 04:30:03
 * @export
 * @param htmlComment html 注释
 * @returns {string} 内容
 */
export declare function extractHtmlCommentContent(htmlComment: string): string;
/**
 * 是否英文字母
 *
 * @date 2023-07-09 01:19:52
 * @export
 * @param char
 * @returns {boolean} 是否英文字母
 */
export declare function isLetter(char: string): boolean;
/**
 * 是否空白字符
 *
 * @date 2023-07-09 01:19:23
 * @export
 * @param char
 * @returns {boolean} 是否空白字符
 */
export declare function isWhiteSpace(char: string): boolean;
//# sourceMappingURL=DoonceHtmlParser.d.ts.map