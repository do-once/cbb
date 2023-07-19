/**
 * @author GuangHui
 * @description 公式
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class Formula extends Base {
    layoutItemType = LayoutItemTypeEnum.FORMULA;
    canLineBreak = false;
    rawContent;
    content = '';
    globalFontOptions;
    constructor(rawContent, globalFontOptions) {
        super();
        this.rawContent = rawContent;
        this.content = '123'; /** 需要获取公式的渲染内容 */
        this.globalFontOptions = globalFontOptions;
    }
    measureSize() {
        // TODO 需要获取完 content 后,再对 content 进行测量
        return {
            width: 0,
            height: 0
        };
    }
}
//# sourceMappingURL=Formula.js.map