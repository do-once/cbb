/**
 * @author GuangHui
 * @description 文本组
 */
import { Base, IContent, IChild, ISize, LayoutItemTypeEnum } from '../base';
import { ImgPlaceHolder, Char, Formula } from './';
/** 限制下TextGroup的child 类型 */
export declare type TextGroupChild = Char | Formula | ImgPlaceHolder;
export declare class TextGroup extends Base implements IChild, IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    childs: TextGroupChild[];
    rawContent: string;
    content: string;
    measureSize(): ISize;
}
//# sourceMappingURL=TextGroup.d.ts.map