/**
 * @author GuangHui
 * @description 单字符
 */
import { getCssFontDesc, measureTextMetrics } from '@doonce/utils/*';
import { Base, LayoutItemTypeEnum } from '../base';
export class Char extends Base {
    layoutItemType = LayoutItemTypeEnum.CHAR;
    canLineBreak = false;
    rawContent;
    content;
    globalFontOptions;
    constructor(rawContent, globalFontOptions) {
        super();
        this.rawContent = rawContent;
        this.content = rawContent; /** 单个字符的渲染内容和原始内容应该保持一致 */
        this.globalFontOptions = globalFontOptions;
    }
    measureSize() {
        const fontDescObj = {
            ...this.globalFontOptions,
            lineHeight: `${this.globalFontOptions.lineHeight}px`
        };
        const { width } = measureTextMetrics(this.content, getCssFontDesc(fontDescObj));
        return {
            width,
            height: this.globalFontOptions.lineHeight
        };
    }
}
//# sourceMappingURL=Char.js.map