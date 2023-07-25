/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
import { Base, IContent, ISize, LayoutItemTypeEnum } from '../base';
import { Graph, Img } from '../img';
/** 限制占位的owner类型 */
export declare type Owner = Img | Graph;
export declare type ImgPlaceholderCtrOptions = {
    owner: Owner;
    height: number;
};
export declare class ImgPlaceholder extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    owner: Owner; /** 拥有占位符的图形组件 */
    rawContent: string;
    content: string;
    height: number;
    constructor({ owner, height }: ImgPlaceholderCtrOptions);
    measureSize(): ISize;
}
//# sourceMappingURL=ImgPlaceholder.d.ts.map