/**
 * @author GuangHui
 * @description 图片类
 */
import { getCssFontDesc, measureImgSize, measureTextMetrics } from '@doonce/utils';
import { Base, LayoutItemTypeEnum, ImgSurrounTypeEnum } from '../base';
export class Img extends Base {
    layoutItemType = LayoutItemTypeEnum.IMG;
    canLineBreak = false;
    globalFontConfig;
    title;
    imgSurroundType;
    rawContent;
    content = '';
    rowNo = -1;
    constructor({ title, globalFontConfig, imgSurroundType, rawContent, rowNo }) {
        super();
        this.title = title ?? '';
        this.globalFontConfig = globalFontConfig;
        this.imgSurroundType = imgSurroundType ?? ImgSurrounTypeEnum.NONE;
        this.rawContent = rawContent;
        this.rowNo = rowNo;
    }
    async init(force = false) {
        /** 已经初始化,并不是强制初始化,则跳过 */
        if (this.initialized && !force)
            return;
        this.content = this.rawContent;
        const { width, height } = await this.measureSize();
        this.width = width;
        this.height = height;
        this.initialized = true;
    }
    async measureSize() {
        let titleSize = { width: 0, height: 0 };
        if (this.haveTitle())
            titleSize = this.measureTitleSize();
        const { width, height } = await measureImgSize(this.rawContent);
        return {
            width: Math.max(titleSize.width, width),
            height: titleSize.height + height
        };
    }
    haveTitle() {
        return !!this.title;
    }
    measureTitleSize() {
        const fontDescObj = {
            ...this.globalFontConfig,
            lineHeight: `${this.globalFontConfig.lineHeight}px`
        };
        const { width } = measureTextMetrics(this.title, getCssFontDesc(fontDescObj));
        return {
            width,
            height: this.globalFontConfig.lineHeight
        };
    }
}
//# sourceMappingURL=Img.js.map