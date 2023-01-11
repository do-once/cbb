/**
 * @author GuangHui
 * @description description
 */
export interface NumberParts {
    sign: string;
    interger: string;
    dot: string;
    decimal: string;
}
/**
 * 判断数字是否在安全范围内
 *
 * @export
 * @param {number} n  数字
 * @returns {boolean} 是否是安全数字
 */
export declare function isSafeNumber(n: number): boolean;
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
export declare function padStr(str: string, padNum: number, padChar: string, before?: boolean): string;
/**
 * 获取浮点数各组成部分
 *
 * @export
 * @param {number} n 待解析数字
 * @returns {(NumberParts | string)} 各组成部分
 */
export declare function getNumParts(n: number): NumberParts;
//# sourceMappingURL=utils.d.ts.map