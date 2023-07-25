/**
 * @author GuangHui
 * @description 单字符
 */
import { getCssFontDesc, measureTextMetrics } from '@doonce/utils';
import { Base, LayoutItemTypeEnum } from '../base';
export class Char extends Base {
    layoutItemType = LayoutItemTypeEnum.CHAR;
    canLineBreak = false;
    rawContent;
    content = '';
    globalFontOptions;
    debug = false;
    constructor({ rawContent, globalFontOptions, debug }) {
        super();
        this.rawContent = rawContent;
        this.globalFontOptions = globalFontOptions;
        this.debug = !!debug;
    }
    async init() {
        this.content = this.rawContent; /** 单个字符的渲染内容和原始内容应该保持一致 */
        const { width, height } = this.measureSize();
        this.width = width;
        this.height = height;
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