/**
 * @author GuangHui
 * @description 行
 */
import { GlobalFontOptions } from '../DoonceLayoutEngine';
import { Base, IChild, IRow, ISize, LayoutItemTypeEnum } from './base';
import { Char, Formula, ImgPlaceholder, TextGroup } from './text';
/** 限制行的 child 类型 */
export declare type RowChild = Char | Formula | ImgPlaceholder | TextGroup;
export declare type RowCtrOptions = {
    globalFontOptions: GlobalFontOptions;
    rowNo: number;
    indent?: number;
};
export declare class Row extends Base implements IRow, IChild {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rowNo: number;
    indent: number;
    childs: RowChild[];
    globalFontOptions: GlobalFontOptions;
    constructor({ globalFontOptions, rowNo, indent }: RowCtrOptions);
    addChild(child: RowChild): void;
    measureSize(): ISize;
}
//# sourceMappingURL=Row.d.ts.map