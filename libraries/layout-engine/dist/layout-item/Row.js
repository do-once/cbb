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
    getPos() {
        throw new Error('Method not implemented.');
    }
    getSize() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=Row.js.map