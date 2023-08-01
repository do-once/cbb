/**
 * @author GuangHui
 * @description 行
 */
import { GlobalFontConfig } from '../DoonceLayoutEngine';
import { Base, IChild, IRow, ISize, LayoutItemTypeEnum } from './base';
import { Char, Formula, ImgPlaceholder, CRLF } from './text';
import { RowLayoutItemGroup } from './RowLayoutItemGroup';
import { Img } from './img';
/** 限制行的 child 类型 */
export declare type RowChild = Char | Formula | ImgPlaceholder | RowLayoutItemGroup | CRLF | Img;
export declare type RowCtrOptions = {
    globalFontConfig: GlobalFontConfig;
    rowNo: IRow['rowNo'];
};
export declare class Row extends Base implements IRow, IChild {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rowNo: IRow['rowNo'];
    childs: RowChild[];
    globalFontConfig: GlobalFontConfig;
    constructor({ globalFontConfig, rowNo }: RowCtrOptions);
    init(force: boolean): void;
    addChild(child: RowChild): void;
    measureSize(): ISize;
}
//# sourceMappingURL=Row.d.ts.map