/**
 * @author GuangHui
 * @description DoonceHtmlParser 主体程序
 */
/** <         div       id            =                         "                         app             "                           >           hello   <           /                   div             >           */
/** TAG_OPEN  TAG_NAME  TAG_ATTR_NAME TAG_ATTR_NAME_VALUE_SPLIT TAG_ATTR_PRE_DOUBLE_QUOTE TAG_ATTR_VALUE  TAG_ATTR_POST_DOUBLE_QUOTE  TAG_CLOSE   TEXT    TAG_OPEN    TAG_SELF_CLOSEING   POST_TAG_NAME   TAG_CLOSE   */
export declare type State = 'START' /** 初始状态 */ | 'TAG_OPEN' /** 标签开头< */ | 'TAG_NAME' /** 标签名 */ | 'TAG_ATTR_NAME' /** 属性名,例如<div id="app">中的 id */ | 'TAG_ATTR_NAME_VALUE_SPLIT' /** 属性名和值的分隔符号,例如<div id="app">中的= */ | 'TAG_ATTR_PRE_DOUBLE_QUOTE' /** 属性值前双引号 */ | 'TAG_ATTR_VALUE' /** 属性值 */ | 'TAG_ATTR_POST_DOUBLE_QUOTE' /** 属性值后双引号 */ | 'TAG_ATTR_SPLIT' /** 多属性分隔符(空格) */ | 'TAG_SELF_CLOSEING' /** 结束标签中的/ */ | 'POST_TAG_NAME' /** 结束标签名 */ | 'TAG_CLOSE' /** 标签结尾> */ | 'TEXT' /** 标签内容 */ | 'COMMENT'; /** 注释信息 */
export declare type ContentModifyType = 'trim' | 'extractHtmlCommentContent';
export interface IToken {
    type: State;
    startIndex: number; /** 相对输入字符串的开始索引位置 */
    content: string; /** 内容(可能会进行trim/内容提取操作,所以用_originContent 保存原始内容) */
    _originContent?: string; /** 原始 content,修改前的 content */
    _contentModifyType?: ContentModifyType; /** 原始内容修改类型 */
}
export declare class DoonceHtmlParser {
    static State: Record<State, State>;
    debug: boolean;
    constructor(debug?: boolean);
    parse(input: string): IToken[];
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