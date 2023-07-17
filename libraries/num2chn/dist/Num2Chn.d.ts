/**
 * @author GuangHui
 * @description description
 */
export interface Options {
    unitChars?: string[];
    sectionUnitChars?: string[];
    numChars?: string[];
    dotChar?: string;
    signChar?: string;
}
export default class DoonceNum2chn {
    private unitChars;
    private sectionUnitChars;
    private numChars;
    private dotChar;
    private signChar;
    constructor(options?: Options);
    /**
     * 获取数字对应中文
     *
     * @param {number} n 数字
     * @returns {string} 数字对应中文
     * @memberof Num2Chn
     */
    getNumChar(n: number): string;
    /**
     * 获取节内权位
     *
     * @param {number} i 索引
     * @returns {string} 对应中文
     * @memberof Num2Chn
     */
    getUnitChar(i: number): string;
    /**
     * 获取节权位
     *
     * @param {number} i 索引
     * @returns {string} 对应中文
     * @memberof Num2Chn
     */
    getSectionUnitChar(i: number): string;
    /**
     * 获取点号对应中文
     *
     * @param {string} dotPart 点号部分
     * @returns {string} 点号对应中文
     * @memberof Num2Chn
     */
    getDotPartChn(dotPart: string): string;
    /**
     * 获取符号对应中文
     *
     * @param {string} signPart 符号部分
     * @returns {string} 符号对应中文
     * @memberof Num2Chn
     */
    getSignPartChn(signPart: string): string;
    /**
     * 获取小数部分的中文表示
     *
     * @param {(number | string)} n 小数部分
     * @returns {string} 小数部分的中文表示
     * @memberof Num2Chn
     */
    getDecimalPartChn(n: number | string): string;
    /**
     * 获取整数部分小节
     *
     * @param {(number | string)} n 整数
     * @returns {number[]} 小节数组
     * @memberof Num2Chn
     */
    getIntergerSections(n: number | string): number[];
    /**
     * 翻译小节
     *
     * @param {(number|string)} section 4位长度的小节
     * @returns {string} 小节对应中文
     * @memberof Num2Chn
     */
    getSectionsChn(section: number | string): string;
    /**
     * 获取整数部分对应中文
     *
     * @param {(number|string)} intergerPart 整数部分
     * @returns {string} 整数部分对应中文
     * @memberof Num2Chn
     */
    getIntergetPartChn(intergerPart: number | string): string;
    /**
     * 浮点数转中文数字
     *
     * @export
     * @param {(number | string)} n 需要转换的数字
     * @returns {string} 数字对应中文
     */
    transform(n: number | string): string;
}
//# sourceMappingURL=Num2Chn.d.ts.map