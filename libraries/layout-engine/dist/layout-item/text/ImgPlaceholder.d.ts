/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
import { Base, IContent, IRow, ISize, LayoutItemTypeEnum } from '../base';
import { Img } from '../img';
/** 限制占位的owner类型 */
export declare type Owner = Img;
export declare type ImgPlaceholderCtrOptions = {
    ownerImg: Owner;
    height: number;
    y: number;
    rowNo: IRow['rowNo'];
};
export declare class ImgPlaceholder extends Base implements IContent, IRow {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    ownerImg: Owner; /** 拥有占位符的图形组件 */
    rawContent: IContent['rawContent'];
    content: IContent['content'];
    height: number;
    rowNo: IRow['rowNo'];
    constructor({ ownerImg, height, rowNo, y }: ImgPlaceholderCtrOptions);
    init(force?: boolean): void;
    measureSize(): ISize;
}
//# sourceMappingURL=ImgPlaceholder.d.ts.map