/**
 * @author GuangHui
 * @description 字符
 */
import { getCssFontDesc, measureTextMetrics } from '@doonce/utils';
import { Base, LayoutItemTypeEnum } from '../base';
export class Char extends Base {
    layoutItemType = LayoutItemTypeEnum.CHAR;
    canLineBreak = false;
    rawContent;
    content = '';
    globalFontConfig;
    debug = false;
    rowNo;
    constructor({ rawContent, globalFontConfig, debug, rowNo }) {
        super();
        this.rawContent = rawContent;
        this.globalFontConfig = globalFontConfig;
        this.debug = !!debug;
        this.rowNo = rowNo;
    }
    async init(force = false) {
        /** 已经初始化,并不是强制初始化,则跳过 */
        if (this.initialized && !force)
            return;
        this.content = this.rawContent; /** 单个字符的渲染内容和原始内容应该保持一致 */
        const { width, height } = this.measureSize();
        this.width = width;
        this.height = height;
        this.initialized = true;
    }
    measureSize() {
        const fontDescObj = {
            ...this.globalFontConfig,
            lineHeight: `${this.globalFontConfig.lineHeight}px`
        };
        const { width } = measureTextMetrics(this.content, getCssFontDesc(fontDescObj));
        return {
            width,
            height: this.globalFontConfig.lineHeight
        };
    }
}
//# sourceMappingURL=Char.js.map