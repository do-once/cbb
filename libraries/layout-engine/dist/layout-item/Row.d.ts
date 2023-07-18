/**
 * @author GuangHui
 * @description 行
 */
import { Base, IChild, IPos, IRow, ISize, LayoutItemTypeEnum } from './base';
export declare class Row extends Base implements IRow, IChild {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rowNo: number;
    indent: number;
    childs: Base[];
    getPos(): IPos | Promise<IPos>;
    getSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=Row.d.ts.map