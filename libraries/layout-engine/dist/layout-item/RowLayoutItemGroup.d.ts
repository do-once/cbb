/**
 * @author GuangHui
 * @description 将参与行排版的 item 打成一个组,当成一个 item 参与排版(实现类似标点悬挂效果)
 */
import { Base, IChild, IRow, ISize, LayoutItemTypeEnum } from './base';
import { Img } from './img/Img';
import { Char, Formula } from './text';
/** 限制下RowLayoutItemGroup的child 类型 */
export declare type RowLayoutItemGroupChild = Char | Formula | Img;
export declare type RowLayoutItemGroupOptions = {
    childs: [RowLayoutItemGroupChild, RowLayoutItemGroupChild];
    rowNo: IRow['rowNo'];
};
export declare class RowLayoutItemGroup extends Base implements IChild, IRow {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    childs: [RowLayoutItemGroupChild, RowLayoutItemGroupChild];
    rowNo: IRow['rowNo'];
    constructor({ childs, rowNo }: RowLayoutItemGroupOptions);
    init(force?: boolean): Promise<void>;
    private _initChilds;
    measureSize(): ISize;
}
//# sourceMappingURL=RowLayoutItemGroup.d.ts.map