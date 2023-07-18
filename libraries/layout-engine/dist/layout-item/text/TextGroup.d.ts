/**
 * @author GuangHui
 * @description 文本组
 */
import { Base, IContent, IGroup, IPos, ISize, LayoutItemTypeEnum } from '../base';
import { ImgPlaceHolder, Char, Formula } from './';
/** 限制下TextGroup的child 类型 */
export declare type TextGroupChild = Char | Formula | ImgPlaceHolder;
export declare class TextGroup extends Base implements IGroup, IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    groups: TextGroupChild[];
    rawContent: string;
    content: string;
    getPos(): IPos | Promise<IPos>;
    getSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=TextGroup.d.ts.map