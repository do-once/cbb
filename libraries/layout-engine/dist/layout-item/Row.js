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
    constructor({ globalFontOptions, rowNo, indent }) {
        super();
        if (!globalFontOptions || !rowNo)
            throw new Error('globalFontOptions and rowNo is required');
        this.globalFontOptions = globalFontOptions;
        this.rowNo = rowNo;
        this.indent = indent ?? 0;
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