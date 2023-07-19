/**
 * @author GuangHui
 * @description 图片类,应包含图片本身 Graph+图片的标题GraphTitle,GraphTitle总是在Graph 下方
 */
import { Base, IChild, ISize, IImgSurround, LayoutItemTypeEnum, ImgSurrounTypeEnum } from '../base';
import { Graph, GraphTitle } from './';
/** 限制 Img 的 child 类型 */
export declare type ImgChildsTuple = [Graph, GraphTitle] | [Graph];
export declare class Img extends Base implements IChild, IImgSurround {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    childs: ImgChildsTuple;
    imgSurroundType: ImgSurrounTypeEnum;
    constructor(childs: ImgChildsTuple);
    haveTitle(): boolean;
    measureSize(): ISize;
}
//# sourceMappingURL=Img.d.ts.map