/**
 * @author GuangHui
 * @description 图片标题类
 */
import { getCssFontDesc, measureTextMetrics } from '@doonce/utils';
import { Base, LayoutItemTypeEnum } from '../base';
export class GraphTitle extends Base {
    layoutItemType = LayoutItemTypeEnum.GRAPH_TITLE;
    canLineBreak = false;
    rawContent;
    content = '';
    globalFontOptions;
    constructor(rawContent, globalFontOptions) {
        super();
        this.rawContent = rawContent;
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
//# sourceMappingURL=GraphTitle.js.map