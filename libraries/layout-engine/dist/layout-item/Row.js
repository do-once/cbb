/**
 * @author GuangHui
 * @description 行
 */
import { Base, LayoutItemTypeEnum } from './base';
export class Row extends Base {
    layoutItemType = LayoutItemTypeEnum.ROW;
    canLineBreak = false;
    rowNo = -1;
    indent = 0;
    childs = [];
    globalFontOptions;
    constructor(globalFontOptions) {
        super();
        this.globalFontOptions = globalFontOptions;
    }
    addChild(child) {
        this.childs.push(child);
    }
    measureSize() {
        return this.childs.reduce((acc, cur) => {
            acc.width += cur.width;
            acc.height = Math.max(this.globalFontOptions.lineHeight, cur.height);
            return acc;
        }, { width: 0, height: 0 });
    }
}
//# sourceMappingURL=Row.js.map